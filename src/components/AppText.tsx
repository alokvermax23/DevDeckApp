import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

export interface AppTextProps extends RNTextProps {}

export default function AppText({ style, ...rest }: AppTextProps) {
  return <RNText style={[styles.defaultText, style]} {...rest} />;
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'JetBrainsMono-Regular',
  },
});
