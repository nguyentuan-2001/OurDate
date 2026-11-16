import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { Card, EmptyState, Screen, Text } from '@/components/ui';
import {
  MOCK_DATA_LABEL,
  mockItineraries,
  mockUpcomingItinerary,
  type MockItinerary,
} from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayIndex = (firstDay.getDay() + 6) % 7;
  const cells: (number | null)[] = Array(mondayIndex).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const statusLabel: Record<MockItinerary['status'], string> = {
  planned: 'Sắp tới',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã huỷ',
};

export default function DatesScreen() {
  const { colors, spacing, radius } = useTheme();
  const [segment, setSegment] = useState<'upcoming' | 'past'>('upcoming');
  const [displayedMonth, setDisplayedMonth] = useState(() => {
    const base = mockUpcomingItinerary ? new Date(mockUpcomingItinerary.date) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const markedDays = useMemo(() => new Set(mockItineraries.map((item) => new Date(item.date).getDate())), []);
  const selectedDay = mockUpcomingItinerary ? new Date(mockUpcomingItinerary.date).getDate() : null;
  const isSelectedMonth =
    mockUpcomingItinerary &&
    new Date(mockUpcomingItinerary.date).getMonth() === displayedMonth.getMonth() &&
    new Date(mockUpcomingItinerary.date).getFullYear() === displayedMonth.getFullYear();

  const grid = buildMonthGrid(displayedMonth.getFullYear(), displayedMonth.getMonth());

  const results = mockItineraries.filter((item) =>
    segment === 'upcoming' ? item.status === 'planned' : item.status !== 'planned',
  );

  function changeMonth(delta: number) {
    setDisplayedMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  return (
    <Screen>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="title">Lịch hẹn ♡</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL} — đồng bộ hai thiết bị qua Supabase ở Milestone 7
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.surfaceSecondary,
            borderRadius: radius.full,
            padding: 4,
          }}
        >
          {(['upcoming', 'past'] as const).map((key) => (
            <Pressable
              key={key}
              onPress={() => setSegment(key)}
              style={{
                flex: 1,
                paddingVertical: spacing.sm,
                borderRadius: radius.full,
                backgroundColor: segment === key ? colors.surface : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text variant="bodySmall" color={segment === key ? 'primary' : 'textSecondary'}>
                {key === 'upcoming' ? 'Lịch của chúng ta' : 'Đã qua'}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={() => changeMonth(-1)} hitSlop={8}>
              <Ionicons name="chevron-back" size={16} color={colors.textPrimary} />
            </Pressable>
            <Text variant="bodyMedium">
              Tháng {displayedMonth.getMonth() + 1}, {displayedMonth.getFullYear()}
            </Text>
            <Pressable onPress={() => changeMonth(1)} hitSlop={8}>
              <Ionicons name="chevron-forward" size={16} color={colors.textPrimary} />
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row' }}>
            {WEEKDAY_LABELS.map((label) => (
              <Text
                key={label}
                variant="caption"
                color="textSecondary"
                style={{ flex: 1, textAlign: 'center' }}
              >
                {label}
              </Text>
            ))}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {grid.map((day, index) => {
              const isSelected = isSelectedMonth && day === selectedDay;
              const isMarked = day !== null && markedDays.has(day) && isSelectedMonth;
              return (
                <View key={index} style={{ width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 4 }}>
                  {day !== null ? (
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isSelected ? colors.primarySoft : 'transparent',
                        borderWidth: isSelected ? 1.5 : 0,
                        borderColor: colors.primary,
                      }}
                    >
                      <Text variant="bodySmall" color={isSelected ? 'primary' : 'textPrimary'}>
                        {day}
                      </Text>
                      {isMarked && !isSelected ? (
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 1,
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: colors.primary,
                          }}
                        />
                      ) : null}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xxxl }}
          ListEmptyComponent={
            <EmptyState
              icon="calendar-outline"
              title="Không có lịch hẹn nào"
              description="Lịch trình bạn tạo ở tab AI Date sẽ xuất hiện tại đây."
            />
          }
          renderItem={({ item }) => {
            const CardInner = (
              <Card style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: radius.md,
                    backgroundColor: colors.primarySoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons
                    name={item.status === 'cancelled' ? 'close-circle-outline' : 'heart'}
                    size={18}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text variant="bodyMedium">{item.title} ♡</Text>
                  <Text variant="caption" color="textSecondary">
                    {item.date} · {item.stopCount} địa điểm
                  </Text>
                  <Text variant="caption" color={item.status === 'cancelled' ? 'danger' : 'success'}>
                    {statusLabel[item.status]}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.primary} />
              </Card>
            );
            return item.id === mockUpcomingItinerary?.id ? (
              <Link href="/itinerary-result" asChild>
                <Pressable>{CardInner}</Pressable>
              </Link>
            ) : (
              CardInner
            );
          }}
        />
      </View>

      <Pressable
        onPress={() => router.push('/planner')}
        style={({ pressed }) => ({
          position: 'absolute',
          right: spacing.lg,
          bottom: spacing.xxl,
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: pressed ? colors.primaryPressed : colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 4,
        })}
      >
        <Ionicons name="add" size={26} color={colors.onPrimary} />
      </Pressable>
    </Screen>
  );
}
