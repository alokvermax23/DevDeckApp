/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, Linking, View, ActivityIndicator } from 'react-native';
import { colors } from './src/theme/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { setCredentials } from './src/store/slices/authSlice';
import { storage } from './src/store/storage';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {

    const handleDeepLink = async (event: { url: string }) => {
      const { url } = event;
      if (url && url.includes('token=')) {
        const tokenMatch = url.match(/token=([^&]+)/);
        const usernameMatch = url.match(/username=([^&]+)/);
        const isNewUserMatch = url.match(/isNewUser=([^&]+)/);
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1];
          let username = usernameMatch ? usernameMatch[1] : undefined;
          let isNewUser = isNewUserMatch ? isNewUserMatch[1] === 'true' : false;
          
          if (username === 'null' || username === 'undefined') {
            username = undefined;
          }

          try {
            storage.set('jwt_token', token);
            if (username) storage.set('username', username);
            storage.set('isNewUser', isNewUser);
          } catch (e) {
            console.error('Failed to save token', e);
          }
          store.dispatch(setCredentials({ token, username, isNewUser }));
        }
      }
    };

    // Handle deep links when app is already open
    const subscription = Linking.addEventListener('url', handleDeepLink);
    
    // Handle deep link when app is opened from closed state
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
