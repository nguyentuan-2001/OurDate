import { router } from 'expo-router';
import { useState } from 'react';
import { Switch, View } from 'react-native';

import { CatHeartIllustration } from '@/components/illustrations/CatHeartIllustration';
import { Button, Chip, FieldCard, Input, Screen, Text } from '@/components/ui';
import { interestOptions, transportOptions } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

const startPointOptions = ['Nhà tôi', 'Nhà người yêu', 'Tự chọn điểm khác'] as const;

export default function PlannerScreen() {
  const { colors, spacing } = useTheme();

  const [date, setDate] = useState('08/11/2026');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('20:00');
  const [budget, setBudget] = useState('500.000đ');
  const [radiusKm, setRadiusKm] = useState('15');
  const [transportMode, setTransportMode] =
    useState<(typeof transportOptions)[number]['value']>('TWO_WHEELER');
  const [startPoint, setStartPoint] = useState<(typeof startPointOptions)[number]>(startPointOptions[0]);
  const [pickupPartnerFirst, setPickupPartnerFirst] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['food']);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | undefined>();

  function toggleInterest(value: string) {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }

  function handleSubmit() {
    if (!date.trim() || !startTime.trim() || !endTime.trim()) {
      setError('Vui lòng nhập ngày, giờ bắt đầu và giờ kết thúc.');
      return;
    }
    setError(undefined);
    router.push('/itinerary-result');
  }

  const transportIcon =
    transportOptions.find((option) => option.value === transportMode)?.icon ?? 'car-outline';
  const transportLabel = transportOptions.find((option) => option.value === transportMode)?.label ?? '';

  return (
    <Screen scroll>
      <View style={{ gap: spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text variant="display">AI Date Planner ✨</Text>
            <Text variant="bodySmall" color="textSecondary" style={{ marginTop: spacing.xs }}>
              Để Our Date lên kế hoạch hẹn hò hoàn hảo cho hai bạn nhé! ♡
            </Text>
          </View>
          <CatHeartIllustration />
        </View>

        <View style={{ gap: spacing.sm }}>
          <FieldCard
            icon="calendar-outline"
            label="Ngày đi"
            value={date}
            onChangeText={setDate}
            errorText={error}
          />
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <View style={{ flex: 1 }}>
              <FieldCard
                icon="time-outline"
                label="Giờ bắt đầu"
                value={startTime}
                onChangeText={setStartTime}
              />
            </View>
            <View style={{ flex: 1 }}>
              <FieldCard icon="time-outline" label="Giờ kết thúc" value={endTime} onChangeText={setEndTime} />
            </View>
          </View>
          <FieldCard
            icon="cash-outline"
            label="Ngân sách"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <FieldCard
            icon="locate-outline"
            label="Bán kính khám phá (km)"
            value={radiusKm}
            onChangeText={setRadiusKm}
            keyboardType="numeric"
          />
          <FieldCard
            icon={transportIcon}
            label="Phương tiện (chạm để đổi)"
            value={transportLabel}
            onPress={() => {
              const currentIndex = transportOptions.findIndex((option) => option.value === transportMode);
              const next = transportOptions[(currentIndex + 1) % transportOptions.length];
              setTransportMode(next.value);
            }}
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
                selected={selectedInterests.includes(interest.value)}
                onPress={() => toggleInterest(interest.value)}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="caption" color="textSecondary">
            Điểm bắt đầu
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {startPointOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={startPoint === option}
                onPress={() => setStartPoint(option)}
              />
            ))}
          </View>
          <Text variant="caption" color="textSecondary">
            Địa chỉ nhà sẽ được cấu hình riêng tư ở Milestone 3 — hiện tại đây chỉ là lựa chọn giao diện.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text variant="bodyMedium">Đón người yêu trước</Text>
            <Text variant="caption" color="textSecondary">
              Người tạo lịch trình sẽ đi đón người còn lại trước khi bắt đầu.
            </Text>
          </View>
          <Switch
            value={pickupPartnerFirst}
            onValueChange={setPickupPartnerFirst}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>

        <Input
          label="Ghi chú (tuỳ chọn)"
          placeholder="Điều cần tránh, mong muốn thêm..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />

        <Button label="Tạo lịch trình bằng AI ✨" onPress={handleSubmit} />

        <Text variant="caption" color="textSecondary" style={{ textAlign: 'center' }}>
          Giao diện minh hoạ — lịch trình hiển thị là dữ liệu mẫu, chưa nối bộ lập lịch trình thật (Milestone
          6).
        </Text>
      </View>
    </Screen>
  );
}
