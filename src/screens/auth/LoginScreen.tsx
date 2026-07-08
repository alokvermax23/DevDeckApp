import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../../components/AppText';
import TerminalBlock from '../../components/TerminalBlock';
import AuthButton from '../../components/AuthButton';

import AtmosphericBackground from '../../components/AtmosphericBackground';
import { colors } from '../../theme/colors';

export default function LoginScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();


  const handleLogin = async (provider: string) => {
    console.log(`Login with ${provider}`);
    const backendUrl = 'https://2fbi059n43.execute-api.ap-south-1.amazonaws.com';
    const authUrl = `${backendUrl}/api/auth/${provider}`;
    try {
      await Linking.openURL(authUrl);
    } catch (error) {
      console.error(`Failed to open URL for ${provider}:`, error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGrid} />
      <AtmosphericBackground />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.topSection}>
          <TerminalBlock />
          <AppText style={styles.headline}>
            TRACK YOUR DEV JOURNEY <AppText style={{ color: colors.devdeckIndigo }}>ACROSS EVERY PLATFORM</AppText>
          </AppText>
        </View>

        <View style={styles.bottomSection}>
          <AuthButton provider="github" onPress={() => handleLogin('github')} />
          <AuthButton provider="google" onPress={() => handleLogin('google')} />
          
          <View style={styles.footer}>
            <AppText style={styles.footerText}>AUTHORIZATION REQUIRED</AppText>
            <View style={styles.footerLinks}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Terms of Service clicked')}>
                <AppText style={[styles.footerText, styles.link]}>TERMS_OF_SERVICE</AppText>
              </TouchableOpacity>
              <AppText style={styles.footerText}> {'//'} </AppText>
              <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Privacy Policy clicked')}>
                <AppText style={[styles.footerText, styles.link]}>PRIVACY_POLICY</AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.versionBadge}>
              <AppText style={styles.versionText}>STABLE_REL :: V2.4.0</AppText>
            </View>
          </View>
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background, 
    opacity: 0.9,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 48,
  },
  headline: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 20,
    color: colors.onSurface,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 28,
  },
  bottomSection: {
    width: '100%',
    maxWidth: 384, // Equivalent to max-w-sm
    alignItems: 'center',
    marginTop: 48,
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 10,
    color: colors.outline,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: 'rgba(199, 196, 215, 0.7)',
  },
  versionBadge: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(70, 69, 84, 0.2)',
    borderRadius: 4,
    backgroundColor: 'rgba(14, 14, 14, 0.5)',
  },
  versionText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 9,
    color: colors.outline,
    opacity: 0.5,
    letterSpacing: -0.5,
  },
});
