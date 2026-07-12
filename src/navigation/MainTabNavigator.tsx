import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutDashboard, Trophy, Settings } from 'lucide-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { colors } from '../theme/colors';
import { useAppDispatch } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';

import SettingsScreen from '../screens/main/SettingsScreen';

const Tab = createBottomTabNavigator();

function LeaderboardScreen() {
  const isFocused = useIsFocused();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Video 
        source={require('../../assets/surprise.mp4')} 
        style={StyleSheet.absoluteFill} 
        resizeMode="cover"
        repeat={true}
        volume={1.0}
        muted={!isFocused}
        paused={!isFocused}
      />
    </View>
  );
}

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 12; // Fallback for 3-button nav devices

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerHighest,
          borderTopColor: colors.outlineVariant,
          height: 56 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'JetBrainsMono-Medium',
          marginTop: 2,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <LayoutDashboard size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Trophy size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Settings size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
