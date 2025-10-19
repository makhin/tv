// src/screens/MetadataScreen.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Platform, TVEventHandler as TVEventHandlerClass } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { usePhotosGetPhoto } from '@/api/generated/photos/photos';
import { format } from 'date-fns';
import { TagBadge } from '@/components/TagBadge';
import { styles } from './MetadataScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Metadata'>;

const MetadataScreen: React.FC<Props> = ({ route, navigation }) => {
  const { photoId, photoIds } = route.params;

  const { data: photo, isLoading, isError } = usePhotosGetPhoto(photoId);

  // Обработка событий пульта TV - только LEFT для возврата
  useEffect(() => {
    if (!Platform.isTV) return;

    console.log('MetadataScreen: Setting up TV event listener...');

    const handleTVEvent = (evt: any) => {
      console.log('MetadataScreen TV Event received:', evt.eventType);

      if (evt.eventType === 'left') {
        console.log('Returning to detail screen');

        navigation.dispatch((state) => {
          const targetRoute = state.routes.find((route) => route.name === 'Detail');

          if (!targetRoute) {
            return null;
          }

          return CommonActions.setParams({
            params: { photoId, photoIds },
            source: targetRoute.key,
          });
        });

        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }
    };

    const subscription = (TVEventHandlerClass as any).addListener(handleTVEvent);
    console.log('MetadataScreen: TV event listener added');

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
        console.log('MetadataScreen: TV event listener removed');
      }
    };
  }, [navigation, photoId, photoIds]);

  // Находим текущий индекс фото в списке
  const currentIndex = photoIds.indexOf(photoId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка метаданных...</Text>
      </View>
    );
  }

  if (isError || !photo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ошибка загрузки метаданных</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left column */}
        <View style={styles.column}>
          {/* Basic info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Основная информация</Text>

            {photo.name && (
              <View style={styles.row}>
                <Text style={styles.label}>Файл:</Text>
                <Text style={styles.value} numberOfLines={1}>
                  {photo.name}
                </Text>
              </View>
            )}

            {photo.takenDate && (
              <View style={styles.row}>
                <Text style={styles.label}>Дата съёмки:</Text>
                <Text style={styles.value}>
                  {format(new Date(photo.takenDate), 'dd.MM.yyyy HH:mm:ss')}
                </Text>
              </View>
            )}

            {photo.id !== undefined && (
              <View style={styles.row}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{photo.id}</Text>
              </View>
            )}

            {photo.width !== undefined && photo.height !== undefined && (
              <View style={styles.row}>
                <Text style={styles.label}>Разрешение:</Text>
                <Text style={styles.value}>
                  {photo.width} × {photo.height}
                </Text>
              </View>
            )}

            {photo.scale !== undefined && (
              <View style={styles.row}>
                <Text style={styles.label}>Масштаб:</Text>
                <Text style={styles.value}>{photo.scale.toFixed(2)}</Text>
              </View>
            )}

            {photo.orientation !== undefined && (
              <View style={styles.row}>
                <Text style={styles.label}>Ориентация:</Text>
                <Text style={styles.value}>{photo.orientation}</Text>
              </View>
            )}

            {photo.location && (
              <View style={styles.row}>
                <Text style={styles.label}>Координаты:</Text>
                <Text style={styles.value}>
                  {photo.location.latitude?.toFixed(6)}, {photo.location.longitude?.toFixed(6)}
                </Text>
              </View>
            )}
          </View>

          {/* Captions */}
          {photo.captions && photo.captions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Описания ({photo.captions.length})</Text>
              {photo.captions.slice(0, 5).map((caption, index) => (
                <View key={index} style={styles.captionItem}>
                  <Text style={styles.captionText} numberOfLines={2}>
                    {caption}
                  </Text>
                </View>
              ))}
              {photo.captions.length > 5 && (
                <Text style={styles.moreText}>+{photo.captions.length - 5} ещё</Text>
              )}
            </View>
          )}

          {/* Faces */}
          {photo.faces && photo.faces.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Распознанные лица ({photo.faces.length})</Text>
              <View style={styles.badgesContainer}>
                {photo.faces.slice(0, 10).map((face, index) => (
                  <View key={index} style={styles.faceItem}>
                    <Text style={styles.faceText}>
                      {face.age ? `Возраст: ${face.age}` : `Лицо ${index + 1}`}
                    </Text>
                  </View>
                ))}
                {photo.faces.length > 10 && (
                  <Text style={styles.moreText}>+{photo.faces.length - 10} ещё</Text>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Right column */}
        <View style={styles.column}>
          {/* Tags */}
          {photo.tags && photo.tags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Теги ({photo.tags.length})</Text>
              <View style={styles.badgesContainer}>
                {photo.tags.slice(0, 20).map((tag, index) => (
                  <TagBadge key={`tag-${index}`} label={tag} variant="tag" />
                ))}
                {photo.tags.length > 20 && (
                  <TagBadge label={`+${photo.tags.length - 20}`} variant="tag" />
                )}
              </View>
            </View>
          )}

          {/* Content moderation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Модерация контента</Text>

            {photo.adultScore !== undefined && (
              <View style={styles.row}>
                <Text style={styles.label}>Adult Score:</Text>
                <View style={styles.scoreContainer}>
                  <Text
                    style={[
                      styles.scoreValue,
                      photo.adultScore > 0.7
                        ? styles.scoreHigh
                        : photo.adultScore > 0.4
                        ? styles.scoreMedium
                        : styles.scoreLow,
                    ]}
                  >
                    {(photo.adultScore * 100).toFixed(1)}%
                  </Text>
                  {photo.adultScore > 0.7 && <Text style={styles.scoreIcon}>🔞</Text>}
                </View>
              </View>
            )}

            {photo.racyScore !== undefined && (
              <View style={styles.row}>
                <Text style={styles.label}>Racy Score:</Text>
                <View style={styles.scoreContainer}>
                  <Text
                    style={[
                      styles.scoreValue,
                      photo.racyScore > 0.7
                        ? styles.scoreHigh
                        : photo.racyScore > 0.4
                        ? styles.scoreMedium
                        : styles.scoreLow,
                    ]}
                  >
                    {(photo.racyScore * 100).toFixed(1)}%
                  </Text>
                  {photo.racyScore > 0.7 && <Text style={styles.scoreIcon}>⚠️</Text>}
                </View>
              </View>
            )}

            {photo.adultScore === undefined && photo.racyScore === undefined && (
              <Text style={styles.noFlags}>✓ Нет данных модерации</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MetadataScreen;
