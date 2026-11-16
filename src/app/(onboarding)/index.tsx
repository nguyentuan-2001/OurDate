import { Link } from 'expo-router';
import { View } from 'react-native';

import { CoupleIllustration } from '@/components/illustrations/CoupleIllustration';
import { Button, Screen, Text } from '@/components/ui';
import { useAuth } from '@/features/auth/AuthProvider';
import { useTheme } from '@/hooks/use-theme';

export default function OnboardingChoiceScreen() {
  const { spacing } = useTheme();
  const { signOut } = useAuth();

  return (
    <Screen scroll>
      <View style={{ gap: spacing.xl, paddingTop: spacing.xxl, alignItems: 'center' }}>
        <CoupleIllustration />
        <View style={{ gap: spacing.xs, alignItems: 'center' }}>
          <Text variant="display">Our Date ♡</Text>
          <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
            Tạo không gian riêng của hai bạn, hoặc tham gia bằng mã mời người ấy đã gửi.
          </Text>
        </View>

        <View style={{ gap: spacing.md, width: '100%' }}>
          <Link href="/create-couple" asChild>
            <Button label="Tạo không gian của chúng ta" />
          </Link>
          <Link href="/join-couple" asChild>
            <Button label="Tôi có mã mời" variant="secondary" />
          </Link>
        </View>

        <Button label="Đăng xuất" variant="ghost" onPress={() => signOut()} />
      </View>
    </Screen>
  );
}
