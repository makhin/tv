// src/components/TagBadge.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useThemePalette, type ThemePalette } from '@/config/theme';

export type BadgeVariant = 'tag' | 'person';

interface TagBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, variant = 'tag' }) => {
  const theme = useThemePalette();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const badgeStyle = variant === 'person' ? styles.badgePerson : styles.badgeTag;
  const textStyle = variant === 'person' ? styles.textPerson : styles.textTag;

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    badge: {
      paddingHorizontal: Platform.isTV ? 8 : 6,
      paddingVertical: Platform.isTV ? 4 : 3,
      borderRadius: 4,
      marginRight: Platform.isTV ? 4 : 3,
      marginBottom: Platform.isTV ? 4 : 3,
    },
    badgeTag: {
      backgroundColor: theme.tagBackground,
    },
    badgePerson: {
      backgroundColor: theme.personTagBackground,
    },
    text: {
      fontSize: Platform.isTV ? 12 : 10,
      fontWeight: '500',
    },
    textTag: {
      color: theme.tagText,
    },
    textPerson: {
      color: theme.personTagText,
    },
  });
