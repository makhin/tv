// src/screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { FocusableGrid } from '@/components/FocusableGrid';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { setFocusedItemId } = useAppStore();

  const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i}`,
    title: `������� ${i + 1}`,
    imageUrl: `https://picsum.photos/400/225?random=${i}`,
    onPress: () => {
      navigation.navigate('Detail', {
        itemId: `item-${i}`,
        title: `������� ${i + 1}`,
      });
    },
  }));

  const handleItemFocus = useCallback(
    (itemId: string) => {
      setFocusedItemId(itemId);
    },
    [setFocusedItemId]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>��� Android TV ����������</Text>
        <FocusableButton
          title="���������"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        />
      </View>

      <FocusableGrid data={mockData} numColumns={4} onItemFocus={handleItemFocus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: Platform.isTV ? 36 : 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsButton: {
    minWidth: Platform.isTV ? 150 : 100,
  },
});

export default HomeScreen;
