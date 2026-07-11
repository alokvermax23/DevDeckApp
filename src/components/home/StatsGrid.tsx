import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProblemsSolvedIcon, PlatformIcon, GlobalRankIcon, MaxStreakIcon } from './StatIcons';
import { colors } from '../../theme/colors';

const StatCard = ({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) => (
  <View style={styles.card}>
    <Icon size={24} color={colors.primary} style={styles.icon} />
    <View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  </View>
);

export default function StatsGrid({ 
  problemsSolved = 0, 
  platforms = 0, 
  maxStreak = 0 
}: { 
  problemsSolved?: number, 
  platforms?: number, 
  maxStreak?: number 
}) {
  return (
    <View style={styles.container}>
      <StatCard icon={ProblemsSolvedIcon} value={problemsSolved} label="PROBLEMS SOLVED" />
      <StatCard icon={PlatformIcon} value={platforms} label="PLATFORMS" />
      <StatCard icon={GlobalRankIcon} value="#1,240" label="GLOBAL RANK" />
      <StatCard icon={MaxStreakIcon} value={maxStreak} label="MAX STREAK" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 24,
    width: '47%',
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'space-between',
    minHeight: 140, // Ensures there's plenty of space inside
  },
  icon: {
    marginBottom: 24,
  },
  value: {
    fontSize: 32,
    fontFamily: 'Geist-Bold',
    color: colors.onSurface,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
});
