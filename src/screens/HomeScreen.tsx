// src/screens/HomeScreen.tsx
import React, { useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { PhotoListItem } from '@/components/PhotoListItem';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';
import { usePhotosSearchPhotos } from '@/api/generated/photos/photos';
import type { PhotoItemDto } from '@/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Расширенный интерфейс для отображения фото с именами
interface PhotoItemDisplay extends PhotoItemDto {
  personNames?: string[];
  tagNames?: string[];
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { setFocusedItemId } = useAppStore();

  // Получаем текущую дату для фильтра "Этот день"
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1; // getMonth() возвращает 0-11

  const { mutate, data, isPending } = usePhotosSearchPhotos({
    mutation: {
      onSuccess: (response) => {
        console.log('Photos loaded:', response.totalCount);
      },
      onError: (error) => {
        console.error('Error loading photos:', error);
      },
    },
  });

  // Выполняем поиск при монтировании компонента
  useEffect(() => {
    mutate({
      data: {
        page: 1,
        pageSize: 50,
        thisDay: {
          day: currentDay,
          month: currentMonth,
        },
      },
    });
  }, [mutate, currentDay, currentMonth]);

  const photos = useMemo(() => data?.items ?? [], [data]);

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
            photoId: item.id,
          });
        }}
        onFocus={() => handleItemFocus(item.id)}
        hasTVPreferredFocus={index === 0}
      />
    ),
    [navigation, handleItemFocus]
  );

  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка фото...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Фотоархив</Text>
        <View style={styles.headerButtons}>
          <Text style={styles.photoCount}>Фото: {photos.length}</Text>
          <FocusableButton
            title="Настройки"
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          />
        </View>
      </View>

      {photos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Нет фото за этот день</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1e3a5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: Platform.isTV ? 24 : 16,
    color: '#9ca3af',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: Platform.isTV ? 28 : 18,
    color: '#9ca3af',
    textAlign: 'center',
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
