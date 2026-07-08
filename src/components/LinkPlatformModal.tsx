import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AppText from './AppText';
import PlatformLogo from './PlatformLogo';
import AtmosphericBackground from './AtmosphericBackground';
import { colors } from '../theme/colors';

type LinkPlatformModalProps = {
  visible: boolean;
  platformName: string;
  brandColor: string;
  placeholder: string;
  onClose: () => void;
  onConnect: (url: string) => void;
};

export default function LinkPlatformModal({ 
  visible, 
  platformName, 
  brandColor, 
  placeholder,
  onClose, 
  onConnect 
}: LinkPlatformModalProps) {
  const [inputValue, setInputValue] = useState('');

  const handleConnect = () => {
    if (inputValue.trim()) {
      onConnect(inputValue);
      setInputValue('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); onClose(); }}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              <View style={styles.sheetContainer}>
                <AtmosphericBackground />
                {/* Header with Logo */}
                <View style={styles.header}>
                  <View style={{ marginBottom: 16 }}>
                    <PlatformLogo name={platformName} size={48} />
                  </View>
                  <AppText style={styles.title}>Connect {platformName}</AppText>
                  <AppText style={styles.subtitle}>Enter your profile URL or username below.</AppText>
                </View>

                {/* Input Area */}
                <View style={styles.inputSection}>
                  <TextInput
                    style={[styles.input, { borderColor: brandColor + '80' }]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.outline}
                    value={inputValue}
                    onChangeText={setInputValue}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    selectionColor={brandColor}
                  />
                  
                  <TouchableOpacity 
                    style={[styles.connectButton, { backgroundColor: brandColor }]}
                    activeOpacity={0.8}
                    onPress={handleConnect}
                  >
                    <AppText style={styles.connectButtonText}>Verify & Connect</AppText>
                  </TouchableOpacity>
                </View>
                
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  keyboardView: {
    width: '100%',
    maxWidth: 560,
  },
  sheetContainer: {
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderTopWidth: 1,
    borderColor: '#262626',
    alignItems: 'center',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 20,
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  inputSection: {
    width: '100%',
  },
  input: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  connectButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#000000',
    letterSpacing: 1,
  },
});
