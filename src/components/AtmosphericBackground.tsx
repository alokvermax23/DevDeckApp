import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient, LinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function AtmosphericBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg height="100%" width="100%">
        <Defs>
          {/* Bottom to Top Linear Gradient */}
          <LinearGradient id="bottomFade" x1="0" y1="1" x2="0" y2="0.3">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.08" />
            <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
          </LinearGradient>

          {/* Top Right Orb */}
          <RadialGradient id="topOrb" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.12" />
            <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
          </RadialGradient>

          {/* Bottom Left Orb */}
          <RadialGradient id="bottomOrb" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.devdeckIndigo} stopOpacity="0.15" />
            <Stop offset="1" stopColor={colors.devdeckIndigo} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Ambient Bottom Fade */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomFade)" />

        {/* Glowing Orbs */}
        <Circle cx="100%" cy="20%" r="60%" fill="url(#topOrb)" />
        <Circle cx="0%" cy="80%" r="70%" fill="url(#bottomOrb)" />
      </Svg>
    </View>
  );
}
