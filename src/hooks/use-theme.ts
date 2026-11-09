import { useColorScheme } from 'react-native';

import { darkColors, lightColors, radius, spacing, typography } from '@/theme';

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    spacing,
    radius,
    typography,
    scheme: isDark ? ('dark' as const) : ('light' as const),
  };
}
