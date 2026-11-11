import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color as string} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'AI Date',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" color={color as string} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" color={color as string} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dates"
        options={{
          title: 'Lịch hẹn',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color as string} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: 'Kỷ niệm',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images-outline" color={color as string} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
