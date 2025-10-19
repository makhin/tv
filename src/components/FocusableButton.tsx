// src/components/FocusableButton.tsx
import React, { useState, useRef } from 'react';
import { Pressable, Text, ViewStyle, TextStyle, Animated } from 'react-native';
import { appStyles } from '@/styles';

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
          appStyles.buttons.base,
          isFocused && appStyles.buttons.focused,
          disabled && appStyles.buttons.disabled,
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
            appStyles.buttons.text,
            isFocused && appStyles.buttons.textFocused,
            disabled && appStyles.buttons.textDisabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
