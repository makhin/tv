// src/components/EpisodeListItem.tsx
import React, { useState } from 'react';
import { Pressable, Text, Image, StyleSheet, View, Platform } from 'react-native';

interface EpisodeListItemProps {
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  onPress: () => void;
  onFocus?: () => void;
  hasTVPreferredFocus?: boolean;
}

export const EpisodeListItem: React.FC<EpisodeListItemProps> = ({
  title,
  subtitle,
  thumbnailUrl,
  onPress,
  onFocus,
  hasTVPreferredFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Pressable
      style={[styles.container, isFocused && styles.containerFocused]}
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      hasTVPreferredFocus={hasTVPreferredFocus}
    >
      {/* Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {thumbnailUrl ? (
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} resizeMode="cover" />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, isFocused && styles.titleFocused]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, isFocused && styles.subtitleFocused]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: Platform.isTV ? 12 : 8,
    marginBottom: Platform.isTV ? 12 : 8,
    minHeight: Platform.isTV ? 74 : 66,
  },
  containerFocused: {
    backgroundColor: '#4b5563',
    borderWidth: 3,
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    transform: [{ scale: 1.02 }],
  },
  thumbnailContainer: {
    marginRight: Platform.isTV ? 16 : 12,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#1f2937',
  },
  thumbnailPlaceholder: {
    backgroundColor: '#1f2937',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: Platform.isTV ? 20 : 16,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 4,
  },
  titleFocused: {
    color: '#ffffff',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: Platform.isTV ? 16 : 12,
    color: '#9ca3af',
  },
  subtitleFocused: {
    color: '#d1d5db',
  },
});
