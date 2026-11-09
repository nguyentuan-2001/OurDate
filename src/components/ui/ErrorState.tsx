import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Button } from './Button';
import { Text } from './Text';

export type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = 'Có lỗi xảy ra',
  description = 'Vui lòng thử lại sau.',
  onRetry,
}: ErrorStateProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xl, gap: spacing.sm }]}>
      <Ionicons name="alert-circle-outline" size={40} color={colors.danger} />
      <Text variant="subtitle" style={styles.center}>
        {title}
      </Text>
      <Text variant="bodySmall" color="textSecondary" style={styles.center}>
        {description}
      </Text>
      {onRetry ? (
        <View style={{ marginTop: spacing.md, width: '100%' }}>
          <Button label="Thử lại" variant="secondary" onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
});
