import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProblemsSolvedIcon, PlatformIcon, MaxStreakIcon, GitCommitIcon } from './StatIcons';
import { colors } from '../../theme/colors';

const StatCard = ({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) => (
  <View style={styles.card}>
    <Icon size={20} color={colors.primary} style={styles.icon} />
    <View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  </View>
);

export default function StatsGrid({ 
  problemsSolved = 0,
  githubCommits = 0,
  platforms = 0, 
  maxStreak = 0 
}: { 
  problemsSolved?: number,
  githubCommits?: number,
  platforms?: number, 
  maxStreak?: number 
}) {
  return (
    <View style={styles.container}>
      <StatCard icon={ProblemsSolvedIcon} value={problemsSolved} label="PROBLEMS SOLVED" />
      <StatCard icon={GitCommitIcon} value={githubCommits} label="GH COMMITS" />
      <StatCard icon={PlatformIcon} value={platforms} label="PLATFORMS" />
      <StatCard icon={MaxStreakIcon} value={maxStreak} label="MAX STREAK" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'space-between',
    minHeight: 110, // Ensures there's plenty of space inside
  },
  icon: {
    marginBottom: 16,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: colors.onSurface,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
});
