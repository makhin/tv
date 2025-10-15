// src/screens/HomeScreen.tsx
import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { PhotoListItem } from '@/components/PhotoListItem';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';
import type { PhotoItemDto } from '@/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Расширенный интерфейс для отображения фото с именами
interface PhotoItemDisplay extends PhotoItemDto {
  personNames?: string[];
  tagNames?: string[];
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { setFocusedItemId } = useAppStore();

  // TODO: Заменить на реальный API запрос
  // const { data, isLoading } = usePhotosSearchPhotos({
  //   mutation: {
  //     onSuccess: (response) => {
  //       console.log('Photos loaded:', response.totalCount);
  //     },
  //   },
  // });

  // Моковые данные для демонстрации
  const mockPhotos: PhotoItemDisplay[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Photo_${String(i + 1).padStart(4, '0')}.jpg`,
        thumbnailUrl: `https://picsum.photos/50/50?random=${i}`,
        storageName: i % 2 === 0 ? 'Семейный архив' : 'Отпуск 2024',
        relativePath: `/photos/2024/${String(i + 1).padStart(2, '0')}/`,
        takenDate:
          i % 3 === 0
            ? new Date(2024, i % 12, (i % 28) + 1, 10 + (i % 12), i % 60).toISOString()
            : null,
        isBW: i % 5 === 0,
        isAdultContent: i % 7 === 0,
        isRacyContent: false,
        adultScore: i % 7 === 0 ? 0.85 : 0.1,
        racyScore: 0.1,
        tags: i % 2 === 0 ? [1, 2] : i % 3 === 0 ? [3, 4, 5] : null,
        persons: i % 3 === 0 ? [1, 2] : i % 4 === 0 ? [3] : null,
        captions:
          i % 2 === 0
            ? ['Семейный ужин в ресторане']
            : i % 3 === 0
            ? ['Закат на пляже', 'Красивый вид']
            : null,
        // Преобразованные имена (в реальности будут из справочников)
        personNames: i % 3 === 0 ? ['Анна', 'Борис'] : i % 4 === 0 ? ['Светлана'] : undefined,
        tagNames:
          i % 2 === 0 ? ['природа', 'лето'] : i % 3 === 0 ? ['семья', 'отпуск', 'море'] : undefined,
      })),
    []
  );

  const handleItemFocus = useCallback(
    (itemId: number) => {
      setFocusedItemId(String(itemId));
    },
    [setFocusedItemId]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: PhotoItemDisplay; index: number }) => (
      <PhotoListItem
        thumbnailUrl={item.thumbnailUrl}
        name={item.name}
        storageName={item.storageName}
        takenDate={item.takenDate}
        captions={item.captions}
        personNames={item.personNames}
        tagNames={item.tagNames}
        isAdultContent={item.isAdultContent}
        onPress={() => {
          navigation.navigate('Detail', {
            itemId: String(item.id),
            title: item.name,
          });
        }}
        onFocus={() => handleItemFocus(item.id)}
        hasTVPreferredFocus={index === 0}
      />
    ),
    [navigation, handleItemFocus]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Фотоархив</Text>
        <View style={styles.headerButtons}>
          <Text style={styles.photoCount}>Фото: {mockPhotos.length}</Text>
          <FocusableButton
            title="Настройки"
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          />
        </View>
      </View>

      <FlatList
        data={mockPhotos}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Platform.isTV ? 32 : 16,
    paddingVertical: Platform.isTV ? 24 : 16,
    backgroundColor: '#1e3a5f',
  },
  title: {
    fontSize: Platform.isTV ? 36 : 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  photoCount: {
    fontSize: Platform.isTV ? 18 : 14,
    color: '#d1d5db',
  },
  settingsButton: {
    minWidth: Platform.isTV ? 150 : 100,
  },
  listContainer: {
    paddingHorizontal: Platform.isTV ? 32 : 16,
    paddingVertical: Platform.isTV ? 16 : 8,
  },
});

export default HomeScreen;
