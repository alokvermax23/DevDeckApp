import React from 'react';
import { ScrollView, StyleSheet, StatusBar, View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/home/Header';
import StreakCard from '../../components/home/StreakCard';
import HeatmapCard from '../../components/home/HeatmapCard';
import StatsGrid from '../../components/home/StatsGrid';
import DashboardSkeleton from '../../components/home/DashboardSkeleton';
import { colors } from '../../theme/colors';
import { useGetDashboardQuery } from '../../store/api/dashboardApi';
import { useRefreshAllMutation } from '../../store/api/platformApi';

const calculateLocalStreak = (heatmap: Record<string, number> | undefined) => {
  if (!heatmap) return 0;
  
  const today = new Date();
  
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  let streak = 0;
  let currentDate = new Date(today);
  
  // Check today
  let todayStr = formatDate(currentDate);
  if (heatmap[todayStr] && heatmap[todayStr] > 0) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  } else {
    // Check yesterday
    currentDate.setDate(currentDate.getDate() - 1);
    let yesterdayStr = formatDate(currentDate);
    if (!heatmap[yesterdayStr] || heatmap[yesterdayStr] === 0) {
      return 0;
    }
  }

  // Count backwards
  while (true) {
    let dateStr = formatDate(currentDate);
    if (heatmap[dateStr] && heatmap[dateStr] > 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export default function HomeScreen() {
  const { data: dashboardResp, isLoading, isError } = useGetDashboardQuery();
  const [refreshAll, { isLoading: isRefreshing }] = useRefreshAllMutation();
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
        <DashboardSkeleton />
      </SafeAreaView>
    );
  }
  if (isError || !dashboardResp?.data) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
        <Text style={{ color: 'white' }}>Failed to load dashboard data</Text>
      </SafeAreaView>
    );
  }

  const dashboard = dashboardResp.data;
  const localStreak = calculateLocalStreak(dashboard.heatmap);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
      <Header />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing} 
            onRefresh={() => refreshAll()} 
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <StreakCard streak={localStreak > dashboard.currentStreak ? localStreak : dashboard.currentStreak} />
        <HeatmapCard 
          heatmapData={dashboard.heatmap} 
          githubHeatmap={dashboard.githubHeatmap}
          problemsHeatmap={dashboard.problemsHeatmap}
          totalContributions={dashboard.totalProblemsSolved}
          githubCommits={dashboard.githubCommits}
        />
        <StatsGrid 
          problemsSolved={dashboard.totalProblemsSolved} 
          githubCommits={dashboard.githubCommits}
          platforms={dashboard.platformCount} 
          maxStreak={dashboard.maxStreak} 
        />
        {/* Added some bottom padding to avoid the bottom tab bar hiding content */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
});
