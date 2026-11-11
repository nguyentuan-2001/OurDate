import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Thiếu EXPO_PUBLIC_SUPABASE_URL hoặc EXPO_PUBLIC_SUPABASE_ANON_KEY. Sao chép .env.example thành .env và điền giá trị.',
  );
}

/**
 * Dùng AsyncStorage (không phải expo-secure-store) để lưu session: giá trị
 * session của Supabase (access + refresh token + user metadata) có thể vượt
 * quá giới hạn ~2048 byte/entry mà expo-secure-store gặp trên một số bản iOS.
 * Đây cũng là lựa chọn mặc định trong hướng dẫn chính thức của Supabase cho
 * Expo/React Native.
 *
 * `typeof window === 'undefined'` chỉ đúng khi bundle web chạy trong Node
 * (ví dụ Expo Router SSR lúc `expo start --web`/`expo export --platform web`)
 * — trên thiết bị thật (Android/iOS) React Native luôn có `window` (alias của
 * `global`), nên dùng điều kiện này không ảnh hưởng gì tới app thật. Không có
 * guard này, bản web shim của AsyncStorage gọi `window.localStorage` và làm
 * crash renderer phía server ngay khi import module.
 */
const noopStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window === 'undefined' ? noopStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
