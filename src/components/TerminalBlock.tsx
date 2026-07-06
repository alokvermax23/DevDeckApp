import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import AppText from './AppText';
import { colors } from '../theme/colors';

export default function TerminalBlock() {
  const blinkAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
          <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
        </View>
        <AppText style={styles.headerText}>bash — devdeck — 80x24</AppText>
        <View style={styles.spacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.line}>
          <AppText style={styles.lineNumber}>01</AppText>
          <AppText style={styles.codeText}>
            <AppText style={{ color: colors.devdeckIndigo }}>const</AppText>{' '}
            <AppText style={{ color: colors.tertiary }}>journey</AppText> = {'{'}
          </AppText>
        </View>

        <View style={styles.line}>
          <AppText style={styles.lineNumber}>02</AppText>
          <AppText style={[styles.codeText, { paddingLeft: 16 }]}>
            user: <AppText style={{ color: colors.primary }}>"developer"</AppText>,
          </AppText>
        </View>

        <View style={styles.line}>
          <AppText style={styles.lineNumber}>03</AppText>
          <AppText style={[styles.codeText, { paddingLeft: 16 }]}>
            status: <AppText style={{ color: colors.primary }}>"tracking"</AppText>,
          </AppText>
        </View>

        <View style={styles.line}>
          <AppText style={styles.lineNumber}>04</AppText>
          <AppText style={[styles.codeText, { paddingLeft: 16 }]}>
            platforms:{' '}
            <AppText style={{ color: colors.devdeckIndigo }}>[</AppText>
            <AppText style={{ color: colors.primary }}>'*'</AppText>
            <AppText style={{ color: colors.devdeckIndigo }}>]</AppText>
          </AppText>
        </View>

        <View style={styles.line}>
          <AppText style={styles.lineNumber}>05</AppText>
          <AppText style={styles.codeText}>{'};'}</AppText>
        </View>

        <View style={[styles.line, { marginTop: 8 }]}>
          <AppText style={styles.lineNumber}>06</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText style={[styles.codeText, { color: colors.devdeckIndigo }]}>
              devdeck login --start{' '}
            </AppText>
            <Animated.View style={[styles.cursor, { opacity: blinkAnim }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'rgba(28, 27, 27, 0.8)',
    borderRadius: 8,
    borderColor: 'rgba(70, 69, 84, 0.3)',
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: colors.devdeckIndigo,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(42, 42, 42, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(70, 69, 84, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  headerText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 10,
    color: colors.outline,
    opacity: 0.6,
    letterSpacing: 0.5,
  },
  spacer: {
    width: 40,
  },
  content: {
    padding: 24,
  },
  line: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  lineNumber: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    color: 'rgba(144, 143, 160, 0.4)',
    marginRight: 16,
    width: 20,
  },
  codeText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: colors.onSurface,
  },
  cursor: {
    width: 8,
    height: 18,
    backgroundColor: colors.devdeckIndigo,
    marginLeft: 4,
  },
});
