// src/components/LoadMoreIndicator.tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { loadMoreIndicatorStyles as styles, colors } from '@/styles';

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
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {hasMore ? (
        <>
          <ActivityIndicator size="large" color={colors.accentPrimary} />
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

