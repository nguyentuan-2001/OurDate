import { Stack, ThemeProvider } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/features/auth/AuthProvider';
import { CoupleProvider, useCouple } from '@/features/couple/CoupleProvider';
import { useTheme } from '@/hooks/use-theme';
import { getNavigationTheme } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignores a redundant call when the splash screen was already hidden.
});

function RootNavigator() {
  const { session, isLoading: isAuthLoading } = useAuth();
  const { couple, isLoading: isCoupleLoading } = useCouple();
  const isLoading = isAuthLoading || (!!session && isCoupleLoading);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session && !!couple}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="itinerary-result" options={{ presentation: 'card' }} />
      </Stack.Protected>
      <Stack.Protected guard={!!session && !couple}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const { colors, scheme } = useTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
    if (Platform.OS === 'android') {
      // SDK hiện tại không còn API đổi màu nền thanh điều hướng (Android bắt buộc
      // edge-to-edge, thanh điều hướng luôn trong suốt) — chỉ còn chỉnh được màu icon.
      NavigationBar.setStyle(scheme === 'dark' ? 'light' : 'dark');
    }
  }, [colors.background, scheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={getNavigationTheme(scheme)}>
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
          <AuthProvider>
            <CoupleProvider>
              <RootNavigator />
            </CoupleProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
