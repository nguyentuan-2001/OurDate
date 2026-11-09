import { ScrollView, StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

export type ScreenProps = ViewProps & {
  scroll?: boolean;
  padded?: boolean;
};

export function Screen({ children, style, scroll = false, padded = true, ...rest }: ScreenProps) {
  const { colors, spacing } = useTheme();
  const padding = padded ? { padding: spacing.lg } : undefined;

  return (
    <SafeAreaView
      style={[styles.flex, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {scroll ? (
        <ScrollView contentContainerStyle={[padding, style]} {...rest}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding, style]} {...rest}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
