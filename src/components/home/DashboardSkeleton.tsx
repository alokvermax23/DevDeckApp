import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';
import Header from './Header';

const SkeletonBlock = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return <Animated.View style={[styles.skeletonBlock, style, { opacity }]} />;
};

export default function DashboardSkeleton() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.scrollContainer}>
        {/* StreakCard Skeleton */}
        <SkeletonBlock style={styles.streakCard} />
        
        {/* HeatmapCard Skeleton */}
        <SkeletonBlock style={styles.heatmapCard} />
        
        {/* StatsGrid Skeleton (2x2 grid) */}
        <View style={styles.statsGrid}>
          <SkeletonBlock style={styles.statBox} />
          <SkeletonBlock style={styles.statBox} />
          <SkeletonBlock style={styles.statBox} />
          <SkeletonBlock style={styles.statBox} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skeletonBlock: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  streakCard: {
    height: 100,
    width: '100%',
    marginBottom: 16,
  },
  heatmapCard: {
    height: 220,
    width: '100%',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    height: 100,
    marginBottom: 16,
  },
});
