import { Platform } from 'react-native';

/**
 * System fonts (San Francisco on iOS, Roboto on Android) render Vietnamese
 * diacritics correctly and need no extra asset bundling, so Milestone 1
 * does not load a custom font family. Revisit if brand guidelines require one.
 */
export const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
  title: { fontSize: 24, lineHeight: 32, fontWeight: '700' as const },
  subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  button: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
};

export type TypographyVariant = keyof typeof typography;
