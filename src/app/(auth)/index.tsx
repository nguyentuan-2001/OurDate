import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/features/auth/AuthProvider';
import { useTheme } from '@/hooks/use-theme';

export default function SignInScreen() {
  const { spacing } = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }
    setError(undefined);
    setIsSubmitting(true);
    const result = await signIn({ email: email.trim(), password });
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.xl, paddingTop: spacing.xxxl }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Our Date ♡</Text>
          <Text variant="body" color="textSecondary">
            Đăng nhập để xem lịch hẹn của hai bạn.
          </Text>
        </View>

        <View style={{ gap: spacing.md }}>
          <Input
            label="Email"
            placeholder="ban@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Mật khẩu"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            errorText={error}
          />
        </View>

        <Button label="Đăng nhập" onPress={handleSubmit} loading={isSubmitting} />

        <Link href="/sign-up" asChild>
          <Button label="Chưa có tài khoản? Đăng ký" variant="ghost" />
        </Link>
      </View>
    </Screen>
  );
}
