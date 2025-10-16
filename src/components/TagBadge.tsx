// src/components/TagBadge.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

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

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Platform.isTV ? 8 : 6,
    paddingVertical: Platform.isTV ? 4 : 3,
    borderRadius: 4,
    marginRight: Platform.isTV ? 4 : 3,
    marginBottom: Platform.isTV ? 4 : 3,
  },
  badgeTag: {
    backgroundColor: '#065f46',
  },
  badgePerson: {
    backgroundColor: '#1e3a8a',
  },
  text: {
    fontSize: Platform.isTV ? 12 : 10,
    fontWeight: '500',
  },
  textTag: {
    color: '#a7f3d0',
  },
  textPerson: {
    color: '#93c5fd',
  },
});
