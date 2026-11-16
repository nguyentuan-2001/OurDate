/**
 * Our Date color tokens.
 * Nguồn: mockup trong src/UI/*.html + assets/images/UI.png (chủ dự án cung cấp
 * 2026-11-16), thay cho bản phác thảo trước đó theo docs/UI_DESIGN_SPEC.md.
 */

export const lightColors = {
  background: '#FFF1F5',
  surface: '#FFFFFF',
  surfaceSecondary: '#FFEBF1',
  primary: '#FF6F91',
  primaryPressed: '#FF4C78',
  primarySoft: '#FFD6E5',
  secondary: '#8B5CF6',
  onPrimary: '#FFFFFF',
  textPrimary: '#4A1525',
  textSecondary: '#8A4A5E',
  border: '#FFE0E9',
  success: '#3D9B75',
  warning: '#FFB703',
  danger: '#D94D67',
  tabBar: '#FFFFFF',
  overlay: 'rgba(74, 21, 37, 0.45)',
} as const;

export const darkColors = {
  background: '#1C1013',
  surface: '#2A1920',
  surfaceSecondary: '#35202A',
  primary: '#FF7E9F',
  primaryPressed: '#FF5F85',
  primarySoft: '#4A2430',
  secondary: '#A78BFA',
  onPrimary: '#2A1016',
  textPrimary: '#FBE7EC',
  textSecondary: '#D39CAE',
  border: '#4A2730',
  success: '#75C6A2',
  warning: '#FFC94D',
  danger: '#F17B91',
  tabBar: '#241620',
  overlay: 'rgba(0, 0, 0, 0.55)',
} as const;

export type ColorScheme = typeof lightColors;
export type ColorToken = keyof ColorScheme;
