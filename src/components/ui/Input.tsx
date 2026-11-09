import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Text } from './Text';

export type InputProps = TextInputProps & {
  label?: string;
  errorText?: string;
  helperText?: string;
};

export function Input({ label, errorText, helperText, style, onFocus, onBlur, ...rest }: InputProps) {
  const { colors, spacing, radius } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = errorText ? colors.danger : focused ? colors.primary : colors.border;

  return (
    <View style={{ gap: spacing.xs }}>
      {label ? (
        <Text variant="bodySmall" color="textSecondary">
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.textSecondary}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          styles.base,
          {
            borderColor,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            color: colors.textPrimary,
            backgroundColor: colors.surface,
          },
          style,
        ]}
        {...rest}
      />
      {errorText ? (
        <Text variant="caption" color="danger">
          {errorText}
        </Text>
      ) : helperText ? (
        <Text variant="caption" color="textSecondary">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48,
  },
});
