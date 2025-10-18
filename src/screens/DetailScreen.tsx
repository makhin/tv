// src/screens/DetailScreen.tsx
import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, ActivityIndicator, Text, Platform, Pressable, TVEventHandler as TVEventHandlerClass } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { usePhotosGetPhoto } from '@/api/generated/photos/photos';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { width, height } = Dimensions.get('window');

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { photoId, photoIds } = route.params;
  const { setFocusedItemId } = useAppStore();

  const { data: photo, isLoading, isError } = usePhotosGetPhoto(photoId);

  // Находим текущий индекс фото в списке
  const currentIndex = photoIds.indexOf(photoId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photoIds.length - 1;

  // Сохраняем текущий photoId при каждом изменении
  useEffect(() => {
    console.log('Current photoId changed to:', photoId);
    setFocusedItemId(String(photoId));
  }, [photoId, setFocusedItemId]);

  const handleKeyPress = useCallback((evt: any) => {
    console.log('Key press event:', evt.nativeEvent);
  }, []);

  // Используем TVEventHandler через addListener
  useEffect(() => {
    if (!Platform.isTV) return;

    console.log('Setting up TV event listener...');

    const handleTVEvent = (evt: any) => {
      console.log('TV Event received:', evt.eventType);

      if (evt.eventType === 'up') {
        // Предыдущее фото
        if (currentIndex > 0) {
          const previousPhotoId = photoIds[currentIndex - 1];
          console.log('Going to previous photo:', previousPhotoId);
          navigation.setParams({ photoId: previousPhotoId });
        }
      } else if (evt.eventType === 'down') {
        // Следующее фото
        if (currentIndex < photoIds.length - 1) {
          const nextPhotoId = photoIds[currentIndex + 1];
          console.log('Going to next photo:', nextPhotoId);
          navigation.setParams({ photoId: nextPhotoId });
        }
      } else if (evt.eventType === 'right') {
        // Переход на экран метаданных
        console.log('Navigating to metadata screen');
        navigation.navigate('Metadata', { photoId, photoIds });
      } else if (evt.eventType === 'left') {
        // Возврат на HomeScreen (photoId уже сохранен в useEffect)
        console.log('Going back to home screen with photoId:', photoId);
        navigation.goBack();
      }
    };

    const subscription = (TVEventHandlerClass as any).addListener(handleTVEvent);
    console.log('TV event listener added');

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
        console.log('TV event listener removed');
      }
    };
  }, [currentIndex, photoIds, photoId, navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка фото...</Text>
      </View>
    );
  }

  if (isError || !photo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ошибка загрузки фото</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => console.log('Screen pressed')}
      hasTVPreferredFocus={true}
    >
      {photo.previewUrl && (
        <Image
          source={{ uri: photo.previewUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {/* Photo counter */}
      <View style={styles.photoCounter}>
        <Text style={styles.photoCounterText}>
          {currentIndex + 1} / {photoIds.length}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9ca3af',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
  },
  image: {
    width: width,
    height: height,
  },
  photoCounter: {
    position: 'absolute',
    bottom: Platform.isTV ? 40 : 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: Platform.isTV ? 24 : 16,
    paddingVertical: Platform.isTV ? 12 : 8,
    borderRadius: 8,
  },
  photoCounterText: {
    color: '#ffffff',
    fontSize: Platform.isTV ? 20 : 14,
    fontWeight: '600',
  },
});

export default DetailScreen;
