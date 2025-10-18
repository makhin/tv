// src/components/PhotoListItem.tsx
import React, { useMemo, useState } from 'react';
import { Pressable, Text, Image, StyleSheet, View, Platform } from 'react-native';
import { format, parseISO } from 'date-fns';
import { TagBadge } from './TagBadge';
import { useThemePalette, type ThemePalette } from '@/config/theme';

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
  const theme = useThemePalette();
  const styles = useMemo(() => createStyles(theme), [theme]);

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

  // Ограничиваем количество показываемых бейджей
  const MAX_BADGES = 5;
  const visiblePersons = personNames.slice(0, MAX_BADGES);
  const remainingPersons = personNames.length - MAX_BADGES;
  const visibleTags = tagNames.slice(0, MAX_BADGES);
  const remainingTags = tagNames.length - MAX_BADGES;

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
        {/* Row 1: Storage, Name, Date, Caption */}
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
          {caption && (
            <>
              <Text style={styles.separator}>•</Text>
              <Text style={[styles.rowText, isFocused && styles.rowTextFocused]} numberOfLines={1}>
                💬 {caption}
              </Text>
            </>
          )}
        </View>

        {/* Row 2: Persons, Tags */}
        <View style={styles.row}>
          {/* Persons */}
          {personNames.length > 0 && (
            <View style={styles.badgesContainer}>
              {visiblePersons.map((person, index) => (
                <TagBadge key={`person-${index}`} label={person} variant="person" />
              ))}
              {remainingPersons > 0 && (
                <TagBadge label={`+${remainingPersons}`} variant="person" />
              )}
            </View>
          )}

          {/* Tags */}
          {tagNames.length > 0 && (
            <View style={styles.badgesContainer}>
              {visibleTags.map((tag, index) => (
                <TagBadge key={`tag-${index}`} label={tag} variant="tag" />
              ))}
              {remainingTags > 0 && (
                <TagBadge label={`+${remainingTags}`} variant="tag" />
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.listItemBackground,
      borderRadius: 8,
      padding: Platform.isTV ? 12 : 8,
      marginBottom: Platform.isTV ? 12 : 8,
      minHeight: Platform.isTV ? 90 : 80,
      borderWidth: 1,
      borderColor: theme.borderMuted,
    },
    containerFocused: {
      backgroundColor: theme.listItemFocusedBackground,
      borderWidth: 3,
      borderColor: theme.listItemFocusedBorder,
      shadowColor: theme.listItemFocusedBorder,
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
      backgroundColor: theme.thumbnailBackground,
    },
    thumbnailPlaceholder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      color: theme.textMuted,
      fontSize: 20,
      fontWeight: 'bold',
    },
    nsfwBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: theme.nsfwBackground,
      borderRadius: 4,
      paddingHorizontal: 4,
      paddingVertical: 2,
    },
    nsfwText: {
      color: theme.textInverted,
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
      color: theme.textMuted,
    },
    rowTextFocused: {
      color: theme.textSecondary,
    },
    nameText: {
      fontWeight: '600',
      color: theme.textPrimary,
    },
    separator: {
      fontSize: Platform.isTV ? 14 : 12,
      color: theme.separator,
    },
    badgesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
  });
