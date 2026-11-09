import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Card, Chip, EmptyState, Input, Screen, Text } from '@/components/ui';
import { MOCK_DATA_LABEL, mockPlaces } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

export default function ExploreScreen() {
  const { spacing } = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(mockPlaces.map((place) => place.category))), []);

  const results = useMemo(() => {
    return mockPlaces.filter((place) => {
      const matchesQuery = place.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = !activeCategory || place.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <Screen>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Khám phá</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL} — kết nối Google Places ở Milestone 4
          </Text>
        </View>

        <Input placeholder="Tìm địa điểm..." value={query} onChangeText={setQuery} />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={{ gap: spacing.sm }}
          renderItem={({ item }) => (
            <Chip
              label={item}
              selected={activeCategory === item}
              onPress={() => setActiveCategory(activeCategory === item ? null : item)}
            />
          )}
        />

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
            <Card style={{ gap: 2 }}>
              <Text variant="bodyMedium">{item.name}</Text>
              <Text variant="bodySmall" color="textSecondary">
                {item.category} · {item.distanceKm} km
              </Text>
              <Text variant="caption" color="textSecondary">
                {item.address}
              </Text>
            </Card>
          )}
        />
      </View>
    </Screen>
  );
}
