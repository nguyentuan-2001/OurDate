import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

import { darkColors, lightColors } from './colors';

export { darkColors, lightColors } from './colors';
export type { ColorScheme, ColorToken } from './colors';
export { hitSlop, radius, spacing } from './spacing';
export { fontFamily, typography } from './typography';
export type { TypographyVariant } from './typography';

/** Builds a React Navigation theme so screen chrome (header/tab bar) matches our palette. */
export function getNavigationTheme(scheme: 'light' | 'dark' | null | undefined): Theme {
  const isDark = scheme === 'dark';
  const base = isDark ? DarkTheme : DefaultTheme;
  const colors = isDark ? darkColors : lightColors;

  return {
    ...base,
    dark: isDark,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.danger,
    },
  };
}
