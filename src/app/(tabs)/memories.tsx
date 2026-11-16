import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

import { Card, EmptyState, Screen, Text } from '@/components/ui';
import { MOCK_DATA_LABEL, mockMemories } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

const memoryTabs = ['Timeline', 'Album', 'Địa điểm'] as const;

export default function MemoriesScreen() {
  const { colors, spacing, radius } = useTheme();
  const [activeTab, setActiveTab] = useState<(typeof memoryTabs)[number]>('Timeline');

  const heroPhoto = mockMemories.find((memory) => memory.photoUrls.length > 0)?.photoUrls[0];

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.lg, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="title">Kỷ niệm ♡</Text>
          <Pressable
            hitSlop={8}
            onPress={() => Alert.alert('Yêu thích', 'Danh sách kỷ niệm yêu thích sẽ có ở Milestone 7.')}
          >
            <Ionicons name="heart-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>

        {heroPhoto ? (
          <View style={{ height: 160, borderRadius: radius.xl, overflow: 'hidden' }}>
            <Image source={{ uri: heroPhoto }} style={{ width: '100%', height: '100%' }} />
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: spacing.md,
                backgroundColor: colors.overlay,
              }}
            >
              <Text variant="bodyMedium" style={{ color: '#FFFFFF' }}>
                Những kỷ niệm của chúng ta ♡
              </Text>
              <Text variant="caption" style={{ color: '#FFFFFF' }}>
                {mockMemories.length} khoảnh khắc · {MOCK_DATA_LABEL}
              </Text>
            </View>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            gap: spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          {memoryTabs.map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={{ paddingBottom: spacing.sm }}>
              <Text variant="bodyMedium" color={activeTab === tab ? 'primary' : 'textSecondary'}>
                {tab}
              </Text>
              {activeTab === tab ? (
                <View style={{ height: 2, backgroundColor: colors.primary, marginTop: 4, borderRadius: 1 }} />
              ) : null}
            </Pressable>
          ))}
        </View>

        {activeTab !== 'Timeline' ? (
          <Card style={{ alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm }}>
            <Ionicons
              name={activeTab === 'Album' ? 'images-outline' : 'location-outline'}
              size={28}
              color={colors.textSecondary}
            />
            <Text variant="bodyMedium">Chưa khả dụng trong bản demo</Text>
            <Text variant="caption" color="textSecondary" style={{ textAlign: 'center' }}>
              {activeTab} sẽ hoàn thiện cùng Milestone 7.
            </Text>
          </Card>
        ) : (
          <FlatList
            data={mockMemories}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: spacing.lg, paddingBottom: spacing.xxxl }}
            ListEmptyComponent={
              <EmptyState
                icon="images-outline"
                title="Chưa có kỷ niệm nào"
                description="Đánh dấu một buổi hẹn là hoàn thành để lưu lại kỷ niệm tại đây."
              />
            }
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <View style={{ alignItems: 'center', width: 16 }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.primary,
                      marginTop: 4,
                    }}
                  />
                  <View style={{ width: 2, flex: 1, backgroundColor: colors.border, marginTop: 4 }} />
                </View>
                <View style={{ flex: 1, gap: spacing.xs }}>
                  <Text variant="caption" color="textSecondary">
                    {item.date}
                  </Text>
                  <Text variant="bodyMedium">{item.title} ♡</Text>
                  <Text variant="bodySmall">{item.note}</Text>
                  {item.photoUrls.length > 0 ? (
                    <View style={{ flexDirection: 'row', gap: spacing.xs, height: 88 }}>
                      <Image
                        source={{ uri: item.photoUrls[0] }}
                        style={{ flex: 1, height: '100%', borderRadius: radius.md }}
                      />
                      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                        {item.photoUrls.slice(1, 4).map((url, index) => (
                          <View key={url} style={{ width: '48%', height: '48%' }}>
                            <Image
                              source={{ uri: url }}
                              style={{ width: '100%', height: '100%', borderRadius: 8 }}
                            />
                            {index === 2 && item.photoUrls.length > 4 ? (
                              <View
                                style={[
                                  StyleSheet.absoluteFill,
                                  {
                                    backgroundColor: colors.overlay,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                ]}
                              >
                                <Text variant="caption" style={{ color: '#FFFFFF' }}>
                                  +{item.photoUrls.length - 4}
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Pressable
        onPress={() => Alert.alert('Sắp ra mắt', 'Thêm kỷ niệm + tải ảnh sẽ hoàn thiện ở Milestone 7.')}
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
        <Ionicons name="add" size={24} color={colors.onPrimary} />
      </Pressable>
    </Screen>
  );
}
