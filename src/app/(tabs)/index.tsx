import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';

import { Card, Chip, EmptyState, Screen, Text } from '@/components/ui';
import { MOCK_DATA_LABEL, mockPlaces, mockUpcomingItinerary } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const recentPlaces = mockPlaces.slice(0, 3);

  return (
    <Screen scroll>
      <View style={{ gap: spacing.xl }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="bodySmall" color="textSecondary">
            Chào buổi sáng 👋
          </Text>
          <Text variant="display">Our Date</Text>
        </View>

        <Link href="/planner" asChild>
          <Pressable>
            <Card style={{ backgroundColor: colors.primary, borderColor: colors.primary, gap: spacing.sm }}>
              <Text variant="subtitle" style={{ color: colors.onPrimary }}>
                Hôm nay mình đi đâu nhỉ?
              </Text>
              <Text variant="bodySmall" style={{ color: colors.onPrimary }}>
                Tạo lịch trình hẹn hò mới chỉ trong vài bước.
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Text variant="bodyMedium" style={{ color: colors.onPrimary }}>
                  Bắt đầu lên kế hoạch
                </Text>
                <Ionicons name="arrow-forward" size={18} color={colors.onPrimary} />
              </View>
            </Card>
          </Pressable>
        </Link>

        <View style={{ gap: spacing.sm }}>
          <Text variant="subtitle">Lịch hẹn sắp tới</Text>
          {mockUpcomingItinerary ? (
            <Card style={{ gap: spacing.xs }}>
              <Text variant="caption" color="textSecondary">
                {MOCK_DATA_LABEL}
              </Text>
              <Text variant="bodyMedium">{mockUpcomingItinerary.title}</Text>
              <Text variant="bodySmall" color="textSecondary">
                {mockUpcomingItinerary.date} · {mockUpcomingItinerary.stopCount} điểm đến
              </Text>
            </Card>
          ) : (
            <EmptyState
              icon="calendar-clear-outline"
              title="Chưa có lịch hẹn nào"
              description="Tạo lịch trình đầu tiên của hai bạn ở tab AI Date."
            />
          )}
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="subtitle">Gợi ý hoạt động</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL} — sẽ được thay bằng địa điểm thật ở milestone sau
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockPlaces}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: spacing.sm }}
            renderItem={({ item }) => <Chip label={item.name} />}
          />
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="subtitle">Địa điểm đã lưu gần đây</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL}
          </Text>
          <View style={{ gap: spacing.sm }}>
            {recentPlaces.map((place) => (
              <Card key={place.id} style={{ gap: 2 }}>
                <Text variant="bodyMedium">{place.name}</Text>
                <Text variant="bodySmall" color="textSecondary">
                  {place.category} · {place.distanceKm} km · {place.address}
                </Text>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}
