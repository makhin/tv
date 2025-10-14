// src/components/FocusableButton.tsx
import React, { useState, useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  Animated,
} from 'react-native';

interface FocusableButtonProps {
  title: string;
  onPress: () => void;
  hasTVPreferredFocus?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const FocusableButton: React.FC<FocusableButtonProps> = ({
  title,
  onPress,
  hasTVPreferredFocus = false,
  style,
  textStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[
          styles.button,
          isFocused && styles.buttonFocused,
          style,
        ]}
        onPress={onPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        hasTVPreferredFocus={hasTVPreferredFocus}
      >
        <Text
          style={[
            styles.text,
            isFocused && styles.textFocused,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: Platform.isTV ? 16 : 12,
    paddingHorizontal: Platform.isTV ? 32 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Platform.isTV ? 200 : 120,
  },
  buttonFocused: {
    backgroundColor: '#2563eb',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: Platform.isTV ? 24 : 16,
    fontWeight: '600',
  },
  textFocused: {
    color: '#ffffff',
    fontWeight: '700',
  },
});