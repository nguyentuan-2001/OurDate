import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Alert, FlatList, Image, Pressable, Share, View } from 'react-native';

import { Button, Card, EmptyState, Screen, Text } from '@/components/ui';
import { CoupleIllustration } from '@/components/illustrations/CoupleIllustration';
import { MOCK_DATA_LABEL, mockPlaces, mockUpcomingItinerary } from '@/constants/mock-data';
import { useCouple } from '@/features/couple/CoupleProvider';
import { useTheme } from '@/hooks/use-theme';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return 'Chào buổi sáng,';
  if (hour < 18) return 'Chào buổi chiều,';
  return 'Chào buổi tối,';
}

export default function HomeScreen() {
  const { colors, spacing, radius } = useTheme();
  const { couple, createInvite } = useCouple();
  const isWaitingForPartner = !!couple && couple.memberCount < 2;

  async function handleShareInvite() {
    const result = await createInvite();
    if (result.error || !result.token) {
      Alert.alert('Lỗi', result.error ?? 'Không thể tạo mã mời, vui lòng thử lại.');
      return;
    }
    await Share.share({
      message: `Tham gia không gian của chúng mình trên Our Date nhé! Mã mời: ${result.token}`,
    });
  }

  return (
    <Screen scroll>
      <View style={{ gap: spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={() => router.push('/settings')} hitSlop={8} style={{ width: 28 }}>
            <Ionicons name="settings-outline" size={20} color={colors.textPrimary} />
          </Pressable>
          <Text variant="title">Our Date ♡</Text>
          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Chưa có thông báo mới.')}
            hitSlop={8}
            style={{ width: 28, alignItems: 'flex-end' }}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Text variant="bodySmall" color="textSecondary">
              {getGreeting()}
            </Text>
            <Text variant="display">Anh iu ♡</Text>
          </View>
          <CoupleIllustration />
        </View>

        {isWaitingForPartner ? (
          <Card style={{ gap: spacing.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Ionicons name="hourglass-outline" size={22} color={colors.primary} />
              <Text variant="bodyMedium">Đang chờ người ấy tham gia</Text>
            </View>
            <Text variant="bodySmall" color="textSecondary">
              Gửi mã mời để người ấy cùng tham gia không gian này với bạn.
            </Text>
            <Button label="Chia sẻ mã mời" onPress={handleShareInvite} />
          </Card>
        ) : null}

        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="heart" size={22} color={colors.onPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="caption" color="textSecondary">
              Đã bên nhau · {MOCK_DATA_LABEL}
            </Text>
            <Text variant="bodyMedium">1 năm 3 tháng 12 ngày ♡</Text>
          </View>
        </Card>

        <Card style={{ flexDirection: 'row', gap: spacing.md }}>
          <Ionicons name="sunny" size={32} color={colors.warning} />
          <View>
            <Text variant="caption" color="textSecondary">
              Hôm nay · {MOCK_DATA_LABEL}
            </Text>
            <Text variant="title">28°C</Text>
            <Text variant="bodySmall" color="textSecondary">
              Có nắng, rất hợp để hẹn hò!
            </Text>
          </View>
        </Card>

        <View style={{ gap: spacing.sm }}>
          <Text variant="subtitle">Kế hoạch sắp tới</Text>
          {mockUpcomingItinerary ? (
            <Link href="/dates" asChild>
              <Pressable>
                <Card style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View
                    style={{
                      width: 48,
                      height: 56,
                      borderRadius: radius.md,
                      backgroundColor: colors.primarySoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text variant="caption" color="primary">
                      T7
                    </Text>
                    <Text variant="title" color="primary">
                      08
                    </Text>
                    <Text variant="caption" color="textSecondary">
                      Th11
                    </Text>
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text variant="bodyMedium">{mockUpcomingItinerary.title} ♡</Text>
                    <Text variant="bodySmall" color="textSecondary">
                      14:00 - 20:00
                    </Text>
                    <Text variant="caption" color="textSecondary">
                      {mockUpcomingItinerary.stopCount} địa điểm · ~500.000đ · {MOCK_DATA_LABEL}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.primary} />
                </Card>
              </Pressable>
            </Link>
          ) : (
            <EmptyState
              icon="calendar-clear-outline"
              title="Chưa có lịch hẹn nào"
              description="Tạo lịch trình đầu tiên của hai bạn ở tab AI Date."
            />
          )}
        </View>

        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="subtitle">Gợi ý cho hôm nay</Text>
            <Text variant="caption" color="textSecondary">
              {MOCK_DATA_LABEL}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockPlaces}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: spacing.sm }}
            renderItem={({ item }) => (
              <View style={{ width: 150 }}>
                <Image
                  source={{ uri: item.photoUrl }}
                  style={{
                    width: 150,
                    height: 96,
                    borderRadius: radius.lg,
                    backgroundColor: colors.surfaceSecondary,
                  }}
                />
                <Text variant="bodySmall" numberOfLines={1} style={{ marginTop: spacing.xs }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>

        <View style={{ height: 84 }} />
      </View>

      <View
        style={{
          position: 'absolute',
          left: spacing.lg,
          right: spacing.lg,
          bottom: spacing.xl,
        }}
      >
        <Link href="/planner" asChild>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.primaryPressed : colors.primary,
                borderRadius: radius.full,
                paddingVertical: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.35,
                shadowRadius: 16,
                elevation: 4,
              },
            ]}
          >
            <Text variant="button" style={{ color: colors.onPrimary }}>
              Lên kế hoạch hẹn hò
            </Text>
            <Text style={{ color: colors.onPrimary }}>✨</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
