// src/components/LoadMoreIndicator.tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';

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
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.text}>
        {hasMore
          ? `Загружено ${loadedCount} из ${totalCount}`
          : `Все фото загружены (${loadedCount})`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.isTV ? 24 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    fontSize: Platform.isTV ? 18 : 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
