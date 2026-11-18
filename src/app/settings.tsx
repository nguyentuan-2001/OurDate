import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Button, Card, Screen, Text } from '@/components/ui';
import { useAuth } from '@/features/auth/AuthProvider';
import { useCouple } from '@/features/couple/CoupleProvider';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsScreen() {
  const { colors, spacing } = useTheme();
  const { session, signOut } = useAuth();
  const { couple } = useCouple();
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

        {couple ? (
          <Card style={{ gap: spacing.xs }}>
            <Text variant="caption" color="textSecondary">
              Không gian của chúng ta
            </Text>
            <Text variant="bodyMedium">{couple.displayName ?? 'Chưa đặt tên'}</Text>
            <Text variant="bodySmall" color="textSecondary">
              {couple.memberCount} / 2 thành viên
              {couple.memberCount < 2 ? ' · Đang chờ người ấy tham gia' : ''}
            </Text>
          </Card>
        ) : null}

        <View style={{ gap: spacing.sm }}>
          <Pressable onPress={() => router.push('/private-places')}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Ionicons name="home-outline" size={20} color={colors.primary} />
              <Text variant="bodyMedium" style={{ flex: 1 }}>
                Địa chỉ riêng tư
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Card>
          </Pressable>
          <Pressable onPress={() => router.push('/preferences')}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Ionicons name="options-outline" size={20} color={colors.primary} />
              <Text variant="bodyMedium" style={{ flex: 1 }}>
                Sở thích & lịch trình
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Card>
          </Pressable>
        </View>

        <Button label="Đăng xuất" variant="secondary" onPress={handleSignOut} loading={isSigningOut} />
      </View>
    </Screen>
  );
}
