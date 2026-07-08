import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import AppText from './AppText';
import PlatformLogo from './PlatformLogo';
import { colors } from '../theme/colors';

export type PlatformStatus = 'connected' | 'unconnected' | 'connecting';

type Props = {
  name: string;
  description: string;
  brandColor: string;
  iconPath: string;
  status?: PlatformStatus;
  onConnect?: () => void;
};

export default function PlatformCard({
  name,
  description,
  brandColor,
  iconPath,
  status = 'unconnected',
  onConnect,
}: Props) {

  const renderAction = () => {
    switch (status) {
      case 'connected':
        return (
          <View style={styles.connectedBadge}>
            <AppText style={styles.connectedText}>CONNECTED</AppText>
            <Svg width="18" height="18" viewBox="0 0 24 24">
              <Path fill="#4ade80" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </Svg>
          </View>
        );

      case 'connecting':
        return (
          <View style={[styles.connectButton, { opacity: 0.5 }]}>
            <AppText style={styles.connectButtonText}>WAITING...</AppText>
          </View>
        );

      case 'unconnected':
      default:
        return (
          <TouchableOpacity 
            style={styles.connectButton} 
            activeOpacity={0.7}
            onPress={onConnect}
          >
            <AppText style={styles.connectButtonText}>CONNECT</AppText>
          </TouchableOpacity>
        );
    }
  };

  return (
    <View style={[
      styles.card,
      status === 'connected' && styles.cardDisabled
    ]}>
      <View style={styles.leftSection}>
        <PlatformLogo name={name} size={28} />
        <View style={{ flex: 1 }}>
          <AppText style={styles.name}>{name}</AppText>
          <AppText style={styles.description}>{description}</AppText>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        {renderAction()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#262626',
    marginBottom: 12,
  },
  cardDisabled: {
    opacity: 0.6,
    backgroundColor: 'rgba(28, 27, 27, 0.5)', 
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },

  name: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: colors.onSurface,
  },
  description: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectedText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 1,
  },
  connectButton: {
    borderWidth: 1,
    borderColor: 'rgba(192, 193, 255, 0.4)', // primary with opacity
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  connectButtonText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 1,
  },
});
