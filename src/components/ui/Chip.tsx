import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Text } from './Text';

export type ChipProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, icon, selected = false, onPress }: ChipProps) {
  const { colors, spacing, radius } = useTheme();
  const textColor = selected ? colors.onPrimary : colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? colors.primary : colors.primarySoft,
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: radius.full,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          gap: spacing.xs,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      {icon ? <Ionicons name={icon} size={13} color={textColor} /> : null}
      <Text variant="bodySmall" style={{ color: textColor }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
