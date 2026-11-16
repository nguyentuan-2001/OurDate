import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Input, Screen, Text } from '@/components/ui';
import { useCouple } from '@/features/couple/CoupleProvider';
import { useTheme } from '@/hooks/use-theme';

export default function CreateCoupleScreen() {
  const { spacing } = useTheme();
  const { createCouple } = useCouple();

  const [name, setName] = useState('');
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setError(undefined);
    setIsSubmitting(true);
    const result = await createCouple({ displayName: name, anniversaryDate });
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    // Khi tạo xong, Couple context cập nhật và điều hướng chính sẽ tự chuyển sang app chính.
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.lg, paddingTop: spacing.xxl }}>
        <Button label="‹ Quay lại" variant="ghost" fullWidth={false} onPress={() => router.back()} />
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Đặt tên không gian ♡</Text>
          <Text variant="body" color="textSecondary">
            Có thể bỏ trống, bạn sửa lại sau cũng được.
          </Text>
        </View>

        <Input
          label="Tên không gian (tuỳ chọn)"
          placeholder="Ví dụ: Our Little World"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Ngày kỷ niệm (tuỳ chọn)"
          placeholder="YYYY-MM-DD"
          value={anniversaryDate}
          onChangeText={setAnniversaryDate}
          errorText={error}
        />

        <Button label="Tạo không gian của chúng ta" onPress={handleSubmit} loading={isSubmitting} />
      </View>
    </Screen>
  );
}
