// src/components/FocusableGrid.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  ListRenderItem,
} from 'react-native';
import { FocusableCard } from './FocusableCard';

interface GridItem {
  id: string;
  title: string;
  imageUrl?: string;
  onPress: () => void;
}

interface FocusableGridProps {
  data: GridItem[];
  numColumns?: number;
  onItemFocus?: (itemId: string) => void;
}

const { width } = Dimensions.get('window');

export const FocusableGrid: React.FC<FocusableGridProps> = ({
  data,
  numColumns = 4,
  onItemFocus,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleItemFocus = useCallback(
    (index: number, itemId: string) => {
      setFocusedIndex(index);
      onItemFocus?.(itemId);
    },
    [onItemFocus]
  );

  const renderItem: ListRenderItem<GridItem> = useCallback(
    ({ item, index }) => {
      const isFirstInRow = index % numColumns === 0;
      const hasTVPreferredFocus = index === 0;

      return (
        <FocusableCard
          title={item.title}
          imageUrl={item.imageUrl}
          onPress={item.onPress}
          onFocus={() => handleItemFocus(index, item.id)}
          hasTVPreferredFocus={hasTVPreferredFocus}
          style={[
            styles.gridItem,
            { width: width / numColumns - 32 },
            !isFirstInRow && styles.gridItemSpacing,
          ]}
        />
      );
    },
    [numColumns, handleItemFocus]
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 16,
  },
  gridItem: {
    marginBottom: 16,
  },
  gridItemSpacing: {
    marginLeft: 16,
  },
});