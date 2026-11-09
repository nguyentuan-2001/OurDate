import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Text } from './Text';

export type LoadingProps = {
  label?: string;
  fullScreen?: boolean;
};

export function Loading({ label, fullScreen = false }: LoadingProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { gap: spacing.sm },
        fullScreen && { flex: 1, backgroundColor: colors.background },
      ]}
    >
      <ActivityIndicator color={colors.primary} size="large" />
      {label ? (
        <Text variant="bodySmall" color="textSecondary">
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
});
