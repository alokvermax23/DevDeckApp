import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StreakIcon from './StreakIcon';
import { colors } from '../../theme/colors';

export default function StreakCard({ streak = 0 }: { streak?: number }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <StreakIcon size={64} color={colors.primary} />
      </View>
      <Text style={styles.streakNumber}>{streak}</Text>
      <Text style={styles.streakLabel}>Day Streak</Text>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={[styles.dot, styles.dotInactive]} />
        <View style={[styles.dot, styles.dotInactive]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#262626',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 7, // Pull number closer to logo
  },
  streakNumber: {
    fontSize: 48,
    fontFamily: 'JetBrainsMono-Bold',
    color: colors.primary,
    includeFontPadding: false,
    marginBottom: -4, // Pull text tighter
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.primary,
    includeFontPadding: false,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: 'rgba(192, 193, 255, 0.2)',
  },
});
