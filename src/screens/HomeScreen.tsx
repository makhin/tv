// src/screens/HomeScreen.final.tsx (финальная версия с лучшим UX)
import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { PhotoListItem } from '@/components/PhotoListItem';
import { FocusableButton } from '@/components/FocusableButton';
import { LoadMoreIndicator } from '@/components/LoadMoreIndicator';
import { useAppStore } from '@/store/useAppStore';
import { useInfinitePhotos } from '@/hooks/useInfinitePhotos';
import { mapPhotosToDisplay, type PhotoItemDisplay } from '@/utils/photoHelpers';
import { styles } from './HomeScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { setFocusedItemId, focusedItemId, persons, tags } = useAppStore();
  const flatListRef = useRef<FlatList>(null);
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(true);

  // Получаем текущую дату для фильтра "Этот день"
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;

  // Используем хук для infinity load
  const {
    photos: allPhotos,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    refresh,
  } = useInfinitePhotos({
    pageSize: 20,
    filter: {
      thisDay: {
        day: currentDay,
        month: currentMonth,
      },
    },
  });

  // Преобразуем фото с именами persons и tags
  const photos = useMemo(() => {
    return mapPhotosToDisplay(allPhotos, persons, tags);
  }, [allPhotos, persons, tags]);

  // Обрабатываем возврат на экран - скроллим к сохраненному фото
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (focusedItemId && photos.length > 0) {
        const index = photos.findIndex((p) => String(p.id) === focusedItemId);
        if (index !== -1 && flatListRef.current) {
          console.log('Scrolling to saved photo index:', index);
          setShouldRestoreFocus(true);
          // Небольшая задержка, чтобы список успел отрендериться
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index,
              animated: false,
              viewPosition: 0.5, // Центрируем элемент
            });
          }, 100);
        }
      }
    });

    return unsubscribe;
  }, [navigation, focusedItemId, photos, setShouldRestoreFocus]);

  const handleItemFocus = useCallback(
    (itemId: number) => {
      setFocusedItemId(String(itemId));
      setShouldRestoreFocus(false);
    },
    [setFocusedItemId, setShouldRestoreFocus]
  );

  // Получаем список ID всех фото для навигации
  const photoIds = useMemo(() => photos.map((p) => p.id), [photos]);

  const renderItem = useCallback(
    ({ item, index }: { item: PhotoItemDisplay; index: number }) => {
      // Проверяем, должен ли этот элемент получить фокус
      const matchesSavedFocus = focusedItemId
        ? String(item.id) === focusedItemId
        : index === 0;
      const shouldFocus = Platform.isTV && shouldRestoreFocus && matchesSavedFocus;

      return (
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
            // Сохраняем ID перед переходом
            setFocusedItemId(String(item.id));
            navigation.navigate('Detail', {
              photoId: item.id,
              photoIds: photoIds,
            });
          }}
          onFocus={() => handleItemFocus(item.id)}
          hasTVPreferredFocus={shouldFocus}
        />
      );
    },
    [
      navigation,
      handleItemFocus,
      photoIds,
      focusedItemId,
      setFocusedItemId,
      shouldRestoreFocus,
    ]
  );

  const ListHeaderComponent = useMemo(
    () => (
      <View style={styles.header}>
        <FocusableButton
          title="⚙"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
          textStyle={styles.settingsButtonText}
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Фотоархив</Text>
          <Text style={styles.photoCount}>
            {isLoading && photos.length === 0
              ? 'Загрузка...'
              : `Фото: ${photos.length}${totalCount > 0 ? ` из ${totalCount}` : ''}`}
          </Text>
        </View>
      </View>
    ),
    [photos.length, totalCount, isLoading, navigation]
  );

  const ListFooterComponent = useMemo(
    () => (
      <LoadMoreIndicator
        isVisible={isLoadingMore || (!hasMore && photos.length > 0)}
        loadedCount={photos.length}
        totalCount={totalCount}
        hasMore={hasMore}
      />
    ),
    [isLoadingMore, hasMore, photos.length, totalCount]
  );

  const ListEmptyComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <LoadMoreIndicator isVisible={true} loadedCount={0} totalCount={0} hasMore={true} />
          <Text style={styles.loadingText}>Загрузка фото...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>❌ Ошибка загрузки</Text>
          <Text style={styles.errorDetail}>{error.message}</Text>
          <FocusableButton title="Повторить" onPress={refresh} hasTVPreferredFocus />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📅 Нет фото за этот день</Text>
        <Text style={styles.emptySubtext}>
          {currentDay}.{String(currentMonth).padStart(2, '0')}
        </Text>
      </View>
    );
  }, [isLoading, error, refresh, currentDay, currentMonth]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          console.log('onEndReached triggered', {
            hasMore,
            isLoadingMore,
            photosCount: photos.length,
            totalCount,
          });
          loadMore();
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        removeClippedSubviews={false}
        maxToRenderPerBatch={10}
        windowSize={Platform.isTV ? 5 : 10}
        initialNumToRender={10}
        // Pull to refresh для мобильных устройств
        refreshing={isLoading && photos.length > 0}
        onRefresh={Platform.isTV ? undefined : refresh}
        // Оптимизация для TV
        getItemLayout={
          Platform.isTV
            ? (data, index) => ({
                length: 102, // Примерная высота элемента
                offset: 102 * index,
                index,
              })
            : undefined
        }
        onScrollToIndexFailed={(info) => {
          console.log('Scroll to index failed:', info);
          // Попробуем еще раз через небольшую задержку
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
              viewPosition: 0.5,
            });
          }, 500);
        }}
      />
    </View>
  );
};

export default HomeScreen;
