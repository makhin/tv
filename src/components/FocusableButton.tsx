// src/components/FocusableButton.tsx
import React, { useState, useRef } from 'react';
import { Pressable, Text, ViewStyle, TextStyle, Animated } from 'react-native';
import { styles } from './FocusableButton.styles';

interface FocusableButtonProps {
  title: string;
  onPress: () => void;
  hasTVPreferredFocus?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const FocusableButton: React.FC<FocusableButtonProps> = ({
  title,
  onPress,
  hasTVPreferredFocus = false,
  disabled = false,
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
          disabled && styles.buttonDisabled,
          style,
        ]}
        onPress={disabled ? undefined : onPress}
        onFocus={disabled ? undefined : handleFocus}
        onBlur={disabled ? undefined : handleBlur}
        hasTVPreferredFocus={hasTVPreferredFocus}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            isFocused && styles.textFocused,
            disabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
