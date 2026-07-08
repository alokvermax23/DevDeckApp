import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from './AppText';
import { colors } from '../theme/colors';

type Props = {
  onSkip: () => void;
  onContinue: () => void;
};

export default function BottomNavBar({ onSkip, onContinue }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity 
        style={styles.skipButton} 
        activeOpacity={0.7} 
        onPress={onSkip}
      >
        <Svg width="16" height="16" viewBox="0 0 24 24">
          <Path fill={colors.onSurfaceVariant} d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </Svg>
        <AppText style={styles.skipText}>SKIP</AppText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.continueButton} 
        activeOpacity={0.8} 
        onPress={onContinue}
      >
        <AppText style={styles.continueText}>CONTINUE</AppText>
        <Svg width="16" height="16" viewBox="0 0 24 24">
          <Path fill={colors.onPrimaryContainer} d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </Svg>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 560,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: colors.surfaceContainer,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
  },
  skipText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 11,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  continueText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 11,
    color: colors.onPrimaryContainer,
    letterSpacing: 1,
  },
});
