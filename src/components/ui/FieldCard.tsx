import { Ionicons } from '@expo/vector-icons';
import { Pressable, TextInput, View, type KeyboardTypeOptions } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Card } from './Card';
import { Text } from './Text';

export type FieldCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  errorText?: string;
};

/** Thẻ nhập liệu dạng "icon badge + nhãn + giá trị", theo src/UI/AI.html.
 * Truyền `onChangeText` cho trường nhập tự do, hoặc `onPress` cho trường bấm để đổi (ví dụ chọn phương tiện). */
export function FieldCard({
  icon,
  label,
  value,
  onChangeText,
  onPress,
  placeholder,
  keyboardType,
  errorText,
}: FieldCardProps) {
  const { colors, spacing, radius } = useTheme();

  const content = (
    <Card
      style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: radius.sm,
          backgroundColor: colors.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="caption" color="textSecondary">
          {label}
        </Text>
        {onPress ? (
          <Text variant="bodyMedium">{value}</Text>
        ) : (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            keyboardType={keyboardType}
            style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary, padding: 0 }}
          />
        )}
        {errorText ? (
          <Text variant="caption" color="danger">
            {errorText}
          </Text>
        ) : null}
      </View>
      {onPress ? <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} /> : null}
    </Card>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }
  return content;
}
