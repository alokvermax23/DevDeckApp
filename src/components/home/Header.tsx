import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useGetDashboardQuery } from '../../store/api/baseApi';
import { useRefreshAllMutation } from '../../store/api/platformApi';

export default function Header() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  const { data: dashboardResp } = useGetDashboardQuery();
  const avatarUrl = dashboardResp?.data?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERUHQJr_ZFwfLo08EWPq2vdp1uW6NqG5nzgITGYf0V0cIpnr6FKOhWO0meYcJ36EjrvUvnuNICpyy-dQPs7HmYaf83GPxymKrvLtX0bNo3YuoKOSlDumrTcYwTrS-h4PjeYeItwkC7KXeTLnn2IVt8t7PRplp5AoQd-VLs1xGcLknQ0LplTwbVXiFHytqEWrOzeq1dgBtyRg6jwMxEfnHrm9cSoejb7oZ5oRb3wKKW6AohHqtEe-sfcn-WAPnOzqt2Nmpj2EHL_E';

  const [refreshAll, { isLoading: isRefreshing }] = useRefreshAllMutation();

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
        style={[styles.shareButton, { opacity: isRefreshing ? 0.5 : 1 }]}
        onPress={() => !isRefreshing && refreshAll()}
        disabled={isRefreshing}
      >
        <RefreshCw size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    fontSize: 20,
    fontFamily: 'Geist-Medium',
    color: colors.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  dateTextSecondary: {
    fontSize: 20,
    fontFamily: 'Geist-Medium',
    color: colors.onSurfaceVariant,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
