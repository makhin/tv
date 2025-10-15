// src/components/PhotoListItem.tsx
import React, { useState } from 'react';
import { Pressable, Text, Image, StyleSheet, View, Platform } from 'react-native';
import { format, parseISO } from 'date-fns';

interface PhotoListItemProps {
  thumbnailUrl?: string | null;
  name: string;
  storageName: string;
  takenDate?: string | null;
  captions?: string[] | null;
  personNames?: string[]; // Преобразованные имена персон
  tagNames?: string[]; // Преобразованные имена тегов
  isAdultContent?: boolean;
  onPress: () => void;
  onFocus?: () => void;
  hasTVPreferredFocus?: boolean;
}

export const PhotoListItem: React.FC<PhotoListItemProps> = ({
  thumbnailUrl,
  name,
  storageName,
  takenDate,
  captions,
  personNames = [],
  tagNames = [],
  isAdultContent = false,
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

  // Форматирование даты из ISO в dd.MM.yyyy HH:mm
  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'dd.MM.yyyy HH:mm');
    } catch {
      return '';
    }
  };

  const formattedDate = formatDate(takenDate);
  const caption = captions && captions.length > 0 ? captions[0] : '';

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
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
        {/* NSFW Badge */}
        {isAdultContent && (
          <View style={styles.nsfwBadge}>
            <Text style={styles.nsfwText}>18+</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Row 1: Storage, Name, Date */}
        <View style={styles.row}>
          <Text style={[styles.rowText, isFocused && styles.rowTextFocused]} numberOfLines={1}>
            📁 {storageName}
          </Text>
          <Text style={styles.separator}>•</Text>
          <Text
            style={[styles.rowText, styles.nameText, isFocused && styles.rowTextFocused]}
            numberOfLines={1}
          >
            {name}
          </Text>
          {formattedDate && (
            <>
              <Text style={styles.separator}>•</Text>
              <Text style={[styles.rowText, isFocused && styles.rowTextFocused]}>
                🕒 {formattedDate}
              </Text>
            </>
          )}
        </View>

        {/* Row 2: Caption, Persons, Tags */}
        <View style={styles.row}>
          {/* Caption */}
          {caption && (
            <>
              <Text style={[styles.rowText, isFocused && styles.rowTextFocused]} numberOfLines={1}>
                💬 {caption}
              </Text>
              <Text style={styles.separator}>•</Text>
            </>
          )}

          {/* Persons */}
          {personNames.length > 0 && (
            <>
              <Text style={[styles.rowText, isFocused && styles.rowTextFocused]}>
                👥 {personNames.join(', ')}
              </Text>
              <Text style={styles.separator}>•</Text>
            </>
          )}

          {/* Tags */}
          {tagNames.length > 0 && (
            <Text style={[styles.rowText, isFocused && styles.rowTextFocused]} numberOfLines={1}>
              🏷️ {tagNames.join(', ')}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: Platform.isTV ? 12 : 8,
    marginBottom: Platform.isTV ? 12 : 8,
    minHeight: Platform.isTV ? 90 : 80,
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
    position: 'relative',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#1f2937',
  },
  thumbnailPlaceholder: {
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nsfwBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  nsfwText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  rowText: {
    fontSize: Platform.isTV ? 14 : 12,
    color: '#9ca3af',
  },
  rowTextFocused: {
    color: '#d1d5db',
  },
  nameText: {
    fontWeight: '600',
    color: '#e5e7eb',
  },
  separator: {
    fontSize: Platform.isTV ? 14 : 12,
    color: '#6b7280',
  },
});
