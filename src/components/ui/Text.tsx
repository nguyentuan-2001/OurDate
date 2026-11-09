import { StyleSheet, Text as RNText, type TextProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { ColorToken, TypographyVariant } from '@/theme';

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: ColorToken;
};

export function Text({ style, variant = 'body', color = 'textPrimary', ...rest }: AppTextProps) {
  const { colors, typography } = useTheme();

  return <RNText style={[styles.base, typography[variant], { color: colors[color] }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
