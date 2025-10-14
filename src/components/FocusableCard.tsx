// src/components/FocusableCard.tsx
import React, { useState, useRef } from 'react';
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  Platform,
  Animated,
} from 'react-native';

interface FocusableCardProps {
  title: string;
  imageUrl?: string;
  onPress: () => void;
  onFocus?: () => void;
  hasTVPreferredFocus?: boolean;
  style?: ViewStyle;
}

export const FocusableCard: React.FC<FocusableCardProps> = ({
  title,
  imageUrl,
  onPress,
  onFocus,
  hasTVPreferredFocus = false,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
    Animated.spring(scaleAnim, {
      toValue: 1.1,
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
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        style={[styles.card, isFocused && styles.cardFocused]}
        onPress={onPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        hasTVPreferredFocus={hasTVPreferredFocus}
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text
          style={[styles.title, isFocused && styles.titleFocused]}
          numberOfLines={2}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  cardFocused: {
    borderWidth: 4,
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '70%',
    backgroundColor: '#374151',
  },
  title: {
    padding: 12,
    color: '#e5e7eb',
    fontSize: Platform.isTV ? 20 : 14,
    fontWeight: '600',
  },
  titleFocused: {
    color: '#ffffff',
    fontWeight: '700',
  },
});