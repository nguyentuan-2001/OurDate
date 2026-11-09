import { FlatList, View } from 'react-native';

import { Card, EmptyState, Screen, Text } from '@/components/ui';
import { MOCK_DATA_LABEL, mockMemories } from '@/constants/mock-data';
import { useTheme } from '@/hooks/use-theme';

export default function MemoriesScreen() {
  const { spacing } = useTheme();

  return (
    <Screen>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="display">Kỷ niệm</Text>
          <Text variant="caption" color="textSecondary">
            {MOCK_DATA_LABEL} — ảnh kỷ niệm sẽ bổ sung sau MVP
          </Text>
        </View>

        <FlatList
          data={mockMemories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xl }}
          ListEmptyComponent={
            <EmptyState
              icon="images-outline"
              title="Chưa có kỷ niệm nào"
              description="Đánh dấu một buổi hẹn là hoàn thành để lưu lại kỷ niệm tại đây."
            />
          }
          renderItem={({ item }) => (
            <Card style={{ gap: spacing.xs }}>
              <Text variant="bodyMedium">{item.title}</Text>
              <Text variant="caption" color="textSecondary">
                {item.date}
              </Text>
              <Text variant="bodySmall">{item.note}</Text>
            </Card>
          )}
        />
      </View>
    </Screen>
  );
}
