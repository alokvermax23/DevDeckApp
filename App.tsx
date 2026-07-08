/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { setCredentials } from './src/store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          store.dispatch(setCredentials({ token }));
        }
      } catch (e) {
        console.error('Failed to load token', e);
      }
    };
    loadToken();

    const handleDeepLink = async (event: { url: string }) => {
      const { url } = event;
      if (url && url.includes('token=')) {
        const tokenMatch = url.match(/token=([^&]+)/);
        const usernameMatch = url.match(/username=([^&]+)/);
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1];
          let username = usernameMatch ? usernameMatch[1] : undefined;
          
          if (username === 'null' || username === 'undefined') {
            username = undefined;
          }

          try {
            await AsyncStorage.setItem('jwt_token', token);
            if (username) await AsyncStorage.setItem('username', username);
          } catch (e) {
            console.error('Failed to save token', e);
          }
          store.dispatch(setCredentials({ token, username }));
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
