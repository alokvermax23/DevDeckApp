import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { colors } from '../theme/colors';

type ToastProps = {
  text1?: string;
  text2?: string;
};

function SuccessToast({ text1, text2 }: ToastProps) {
  return (
    <View style={[styles.container, styles.successContainer]}>
      <View style={[styles.accentBar, { backgroundColor: '#4ade80' }]} />
      <View style={styles.textContainer}>
        {text1 ? <AppText style={styles.title}>{text1}</AppText> : null}
        {text2 ? <AppText style={styles.message}>{text2}</AppText> : null}
      </View>
    </View>
  );
}

function ErrorToast({ text1, text2 }: ToastProps) {
  return (
    <View style={[styles.container, styles.errorContainer]}>
      <View style={[styles.accentBar, { backgroundColor: colors.error }]} />
      <View style={styles.textContainer}>
        {text1 ? <AppText style={styles.title}>{text1}</AppText> : null}
        {text2 ? <AppText style={styles.message}>{text2}</AppText> : null}
      </View>
    </View>
  );
}

function InfoToast({ text1, text2 }: ToastProps) {
  return (
    <View style={[styles.container, styles.infoContainer]}>
      <View style={[styles.accentBar, { backgroundColor: colors.primary }]} />
      <View style={styles.textContainer}>
        {text1 ? <AppText style={styles.title}>{text1}</AppText> : null}
        {text2 ? <AppText style={styles.message}>{text2}</AppText> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 56,
  },
  successContainer: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: 'rgba(74, 222, 128, 0.25)',
  },
  errorContainer: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: 'rgba(255, 180, 171, 0.25)',
  },
  infoContainer: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: 'rgba(192, 193, 255, 0.25)',
  },
  accentBar: {
    width: 3,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 13,
    color: colors.onSurface,
    letterSpacing: 0.3,
  },
  message: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});

export const toastConfig = {
  success: (props: any) => <SuccessToast {...props} />,
  error: (props: any) => <ErrorToast {...props} />,
  info: (props: any) => <InfoToast {...props} />,
};
