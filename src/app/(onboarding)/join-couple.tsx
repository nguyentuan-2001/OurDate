import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Input, Screen, Text } from '@/components/ui';
import { useCouple } from '@/features/couple/CoupleProvider';
import { useTheme } from '@/hooks/use-theme';

export default function JoinCoupleScreen() {
  const { spacing } = useTheme();
  const { joinWithToken } = useCouple();

  const [token, setToken] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!token.trim()) {
      setError('Vui lòng nhập mã mời.');
      return;
    }
    setError(undefined);
    setIsSubmitting(true);
    const result = await joinWithToken(token);
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    // Khi tham gia xong, Couple context cập nhật và điều hướng chính sẽ tự chuyển sang app chính.
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.lg, paddingTop: spacing.xxl }}>
        <Button label="‹ Quay lại" variant="ghost" fullWidth={false} onPress={() => router.back()} />
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Nhập mã mời ♡</Text>
          <Text variant="body" color="textSecondary">
            Người ấy đã gửi cho bạn một mã mời, dán vào đây để cùng tham gia không gian của hai bạn.
          </Text>
        </View>

        <Input
          label="Mã mời"
          placeholder="Dán mã mời vào đây"
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
          autoCorrect={false}
          errorText={error}
        />

        <Button label="Tham gia" onPress={handleSubmit} loading={isSubmitting} />
      </View>
    </Screen>
  );
}
