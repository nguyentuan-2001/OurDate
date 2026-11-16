import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';

import { Card, EmptyState, Input, Screen, Text } from '@/components/ui';
import { MOCK_DATA_LABEL, exploreCategoryOptions, mockPlaces } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

export default function ExploreScreen() {
  const { colors, spacing, radius } = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const results = useMemo(() => {
    return mockPlaces.filter((place) => {
      const matchesQuery = place.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = !activeCategory || place.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  function toggleFavorite(id: string) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  return (
    <Screen>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="title">Khám phá ♡</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL} — kết nối Google Places ở Milestone 4
          </Text>
        </View>

        <Input placeholder="Tìm quán ăn, café, địa điểm..." value={query} onChangeText={setQuery} />

        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          {exploreCategoryOptions.map((category) => {
            const selected = activeCategory === category.label;
            return (
              <Pressable
                key={category.value}
                onPress={() => setActiveCategory(selected ? null : category.label)}
                style={{
                  flex: 1,
                  backgroundColor: selected ? colors.primarySoft : colors.surface,
                  borderRadius: radius.lg,
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : colors.border,
                  paddingVertical: spacing.sm,
                  alignItems: 'center',
                  gap: spacing.xs,
                }}
              >
                <Text style={{ fontSize: 18 }}>{category.icon}</Text>
                <Text variant="caption" color={selected ? 'primary' : 'textSecondary'}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="subtitle">Gần bạn nhất</Text>
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xl }}
          ListEmptyComponent={
            <EmptyState
              icon="search-outline"
              title="Không tìm thấy địa điểm"
              description="Thử từ khoá khác hoặc bỏ bớt bộ lọc."
            />
          }
          renderItem={({ item }) => (
            <Card style={{ flexDirection: 'row', gap: spacing.md }}>
              <Image
                source={{ uri: item.photoUrl }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: radius.md,
                  backgroundColor: colors.surfaceSecondary,
                }}
              />
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="bodyMedium" numberOfLines={1}>
                  {item.name}
                </Text>
                {item.rating ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="star" size={12} color={colors.warning} />
                    <Text variant="caption">{item.rating}</Text>
                    <Text variant="caption" color="textSecondary">
                      ({item.reviewCount}) · {item.distanceKm} km
                    </Text>
                  </View>
                ) : (
                  <Text variant="caption" color="textSecondary">
                    {item.distanceKm} km
                  </Text>
                )}
                <Text variant="caption" color="textSecondary" numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
              <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={8} style={{ paddingTop: 2 }}>
                <Ionicons
                  name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={18}
                  color={favorites.includes(item.id) ? colors.primary : colors.textSecondary}
                />
              </Pressable>
            </Card>
          )}
          ListFooterComponent={
            <View style={{ gap: spacing.sm, marginTop: spacing.sm }}>
              <Text variant="subtitle">Khám phá trên bản đồ</Text>
              <View
                style={{
                  height: 100,
                  borderRadius: radius.lg,
                  backgroundColor: colors.surfaceSecondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing.xs,
                }}
              >
                <Ionicons name="map-outline" size={24} color={colors.textSecondary} />
                <Text variant="caption" color="textSecondary">
                  Bản đồ thật sẽ hiển thị ở Milestone 5
                </Text>
              </View>
            </View>
          }
        />
      </View>
    </Screen>
  );
}
