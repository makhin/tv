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
      {hasMore ? (
        <>
          <ActivityIndicator size="large" color="#3b82f6" />
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
  completeIcon: {
    fontSize: Platform.isTV ? 32 : 24,
    color: '#22c55e',
  },
});
