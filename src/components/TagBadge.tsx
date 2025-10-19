// src/components/TagBadge.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { tagBadgeStyles as styles } from '@/styles';

export type BadgeVariant = 'tag' | 'person';

interface TagBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, variant = 'tag' }) => {
  const badgeStyle = variant === 'person' ? styles.badgePerson : styles.badgeTag;
  const textStyle = variant === 'person' ? styles.textPerson : styles.textTag;

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
};

