import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import AppText from './AppText';
import AtmosphericBackground from './AtmosphericBackground';
import { colors } from '../theme/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinue: (username: string) => void;
};

export default function UsernameConfirmationSheet({ visible, onClose, onContinue }: Props) {
  const [username, setUsername] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setUsername('');
    }
  }, [visible]);

  const handleContinue = () => {
    onContinue(username);
  };

  const handleCopyLink = () => {
    const link = `devdeck.app/r/${username || 'octocat'}`;
    Clipboard.setString(link);
    
    setToastVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setToastVisible(false));
    }, 1500);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* Clickable Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
          {toastVisible && (
            <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
              <Svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                <Path fill="#4ade80" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </Svg>
              <AppText style={styles.toastText}>Copied to clipboard</AppText>
            </Animated.View>
          )}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.sheetContainer}
          >
            <View style={styles.sheet}>
              <AtmosphericBackground />
              
              {/* Header */}
              <View style={styles.header}>
                <AppText style={styles.title}>Your DevDeck username</AppText>
                <AppText style={styles.subtitle}>
                  Pick a unique identifier for your developer profile and collaborative workspaces.
                </AppText>
              </View>

              {/* Input Section */}
              <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputLabelContainer}>
                    <AppText style={styles.inputLabel}>USERNAME</AppText>
                  </View>
                  <AppText style={styles.atSymbol}>@</AppText>
                  <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="octocat"
                    placeholderTextColor="rgba(192, 193, 255, 0.3)"
                    onChangeText={(text) => setUsername(text.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    autoCapitalize="none"
                    autoCorrect={false}
                    selectionColor={colors.primary}
                  />
                </View>

                {/* Availability Indicator */}
                <View style={styles.availability}>
                  <Svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                    <Path fill="#4ade80" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </Svg>
                  <AppText style={styles.availabilityText}>Available</AppText>
                </View>
              </View>

              {/* Helper Block */}
              <TouchableOpacity activeOpacity={0.7} onPress={handleCopyLink} style={styles.helperBlock}>
                <View style={styles.linkIconWrapper}>
                  <Svg width="20" height="20" viewBox="0 0 24 24">
                    <Path fill={colors.outline} d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </Svg>
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={styles.helperText} numberOfLines={1} adjustsFontSizeToFit>This will be your public profile link:</AppText>
                  <AppText style={styles.previewUrl} numberOfLines={1}>devdeck.app/r/{username || 'octocat'}</AppText>
                </View>
              </TouchableOpacity>

              {/* Action Section */}
              <View style={styles.actionSection}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleContinue}>
                  <AppText style={styles.buttonText}>Continue</AppText>
                  <Svg width="20" height="20" viewBox="0 0 24 24">
                    <Path fill="#1000a9" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </Svg>
                </TouchableOpacity>
                <AppText style={styles.footerText}>STEP 2 OF 3: IDENTITY SETUP</AppText>
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  toast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
    zIndex: 100,
  },
  toastText: {
    color: colors.onSurface,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
  },
  sheetContainer: {
    width: '100%',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48, // Extra padding for bottom safe area
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.surfaceVariant,
    overflow: 'hidden',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  inputLabelContainer: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: colors.background,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  inputLabel: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: 'JetBrainsMono-Bold',
    letterSpacing: 1.5,
  },
  atSymbol: {
    color: colors.primary,
    opacity: 0.5,
    fontSize: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 18,
    color: colors.primary,
    height: '100%',
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 4,
  },
  checkIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4ade80',
    marginRight: 8,
  },
  availabilityText: {
    color: '#4ade80',
    fontSize: 14,
  },
  helperBlock: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  linkIconWrapper: {
    marginRight: 12,
    marginTop: 2,
  },
  linkIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  helperText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  previewUrl: {
    color: colors.primary,
    opacity: 0.8,
    fontSize: 13,
  },
  actionSection: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#1000a9', // on-primary
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    marginRight: 8,
  },
  arrowIcon: {
    color: '#1000a9',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
  },
  footerText: {
    fontSize: 11,
    color: colors.outline,
    letterSpacing: 1.5,
    fontFamily: 'JetBrainsMono-Bold',
  },
});
