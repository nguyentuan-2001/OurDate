/**
 * Our Date color tokens.
 * Source of truth: docs/UI_DESIGN_SPEC.md section 3 (Cute Romantic, Light + Dark).
 * Confirmed by chủ dự án 2026-11-11 to replace the earlier blueprint placeholder palette.
 */

export const lightColors = {
  background: '#FFF7F8',
  surface: '#FFFFFF',
  surfaceSecondary: '#FFF0F4',
  primary: '#FF6F91',
  primaryPressed: '#E9577D',
  primarySoft: '#FFD6E2',
  secondary: '#B86A83',
  onPrimary: '#FFFFFF',
  textPrimary: '#49313B',
  textSecondary: '#866D78',
  border: '#F1DDE4',
  success: '#3D9B75',
  warning: '#E5A33B',
  danger: '#D94D67',
  tabBar: '#FFFFFF',
  overlay: 'rgba(73, 49, 59, 0.45)',
} as const;

export const darkColors = {
  background: '#171317',
  surface: '#241D23',
  surfaceSecondary: '#30232C',
  primary: '#FF789B',
  primaryPressed: '#E85E83',
  primarySoft: '#593344',
  secondary: '#D58BA2',
  onPrimary: '#2A1620',
  textPrimary: '#FFF0F4',
  textSecondary: '#C2AAB5',
  border: '#493541',
  success: '#75C6A2',
  warning: '#F0BE65',
  danger: '#F17B91',
  tabBar: '#211A20',
  overlay: 'rgba(0, 0, 0, 0.55)',
} as const;

export type ColorScheme = typeof lightColors;
export type ColorToken = keyof ColorScheme;
