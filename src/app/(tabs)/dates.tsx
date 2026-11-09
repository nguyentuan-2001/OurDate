import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Card, Chip, EmptyState, Screen, Text } from '@/components/ui';
import { MOCK_DATA_LABEL, mockItineraries, type MockItinerary } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

const filters: { key: 'all' | MockItinerary['status']; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'planned', label: 'Sắp tới' },
  { key: 'completed', label: 'Đã hoàn thành' },
  { key: 'cancelled', label: 'Đã huỷ' },
];

const statusLabel: Record<MockItinerary['status'], string> = {
  planned: 'Sắp tới',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã huỷ',
};

export default function DatesScreen() {
  const { spacing } = useTheme();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['key']>('all');

  const results = useMemo(
    () => mockItineraries.filter((item) => activeFilter === 'all' || item.status === activeFilter),
    [activeFilter],
  );

  return (
    <Screen>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Lịch hẹn</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL} — đồng bộ hai thiết bị qua Supabase ở Milestone 7
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {filters.map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              selected={activeFilter === filter.key}
              onPress={() => setActiveFilter(filter.key)}
            />
          ))}
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xl }}
          ListEmptyComponent={
            <EmptyState
              icon="calendar-outline"
              title="Không có lịch hẹn nào"
              description="Lịch trình bạn tạo ở tab AI Date sẽ xuất hiện tại đây."
            />
          }
          renderItem={({ item }) => (
            <Card style={{ gap: 2 }}>
              <Text variant="bodyMedium">{item.title}</Text>
              <Text variant="bodySmall" color="textSecondary">
                {item.date} · {item.stopCount} điểm đến
              </Text>
              <Text variant="caption" color={item.status === 'cancelled' ? 'danger' : 'success'}>
                {statusLabel[item.status]}
              </Text>
            </Card>
          )}
        />
      </View>
    </Screen>
  );
}
