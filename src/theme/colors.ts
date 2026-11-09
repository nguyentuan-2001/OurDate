/**
 * Our Date color tokens.
 * Light palette values come from OUR_DATE_BLUEPRINT.md section 4.1.
 * Dark palette is a derived equivalent kept in the same spirit (warm, romantic, not childish).
 */

export const lightColors = {
  background: '#FFF9F7',
  surface: '#FFFFFF',
  surfaceAlt: '#FFF3EF',
  primary: '#E8799B',
  primaryDark: '#BE5678',
  onPrimary: '#FFFFFF',
  textPrimary: '#29252A',
  textSecondary: '#817780',
  border: '#F0E6E9',
  success: '#4C9A75',
  warning: '#D79A3B',
  danger: '#C94B4B',
  overlay: 'rgba(41, 37, 42, 0.45)',
} as const;

export const darkColors = {
  background: '#1C1517',
  surface: '#272025',
  surfaceAlt: '#312930',
  primary: '#F0A0B9',
  primaryDark: '#E8799B',
  onPrimary: '#2A1620',
  textPrimary: '#F6EEF1',
  textSecondary: '#BDAEB4',
  border: '#3B3238',
  success: '#6FCB9B',
  warning: '#E5B567',
  danger: '#E27A7A',
  overlay: 'rgba(0, 0, 0, 0.55)',
} as const;

export type ColorScheme = typeof lightColors;
export type ColorToken = keyof ColorScheme;
