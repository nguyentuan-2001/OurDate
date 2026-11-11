import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Button, Card, Screen, Text } from '@/components/ui';
import { useAuth } from '@/features/auth/AuthProvider';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsScreen() {
  const { colors, spacing } = useTheme();
  const { session, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  }

  return (
    <Screen>
      <View style={{ gap: spacing.xl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text variant="title">Cài đặt</Text>
        </View>

        <Card style={{ gap: spacing.xs }}>
          <Text variant="caption" color="textSecondary">
            Tài khoản
          </Text>
          <Text variant="bodyMedium">{session?.user.email ?? 'Chưa đăng nhập'}</Text>
        </Card>

        <Button label="Đăng xuất" variant="secondary" onPress={handleSignOut} loading={isSigningOut} />
      </View>
    </Screen>
  );
}
