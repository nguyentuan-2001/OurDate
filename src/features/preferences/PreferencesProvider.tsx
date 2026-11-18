import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { useAuth } from '@/features/auth/AuthProvider';
import { useCouple } from '@/features/couple/CoupleProvider';
import { supabase } from '@/lib/supabase/client';

export type TransportMode = 'DRIVE' | 'TWO_WHEELER' | 'WALK' | 'TRANSIT';

export type PrivatePlace = {
  id: string;
  label: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

export type CouplePreferences = {
  radiusKm: number;
  transportMode: TransportMode;
  budgetVnd: number | null;
  interests: string[];
  avoidPreferences: string[];
};

const DEFAULT_PREFERENCES: CouplePreferences = {
  radiusKm: 15,
  transportMode: 'TWO_WHEELER',
  budgetVnd: null,
  interests: [],
  avoidPreferences: [],
};

type PreferencesContextValue = {
  privatePlaces: PrivatePlace[];
  preferences: CouplePreferences;
  isLoading: boolean;
  refresh: () => Promise<void>;
  savePrivatePlace: (input: { id?: string; label: string; address: string }) => Promise<{ error?: string }>;
  deletePrivatePlace: (id: string) => Promise<{ error?: string }>;
  savePreferences: (input: Partial<CouplePreferences>) => Promise<{ error?: string }>;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function mapRowToPreferences(row: {
  default_radius_m: number;
  default_transport_mode: string;
  default_budget_vnd: number | null;
  interests: unknown;
  avoid_preferences: unknown;
}): CouplePreferences {
  return {
    radiusKm: row.default_radius_m / 1000,
    transportMode: row.default_transport_mode as TransportMode,
    budgetVnd: row.default_budget_vnd,
    interests: Array.isArray(row.interests) ? (row.interests as string[]) : [],
    avoidPreferences: Array.isArray(row.avoid_preferences) ? (row.avoid_preferences as string[]) : [],
  };
}

async function fetchPrivatePlaces(userId: string): Promise<PrivatePlace[]> {
  const { data } = await supabase
    .from('private_places')
    .select('id, label, address, latitude, longitude')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  return (data ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
  }));
}

async function fetchPreferences(coupleId: string): Promise<CouplePreferences> {
  const { data } = await supabase
    .from('couple_preferences')
    .select('default_radius_m, default_transport_mode, default_budget_vnd, interests, avoid_preferences')
    .eq('couple_id', coupleId)
    .maybeSingle();
  return data ? mapRowToPreferences(data) : DEFAULT_PREFERENCES;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const { couple } = useCouple();
  const userId = session?.user.id;
  const [privatePlaces, setPrivatePlaces] = useState<PrivatePlace[]>([]);
  const [preferences, setPreferences] = useState<CouplePreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId || !couple) {
      setPrivatePlaces([]);
      setPreferences(DEFAULT_PREFERENCES);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const [places, prefs] = await Promise.all([fetchPrivatePlaces(userId), fetchPreferences(couple.id)]);
    setPrivatePlaces(places);
    setPreferences(prefs);
    setIsLoading(false);
  }, [userId, couple]);

  useEffect(() => {
    queueMicrotask(() => {
      refresh();
    });
  }, [refresh]);

  async function savePrivatePlace({ id, label, address }: { id?: string; label: string; address: string }) {
    if (!userId) return { error: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.' };

    const { error } = id
      ? await supabase.from('private_places').update({ label, address }).eq('id', id).eq('user_id', userId)
      : await supabase.from('private_places').insert({ user_id: userId, label, address });

    if (error) return { error: `Không lưu được địa chỉ: ${error.message}` };
    await refresh();
    return {};
  }

  async function deletePrivatePlace(id: string) {
    const { error } = await supabase.from('private_places').delete().eq('id', id);
    if (error) return { error: `Không xoá được địa chỉ: ${error.message}` };
    await refresh();
    return {};
  }

  async function savePreferences(input: Partial<CouplePreferences>) {
    if (!couple) return { error: 'Bạn chưa thuộc Couple nào.' };
    const next = { ...preferences, ...input };
    const { error } = await supabase.from('couple_preferences').upsert({
      couple_id: couple.id,
      default_radius_m: Math.round(next.radiusKm * 1000),
      default_transport_mode: next.transportMode,
      default_budget_vnd: next.budgetVnd,
      interests: next.interests,
      avoid_preferences: next.avoidPreferences,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    });
    if (error) return { error: `Không lưu được cấu hình: ${error.message}` };
    await refresh();
    return {};
  }

  return (
    <PreferencesContext.Provider
      value={{
        privatePlaces,
        preferences,
        isLoading,
        refresh,
        savePrivatePlace,
        deletePrivatePlace,
        savePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences phải được dùng bên trong PreferencesProvider');
  }
  return ctx;
}
