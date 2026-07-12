import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useGetDashboardQuery } from '../../store/api/dashboardApi';
import { useRefreshAllMutation } from '../../store/api/platformApi';
import Toast from 'react-native-toast-message';

export default function Header() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  const { data: dashboardResp } = useGetDashboardQuery();
  const avatarUrl = dashboardResp?.data?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERUHQJr_ZFwfLo08EWPq2vdp1uW6NqG5nzgITGYf0V0cIpnr6FKOhWO0meYcJ36EjrvUvnuNICpyy-dQPs7HmYaf83GPxymKrvLtX0bNo3YuoKOSlDumrTcYwTrS-h4PjeYeItwkC7KXeTLnn2IVt8t7PRplp5AoQd-VLs1xGcLknQ0LplTwbVXiFHytqEWrOzeq1dgBtyRg6jwMxEfnHrm9cSoejb7oZ5oRb3wKKW6AohHqtEe-sfcn-WAPnOzqt2Nmpj2EHL_E';

  const [refreshAll, { isLoading: isRefreshing }] = useRefreshAllMutation();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;
    if (isRefreshing) {
      spinValue.setValue(0);
      animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      spinValue.stopAnimation();
      spinValue.setValue(0);
    }
    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isRefreshing, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handleRefresh = async () => {
    if (isRefreshing) return;
    try {
      await refreshAll().unwrap();
      Toast.show({
        type: 'success',
        text1: 'Refreshed',
        text2: 'Your latest stats have been synced.',
        position: 'top',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Refresh Failed',
        text2: 'Could not sync stats. Please try again.',
        position: 'top',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.dateString}>
            <Text style={styles.dateTextPrimary}>Today, </Text>
            <Text style={styles.dateTextSecondary}>{day} {month}</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.shareButton, { opacity: isRefreshing ? 0.7 : 1 }]}
        onPress={handleRefresh}
        disabled={isRefreshing}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <RefreshCw size={20} color={colors.primary} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateString: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dateTextPrimary: {
    fontSize: 16,
    fontFamily: 'Geist-Medium',
    color: colors.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  dateTextSecondary: {
    fontSize: 16,
    fontFamily: 'Geist-Medium',
    color: colors.onSurfaceVariant,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
