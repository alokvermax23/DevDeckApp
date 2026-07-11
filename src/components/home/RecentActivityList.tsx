import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Code, GitCommitVertical, Award, RotateCcw } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const ActivityItem = ({
  icon: Icon,
  title,
  highlight,
  highlightColor,
  subtitle,
  timeAgo,
  iconBgColor,
}: {
  icon: any;
  title: string;
  highlight: string;
  highlightColor: string;
  subtitle: string;
  timeAgo: string;
  iconBgColor: string;
}) => (
  <View style={styles.activityItem}>
    <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
      <Icon size={20} color={highlightColor} />
    </View>
    <View style={styles.contentWrapper}>
      <Text style={styles.title}>
        {title} <Text style={[styles.highlight, { color: highlightColor }]}>{highlight}</Text>
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.timeAgo}>{timeAgo}</Text>
  </View>
);

export default function RecentActivityList() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Activity</Text>
        <RotateCcw size={20} color={colors.onSurfaceVariant} />
      </View>
      <View style={styles.list}>
        <ActivityItem
          icon={Code}
          title="Solved"
          highlight={'"Two Sum"'}
          highlightColor={colors.primary}
          subtitle="Difficulty: Easy • 98.4% faster"
          timeAgo="2h ago"
          iconBgColor="rgba(192, 193, 255, 0.1)"
        />
        <ActivityItem
          icon={GitCommitVertical}
          title="5 commits to"
          highlight={'"devdeck-core"'}
          highlightColor="#bcc7de" // secondary
          subtitle="Refactored API shell and added unit tests"
          timeAgo="5h ago"
          iconBgColor="rgba(188, 199, 222, 0.2)"
        />
        <ActivityItem
          icon={Award}
          title="Earned"
          highlight={'"Weekly Warrior"'}
          highlightColor={colors.tertiary}
          subtitle="Completed 7 problems in 7 days"
          timeAgo="1d ago"
          iconBgColor="rgba(255, 183, 131, 0.2)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#262626',
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Medium',
    color: colors.onSurface,
  },
  list: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurface,
  },
  highlight: {
    fontFamily: 'JetBrainsMono-Medium',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  timeAgo: {
    fontSize: 10,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
});
