import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import AppText from './AppText';
import { colors } from '../theme/colors';

type Props = {
  progress: number; // 0 to 1
};

const { width } = Dimensions.get('window');

export default function OnboardingHeader({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path fill={colors.primary} d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 12l-2.58-3.59L7.5 7l4 5-4 5z"/>
          </Svg>
          <AppText style={styles.title}>DEV_DECK_INIT</AppText>
        </View>
        
        <View style={styles.navLinks}>
          <AppText style={styles.activeLink}>ONBOARDING</AppText>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: width * progress }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.surface,
    zIndex: 50,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: 'Geist-Bold',
    fontSize: 20,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  navLinks: {
    flexDirection: 'row',
  },
  activeLink: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 1,
  },
  progressContainer: {
    width: '100%',
    height: 2,
    backgroundColor: colors.surfaceContainerHighest,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
  },
});
