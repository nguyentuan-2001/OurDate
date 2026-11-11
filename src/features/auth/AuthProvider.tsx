import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { supabase } from '@/lib/supabase/client';

type AuthResult = { error?: string };

type AuthContextValue = {
  session: Session | null;
  isLoading: boolean;
  signUp: (params: {
    email: string;
    password: string;
    displayName: string;
  }) => Promise<AuthResult & { needsEmailConfirmation?: boolean }>;
  signIn: (params: { email: string; password: string }) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Supabase trả lỗi bằng tiếng Anh; dịch các lỗi thường gặp sang tiếng Việt cho người dùng. */
function translateAuthError(message: string): string {
  const known: Record<string, string> = {
    'Invalid login credentials': 'Email hoặc mật khẩu không đúng.',
    'User already registered': 'Email này đã được đăng ký. Hãy thử đăng nhập.',
    'Email not confirmed': 'Email chưa được xác nhận. Vui lòng kiểm tra hộp thư.',
    'Password should be at least 6 characters': 'Mật khẩu cần ít nhất 6 ký tự.',
    'Signups not allowed for this instance': 'Hiện chưa cho phép đăng ký tài khoản mới.',
  };
  return known[message] ?? `Có lỗi xảy ra: ${message}`;
}

/** Tạo hồ sơ `profiles` cho user nếu chưa có — bỏ qua lỗi trùng (đã tồn tại từ lần trước). */
async function ensureProfile(userId: string, displayName: string) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, display_name: displayName }, { onConflict: 'id', ignoreDuplicates: true });
  if (error) {
    console.warn('Không thể tạo hồ sơ profiles:', error.message);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  async function signUp({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { error: translateAuthError(error.message) };
    }
    if (data.session && data.user) {
      await ensureProfile(data.user.id, displayName);
      return {};
    }
    // Không có session ngay = dự án đang bật "Confirm email", cần xác minh trước khi đăng nhập.
    return { needsEmailConfirmation: true };
  }

  async function signIn({ email, password }: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: translateAuthError(error.message) };
    }
    if (data.user) {
      const fallbackName = data.user.email?.split('@')[0] ?? 'Người dùng';
      await ensureProfile(data.user.id, fallbackName);
    }
    return {};
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider');
  }
  return ctx;
}
