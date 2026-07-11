import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Trophy, Settings } from 'lucide-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useAppDispatch } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';

const Tab = createBottomTabNavigator();

// Mock screens for Leaderboard and Settings
function LeaderboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.onSurface }}>Leaderboard (Coming Soon)</Text>
    </View>
  );
}

function SettingsScreen() {
  const dispatch = useAppDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.onSurface, marginBottom: 20 }}>Settings (Coming Soon)</Text>
      <TouchableOpacity 
        onPress={() => dispatch(logoutUser())}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          backgroundColor: '#ff4444',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontFamily: 'Geist-Bold' }}>Temp Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerHighest,
          borderTopColor: colors.outlineVariant,
          height: 80,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'JetBrainsMono-Medium',
          marginTop: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
