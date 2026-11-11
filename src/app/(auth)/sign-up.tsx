import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/features/auth/AuthProvider';
import { useTheme } from '@/hooks/use-theme';

export default function SignUpScreen() {
  const { spacing } = useTheme();
  const { signUp } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

  async function handleSubmit() {
    if (!displayName.trim() || !email.trim() || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu cần ít nhất 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }
    setError(undefined);
    setIsSubmitting(true);
    const result = await signUp({ email: email.trim(), password, displayName: displayName.trim() });
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsEmailConfirmation) {
      setNeedsEmailConfirmation(true);
    }
  }

  if (needsEmailConfirmation) {
    return (
      <Screen>
        <View style={{ gap: spacing.lg, paddingTop: spacing.xxxl }}>
          <Text variant="display">Kiểm tra email</Text>
          <Card style={{ gap: spacing.sm }}>
            <Text variant="body">
              Chúng tôi đã gửi email xác nhận tới <Text variant="bodyMedium">{email}</Text>.
            </Text>
            <Text variant="bodySmall" color="textSecondary">
              Mở email và nhấn vào liên kết xác nhận, sau đó quay lại đăng nhập.
            </Text>
          </Card>
          <Link href="/" asChild>
            <Button label="Quay lại đăng nhập" variant="secondary" />
          </Link>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.xl, paddingTop: spacing.xxxl }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Tạo tài khoản</Text>
          <Text variant="body" color="textSecondary">
            Tạo tài khoản để bắt đầu không gian của hai bạn.
          </Text>
        </View>

        <View style={{ gap: spacing.md }}>
          <Input
            label="Tên hiển thị"
            placeholder="Tên của bạn"
            value={displayName}
            onChangeText={setDisplayName}
          />
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
            placeholder="Ít nhất 6 ký tự"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            label="Nhập lại mật khẩu"
            placeholder="••••••••"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            errorText={error}
          />
        </View>

        <Button label="Đăng ký" onPress={handleSubmit} loading={isSubmitting} />

        <Link href="/" asChild>
          <Button label="Đã có tài khoản? Đăng nhập" variant="ghost" />
        </Link>
      </View>
    </Screen>
  );
}
