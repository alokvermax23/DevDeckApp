import React from 'react';
import { ScrollView, StyleSheet, StatusBar, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/home/Header';
import StreakCard from '../../components/home/StreakCard';
import HeatmapCard from '../../components/home/HeatmapCard';
import StatsGrid from '../../components/home/StatsGrid';
import { colors } from '../../theme/colors';
import { useGetDashboardQuery } from '../../store/api/baseApi';

export default function HomeScreen() {
  const { data: dashboardResp, isLoading, isError } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError || !dashboardResp?.data) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
        <Text style={{ color: 'white' }}>Failed to load dashboard data</Text>
      </SafeAreaView>
    );
  }

  const dashboard = dashboardResp.data;
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <StreakCard streak={dashboard.currentStreak} />
        <HeatmapCard heatmapData={dashboard.heatmap} totalContributions={dashboard.totalProblemsSolved} />
        <StatsGrid 
          problemsSolved={dashboard.totalProblemsSolved} 
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
