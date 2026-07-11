import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { useAppSelector } from '../store/hooks';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, username } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !username ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
