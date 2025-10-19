// src/components/PhotoListItem.tsx
import React, { useState } from 'react';
import { Pressable, Text, Image, View } from 'react-native';
import { format, parseISO } from 'date-fns';
import { TagBadge } from './TagBadge';
import { photoListItemStyles as styles } from '@/styles';

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
              {remainingPersons > 0 && <TagBadge label={`+${remainingPersons}`} variant="person" />}
            </View>
          )}

          {/* Tags */}
          {tagNames.length > 0 && (
            <View style={styles.badgesContainer}>
              {visibleTags.map((tag, index) => (
                <TagBadge key={`tag-${index}`} label={tag} variant="tag" />
              ))}
              {remainingTags > 0 && <TagBadge label={`+${remainingTags}`} variant="tag" />}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

