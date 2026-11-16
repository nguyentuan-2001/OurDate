import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { useAuth } from '@/features/auth/AuthProvider';
import { supabase } from '@/lib/supabase/client';

type Couple = {
  id: string;
  displayName: string | null;
  anniversaryDate: string | null;
  memberCount: number;
};

type CoupleContextValue = {
  couple: Couple | null;
  isLoading: boolean;
  pendingInviteToken: string | null;
  refresh: () => Promise<void>;
  createCouple: (params: { displayName?: string; anniversaryDate?: string }) => Promise<{ error?: string }>;
  createInvite: () => Promise<{ token?: string; error?: string }>;
  joinWithToken: (token: string) => Promise<{ error?: string }>;
};

const CoupleContext = createContext<CoupleContextValue | null>(null);

/** Supabase trả lỗi theo đúng chuỗi trong `raise exception` của hàm RPC — dịch sang tiếng Việt. */
function translateCoupleError(message: string): string {
  const known: Record<string, string> = {
    already_in_couple: 'Bạn đã thuộc một Couple rồi.',
    no_couple: 'Bạn chưa tạo hoặc tham gia Couple nào.',
    couple_already_has_two_members: 'Couple này đã đủ 2 thành viên.',
    invitation_invalid: 'Mã mời không hợp lệ, đã hết hạn hoặc đã được dùng.',
    not_authenticated: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
  };
  return known[message] ?? `Có lỗi xảy ra: ${message}`;
}

async function fetchCouple(userId: string): Promise<Couple | null> {
  const { data: membership } = await supabase
    .from('couple_members')
    .select('couple_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (!membership) return null;

  const { data: couple } = await supabase
    .from('couples')
    .select('id, display_name, anniversary_date')
    .eq('id', membership.couple_id)
    .single();
  if (!couple) return null;

  const { count } = await supabase
    .from('couple_members')
    .select('id', { count: 'exact', head: true })
    .eq('couple_id', membership.couple_id);

  return {
    id: couple.id,
    displayName: couple.display_name,
    anniversaryDate: couple.anniversary_date,
    memberCount: count ?? 1,
  };
}

export function CoupleProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [couple, setCouple] = useState<Couple | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingInviteToken, setPendingInviteToken] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const userId = session?.user.id;
    if (!userId) {
      setCouple(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const result = await fetchCouple(userId);
    setCouple(result);
    if (result && result.memberCount >= 2) {
      setPendingInviteToken(null);
    }
    setIsLoading(false);
  }, [session?.user.id]);

  useEffect(() => {
    queueMicrotask(() => {
      refresh();
    });
  }, [refresh]);

  async function createCouple({
    displayName,
    anniversaryDate,
  }: {
    displayName?: string;
    anniversaryDate?: string;
  }) {
    const { error } = await supabase.rpc('create_couple', {
      p_display_name: displayName?.trim() || null,
      p_anniversary_date: anniversaryDate?.trim() || null,
    });
    if (error) return { error: translateCoupleError(error.message) };
    await refresh();
    return {};
  }

  async function createInvite() {
    const { data, error } = await supabase.rpc('create_couple_invitation', {});
    if (error) return { error: translateCoupleError(error.message) };
    const token = data as string;
    setPendingInviteToken(token);
    return { token };
  }

  async function joinWithToken(token: string) {
    const { error } = await supabase.rpc('accept_couple_invitation', { p_token: token.trim() });
    if (error) return { error: translateCoupleError(error.message) };
    await refresh();
    return {};
  }

  return (
    <CoupleContext.Provider
      value={{ couple, isLoading, pendingInviteToken, refresh, createCouple, createInvite, joinWithToken }}
    >
      {children}
    </CoupleContext.Provider>
  );
}

export function useCouple() {
  const ctx = useContext(CoupleContext);
  if (!ctx) {
    throw new Error('useCouple phải được dùng bên trong CoupleProvider');
  }
  return ctx;
}
