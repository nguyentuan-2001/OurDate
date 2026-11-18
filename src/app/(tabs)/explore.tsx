import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';

import { Card, EmptyState, ErrorState, Input, Loading, Screen, Text } from '@/components/ui';
import { exploreCategoryOptions } from '@/constants/mock-data';
import { usePreferences } from '@/features/preferences/PreferencesProvider';
import { searchPlaces, type PlaceResult } from '@/features/places/placesSearch';
import { useCurrentLocation } from '@/features/places/useCurrentLocation';
import { useTheme } from '@/hooks/use-theme';

// Nominatim (OpenStreetMap) tìm theo từ khoá tiếng Anh khớp với tag OSM tốt
// hơn nhãn tiếng Việt hiển thị cho người dùng — map riêng, không đổi nhãn UI.
const CATEGORY_SEARCH_TERMS: Record<string, string> = {
  cafe: 'cafe',
  restaurant: 'restaurant',
  photo: 'tourist attraction',
  play: 'entertainment',
};

const SEARCH_DEBOUNCE_MS = 600;

export default function ExploreScreen() {
  const { colors, spacing, radius } = useTheme();
  const { preferences } = usePreferences();
  const location = useCurrentLocation();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [searchState, setSearchState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [searchError, setSearchError] = useState<string | undefined>();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async () => {
    if (location.status !== 'granted' || location.latitude === null || location.longitude === null) {
      return;
    }
    const searchTerm = activeCategory ? CATEGORY_SEARCH_TERMS[activeCategory] : query.trim();
    if (!searchTerm) {
      setResults([]);
      setSearchState('idle');
      return;
    }
    setSearchState('loading');
    setSearchError(undefined);
    const result = await searchPlaces({
      query: searchTerm,
      latitude: location.latitude,
      longitude: location.longitude,
      radiusM: Math.round(preferences.radiusKm * 1000),
    });
    if (result.error) {
      setSearchError(result.error);
      setSearchState('error');
      return;
    }
    setResults(result.items ?? []);
    setSearchState('idle');
  }, [activeCategory, query, location.status, location.latitude, location.longitude, preferences.radiusKm]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      runSearch();
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [runSearch]);

  function toggleFavorite() {
    Alert.alert('Sắp ra mắt', 'Tính năng lưu địa điểm yêu thích sẽ có ở bản cập nhật tiếp theo.');
  }

  return (
    <Screen>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="title">Khám phá ♡</Text>
          <Text variant="caption" color="textSecondary">
            Địa điểm thật từ OpenStreetMap — một số nơi có thể thiếu giờ mở cửa/số điện thoại nếu cộng đồng
            OpenStreetMap chưa cập nhật.
          </Text>
        </View>

        <Input
          placeholder="Tìm quán ăn, café, địa điểm..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setActiveCategory(null);
          }}
        />

        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          {exploreCategoryOptions.map((category) => {
            const selected = activeCategory === category.value;
            return (
              <Pressable
                key={category.value}
                onPress={() => {
                  setActiveCategory(selected ? null : category.value);
                  setQuery('');
                }}
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

        <Text variant="subtitle">Gần bạn nhất</Text>

        {location.status === 'loading' || (searchState === 'loading' && results.length === 0) ? (
          <Loading />
        ) : location.status === 'denied' || location.status === 'error' ? (
          <ErrorState
            title="Không lấy được vị trí"
            description={location.errorMessage}
            onRetry={location.retry}
          />
        ) : searchState === 'error' ? (
          <ErrorState title="Không tìm được địa điểm" description={searchError} onRetry={runSearch} />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.placeId}
            contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xl }}
            ListEmptyComponent={
              <EmptyState
                icon="search-outline"
                title={
                  query || activeCategory ? 'Không tìm thấy địa điểm' : 'Nhập từ khoá hoặc chọn danh mục'
                }
                description={
                  query || activeCategory
                    ? 'Thử từ khoá khác hoặc bỏ bớt bộ lọc.'
                    : 'Gõ tên quán hoặc chọn một danh mục ở trên để bắt đầu tìm.'
                }
              />
            }
            renderItem={({ item }) => (
              <Card style={{ flexDirection: 'row', gap: spacing.md }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: radius.md,
                    backgroundColor: colors.surfaceSecondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="location-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text variant="bodyMedium" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text variant="caption" color="textSecondary" numberOfLines={2}>
                    {item.formattedAddress || 'Chưa có địa chỉ chi tiết'}
                  </Text>
                  {item.openingHours ? (
                    <Text variant="caption" color="textSecondary">
                      Giờ mở cửa: {item.openingHours}
                    </Text>
                  ) : null}
                </View>
                <Pressable onPress={toggleFavorite} hitSlop={8} style={{ paddingTop: 2 }}>
                  <Ionicons name="heart-outline" size={18} color={colors.textSecondary} />
                </Pressable>
              </Card>
            )}
          />
        )}
      </View>
    </Screen>
  );
}
