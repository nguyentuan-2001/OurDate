import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, View } from 'react-native';

import { Card, Chip, Screen, Text } from '@/components/ui';
import {
  MOCK_DATA_LABEL,
  mockItineraryStops,
  mockItineraryTotals,
  mockUpcomingItinerary,
} from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';
import { formatVnd } from '@/utils/format';

const tabs = ['Tổng quan', 'Bản đồ', 'Chi tiết'] as const;

export default function ItineraryResultScreen() {
  const { colors, spacing, radius } = useTheme();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Tổng quan');

  function handleSave() {
    Alert.alert(
      'Sắp ra mắt',
      'Lưu lịch trình thật sẽ được kết nối ở Milestone 6 (Planner logic và AI). Đây vẫn là dữ liệu mẫu.',
    );
  }

  return (
    <Screen scroll padded={false}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: spacing.lg,
        }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text variant="subtitle">Lịch trình gợi ý ♡</Text>
        <Pressable hitSlop={8} onPress={() => Alert.alert('Yêu thích', 'Đã lưu vào mục yêu thích (mẫu).')}>
          <Ionicons name="heart-outline" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: spacing.lg,
          gap: spacing.sm,
          marginBottom: spacing.md,
        }}
      >
        {tabs.map((tab) => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)} style={{ paddingBottom: spacing.xs }}>
            <View
              style={{
                backgroundColor: activeTab === tab ? colors.primarySoft : 'transparent',
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs,
                borderRadius: radius.full,
              }}
            >
              <Text variant="bodySmall" color={activeTab === tab ? 'primary' : 'textSecondary'}>
                {tab}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxxl }}>
        {activeTab !== 'Tổng quan' ? (
          <Card style={{ alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm }}>
            <Ionicons
              name={activeTab === 'Bản đồ' ? 'map-outline' : 'list-outline'}
              size={32}
              color={colors.textSecondary}
            />
            <Text variant="bodyMedium">Chưa khả dụng trong bản demo</Text>
            <Text variant="caption" color="textSecondary" style={{ textAlign: 'center' }}>
              Chế độ xem {activeTab.toLowerCase()} sẽ hoàn thiện cùng Milestone 5-6.
            </Text>
          </Card>
        ) : (
          <>
            <Image
              source={{ uri: mockItineraryStops[0]?.photoUrl }}
              style={{
                width: '100%',
                height: 144,
                borderRadius: radius.lg,
                backgroundColor: colors.surfaceSecondary,
              }}
            />

            <View style={{ gap: spacing.md }}>
              {mockItineraryStops.map((stop) => (
                <View key={stop.id} style={{ flexDirection: 'row', gap: spacing.md }}>
                  <View style={{ alignItems: 'center', width: 16 }}>
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        borderWidth: 3,
                        borderColor: colors.primaryPressed,
                        backgroundColor: colors.background,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, gap: spacing.xs }}>
                    <Text variant="bodySmall" color="textSecondary">
                      {stop.time}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                      <Image
                        source={{ uri: stop.photoUrl }}
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: radius.md,
                          backgroundColor: colors.surfaceSecondary,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text variant="bodyMedium" numberOfLines={1}>
                          {stop.name}
                        </Text>
                        <Text variant="caption" color="textSecondary">
                          {stop.category} · {stop.durationMinutes} phút · ~{formatVnd(stop.estimatedCostVnd)}đ
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <Card style={{ gap: spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="bodySmall">Tổng dự kiến</Text>
                <Text variant="bodyMedium" color="primary">
                  ~ {formatVnd(mockItineraryTotals.estimatedCostVnd)}đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: spacing.lg,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                  paddingTop: spacing.sm,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                  <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                  <Text variant="caption" color="textSecondary">
                    {mockItineraryTotals.durationHours} giờ
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                  <Ionicons name="navigate-outline" size={14} color={colors.textSecondary} />
                  <Text variant="caption" color="textSecondary">
                    {mockItineraryTotals.distanceKm} km
                  </Text>
                </View>
              </View>
            </Card>

            <Chip label={`${mockUpcomingItinerary?.title ?? ''} · ${MOCK_DATA_LABEL}`} />

            <Pressable
              onPress={handleSave}
              style={({ pressed }) => ({
                backgroundColor: pressed ? colors.primaryPressed : colors.primary,
                borderRadius: radius.full,
                paddingVertical: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
              })}
            >
              <Text variant="button" style={{ color: colors.onPrimary }}>
                Lưu lịch trình
              </Text>
              <Ionicons name="heart" size={16} color={colors.onPrimary} />
            </Pressable>
          </>
        )}
      </View>
    </Screen>
  );
}
