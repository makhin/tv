// src/components/LoadMoreIndicator.tsx
import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useThemePalette, type ThemePalette } from '@/config/theme';

interface LoadMoreIndicatorProps {
  isVisible: boolean;
  loadedCount: number;
  totalCount: number;
  hasMore: boolean;
}

export const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({
  isVisible,
  loadedCount,
  totalCount,
  hasMore,
}) => {
  const theme = useThemePalette();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {hasMore ? (
        <>
          <ActivityIndicator size="large" color={theme.activityIndicator} />
          <Text style={styles.text}>{`Загружено ${loadedCount} из ${totalCount}`}</Text>
        </>
      ) : (
        <>
          <Text style={styles.completeIcon}>🎉</Text>
          <Text style={styles.text}>{`Все фото загружены (${loadedCount})`}</Text>
        </>
      )}
    </View>
  );
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    container: {
      paddingVertical: Platform.isTV ? 24 : 16,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    text: {
      fontSize: Platform.isTV ? 18 : 14,
      color: theme.textMuted,
      textAlign: 'center',
    },
    completeIcon: {
      fontSize: Platform.isTV ? 32 : 24,
      color: theme.success,
    },
  });
