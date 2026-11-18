import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Button, Chip, FieldCard, Input, Screen, Text } from '@/components/ui';
import { interestOptions, transportOptions } from '@/constants/mock-data';
import { usePreferences, type TransportMode } from '@/features/preferences/PreferencesProvider';
import { useTheme } from '@/hooks/use-theme';

export default function PreferencesScreen() {
  const { colors, spacing } = useTheme();
  const { preferences, isLoading, savePreferences } = usePreferences();

  const [radiusKm, setRadiusKm] = useState(String(preferences.radiusKm));
  const [transportMode, setTransportMode] = useState<TransportMode>(preferences.transportMode);
  const [budgetVnd, setBudgetVnd] = useState(preferences.budgetVnd ? String(preferences.budgetVnd) : '');
  const [interests, setInterests] = useState<string[]>(preferences.interests);
  const [avoidText, setAvoidText] = useState(preferences.avoidPreferences.join(', '));
  const [error, setError] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    queueMicrotask(() => {
      setRadiusKm(String(preferences.radiusKm));
      setTransportMode(preferences.transportMode);
      setBudgetVnd(preferences.budgetVnd ? String(preferences.budgetVnd) : '');
      setInterests(preferences.interests);
      setAvoidText(preferences.avoidPreferences.join(', '));
    });
    // Chỉ nạp lại form khi dữ liệu từ server về lần đầu, tránh ghi đè lúc người dùng đang gõ.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function toggleInterest(value: string) {
    setInterests((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  }

  async function handleSave() {
    const radius = Number(radiusKm.replace(',', '.'));
    if (!radiusKm.trim() || Number.isNaN(radius) || radius <= 0) {
      setError('Bán kính phải là một số lớn hơn 0.');
      return;
    }
    setError(undefined);
    setIsSaving(true);
    const result = await savePreferences({
      radiusKm: radius,
      transportMode,
      budgetVnd: budgetVnd.trim() ? Number(budgetVnd.replace(/\D/g, '')) : null,
      interests,
      avoidPreferences: avoidText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
    setIsSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.back();
  }

  const transportIcon =
    transportOptions.find((option) => option.value === transportMode)?.icon ?? 'car-outline';
  const transportLabel = transportOptions.find((option) => option.value === transportMode)?.label ?? '';

  return (
    <Screen scroll>
      <View style={{ gap: spacing.lg, paddingTop: spacing.xxl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text variant="title">Sở thích & lịch trình</Text>
        </View>

        <Text variant="bodySmall" color="textSecondary">
          Cấu hình này dùng chung cho cả hai bạn — sẽ được dùng làm giá trị mặc định khi tạo lịch trình mới.
        </Text>

        <View style={{ gap: spacing.sm }}>
          <FieldCard
            icon="locate-outline"
            label="Bán kính khám phá (km)"
            value={radiusKm}
            onChangeText={setRadiusKm}
            keyboardType="numeric"
          />
          <FieldCard
            icon={transportIcon}
            label="Phương tiện mặc định (chạm để đổi)"
            value={transportLabel}
            onPress={() => {
              const currentIndex = transportOptions.findIndex((option) => option.value === transportMode);
              const next = transportOptions[(currentIndex + 1) % transportOptions.length];
              setTransportMode(next.value);
            }}
          />
          <FieldCard
            icon="cash-outline"
            label="Ngân sách mặc định (VNĐ, để trống nếu không giới hạn)"
            value={budgetVnd}
            onChangeText={setBudgetVnd}
            keyboardType="numeric"
            errorText={error}
          />
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="bodyMedium">
            Sở thích{' '}
            <Text variant="caption" color="textSecondary">
              (chọn nhiều)
            </Text>
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {interestOptions.map((interest) => (
              <Chip
                key={interest.value}
                icon={interest.icon}
                label={interest.label}
                selected={interests.includes(interest.value)}
                onPress={() => toggleInterest(interest.value)}
              />
            ))}
          </View>
        </View>

        <Input
          label="Điều cần tránh (cách nhau bằng dấu phẩy)"
          placeholder="Ví dụ: hải sản, nơi quá đông người"
          value={avoidText}
          onChangeText={setAvoidText}
        />

        <Button label="Lưu cấu hình" onPress={handleSave} loading={isSaving} />
      </View>
    </Screen>
  );
}
