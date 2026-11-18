import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { Button, Card, EmptyState, Input, Screen, Text } from '@/components/ui';
import { usePreferences } from '@/features/preferences/PreferencesProvider';
import { useTheme } from '@/hooks/use-theme';

export default function PrivatePlacesScreen() {
  const { colors, spacing } = useTheme();
  const { privatePlaces, isLoading, savePrivatePlace, deletePrivatePlace } = usePreferences();

  const [editingId, setEditingId] = useState<string | undefined>();
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  function startAdd() {
    setEditingId(undefined);
    setLabel('');
    setAddress('');
    setError(undefined);
  }

  function startEdit(id: string, currentLabel: string, currentAddress: string) {
    setEditingId(id);
    setLabel(currentLabel);
    setAddress(currentAddress);
    setError(undefined);
  }

  async function handleSave() {
    if (!label.trim() || !address.trim()) {
      setError('Vui lòng nhập tên gọi và địa chỉ.');
      return;
    }
    setError(undefined);
    setIsSaving(true);
    const result = await savePrivatePlace({ id: editingId, label: label.trim(), address: address.trim() });
    setIsSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    startAdd();
  }

  function handleDelete(id: string) {
    Alert.alert('Xoá địa chỉ', 'Bạn có chắc muốn xoá địa chỉ này?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          const result = await deletePrivatePlace(id);
          if (result.error) Alert.alert('Lỗi', result.error);
        },
      },
    ]);
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.lg, paddingTop: spacing.xxl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text variant="title">Địa chỉ riêng tư</Text>
        </View>

        <Text variant="bodySmall" color="textSecondary">
          Chỉ bạn thấy được các địa chỉ này — người ấy sẽ không nhìn thấy, kể cả khi đã ở cùng không gian với
          bạn. Dùng để chọn điểm bắt đầu khi lên kế hoạch hẹn hò.
        </Text>

        {isLoading ? null : privatePlaces.length === 0 ? (
          <EmptyState
            icon="home-outline"
            title="Chưa có địa chỉ nào"
            description="Thêm địa chỉ nhà hoặc điểm đón để dùng làm điểm bắt đầu."
          />
        ) : (
          <View style={{ gap: spacing.sm }}>
            {privatePlaces.map((place) => (
              <Card key={place.id} style={{ gap: spacing.xs }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyMedium">{place.label}</Text>
                    <Text variant="bodySmall" color="textSecondary">
                      {place.address}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                    <Pressable onPress={() => startEdit(place.id, place.label, place.address)} hitSlop={8}>
                      <Ionicons name="pencil-outline" size={20} color={colors.textSecondary} />
                    </Pressable>
                    <Pressable onPress={() => handleDelete(place.id)} hitSlop={8}>
                      <Ionicons name="trash-outline" size={20} color={colors.danger} />
                    </Pressable>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        <Card style={{ gap: spacing.md }}>
          <Text variant="bodyMedium">{editingId ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}</Text>
          <Input
            label="Tên gọi"
            placeholder="Ví dụ: Nhà tôi, Điểm đón"
            value={label}
            onChangeText={setLabel}
          />
          <Input
            label="Địa chỉ"
            placeholder="Số nhà, đường, phường/xã, quận/huyện..."
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={2}
            errorText={error}
          />
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {editingId ? <Button label="Huỷ" variant="ghost" onPress={startAdd} /> : null}
            <View style={{ flex: 1 }}>
              <Button
                label={editingId ? 'Lưu thay đổi' : 'Thêm địa chỉ'}
                onPress={handleSave}
                loading={isSaving}
              />
            </View>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
