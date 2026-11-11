import { useState } from 'react';
import { Alert, Switch, View } from 'react-native';

import { Button, Card, Chip, Input, Screen, Text } from '@/components/ui';
import { interestOptions, transportOptions } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

const startPointOptions = ['Nhà tôi', 'Nhà người yêu', 'Tự chọn điểm khác'] as const;

export default function PlannerScreen() {
  const { colors, spacing } = useTheme();

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [budget, setBudget] = useState('');
  const [radiusKm, setRadiusKm] = useState('15');
  const [transportMode, setTransportMode] = useState<(typeof transportOptions)[number]['value']>('DRIVE');
  const [startPoint, setStartPoint] = useState<(typeof startPointOptions)[number]>(startPointOptions[0]);
  const [pickupPartnerFirst, setPickupPartnerFirst] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [dateError, setDateError] = useState<string | undefined>();

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
    );
  }

  function handleSubmit() {
    if (!date || !startTime || !endTime) {
      setDateError('Vui lòng nhập ngày, giờ bắt đầu và giờ kết thúc.');
      return;
    }
    setDateError(undefined);

    Alert.alert(
      'Sắp ra mắt',
      'Bộ lập lịch trình thông minh sẽ được kết nối ở Milestone 6 (Planner logic và AI). ' +
        'Hiện tại form chỉ đang hiển thị giao diện với dữ liệu bạn vừa nhập.',
    );
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.xl }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">AI Date</Text>
          <Text variant="bodySmall" color="textSecondary">
            Nhập thông tin buổi hẹn để tạo lịch trình phù hợp cho cả hai.
          </Text>
        </View>

        <Card style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.surfaceSecondary }}>
          <Text variant="caption" color="textSecondary">
            Giao diện Milestone 1 — chưa kết nối bộ lập lịch trình thật. Nhấn &quot;Tạo lịch trình&quot; để
            xem thông báo trạng thái.
          </Text>
        </Card>

        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <Input label="Ngày đi" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <Input
              label="Giờ bắt đầu"
              placeholder="HH:mm"
              value={startTime}
              onChangeText={setStartTime}
              errorText={dateError}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Giờ kết thúc" placeholder="HH:mm" value={endTime} onChangeText={setEndTime} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <Input
              label="Ngân sách (VND)"
              placeholder="Ví dụ: 500000"
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              label="Bán kính khám phá (km)"
              keyboardType="numeric"
              value={radiusKm}
              onChangeText={setRadiusKm}
            />
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="bodySmall" color="textSecondary">
            Phương tiện
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {transportOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={transportMode === option.value}
                onPress={() => setTransportMode(option.value)}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="bodySmall" color="textSecondary">
            Sở thích
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {interestOptions.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="bodySmall" color="textSecondary">
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

        <Button label="Tạo lịch trình" onPress={handleSubmit} />
      </View>
    </Screen>
  );
}
