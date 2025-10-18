// src/screens/MetadataScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Platform,
  TVEventHandler as TVEventHandlerClass,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { usePhotosGetPhoto } from '@/api/generated/photos/photos';
import { format } from 'date-fns';
import { TagBadge } from '@/components/TagBadge';

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
        console.log('Navigating back to detail screen');
        navigation.goBack();
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
  }, [navigation]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: Platform.isTV ? 32 : 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: Platform.isTV ? 20 : 16,
    color: '#9ca3af',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: Platform.isTV ? 24 : 18,
    color: '#ef4444',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.isTV ? 24 : 16,
    paddingBottom: Platform.isTV ? 16 : 12,
    borderBottomWidth: 2,
    borderBottomColor: '#374151',
  },
  headerText: {
    fontSize: Platform.isTV ? 28 : 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  hint: {
    fontSize: Platform.isTV ? 16 : 12,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: Platform.isTV ? 24 : 16,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: Platform.isTV ? 20 : 16,
    backgroundColor: '#1f2937',
    padding: Platform.isTV ? 16 : 12,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? 20 : 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: Platform.isTV ? 12 : 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Platform.isTV ? 8 : 6,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Platform.isTV ? 15 : 12,
    color: '#9ca3af',
    marginRight: 8,
    minWidth: Platform.isTV ? 140 : 100,
  },
  value: {
    fontSize: Platform.isTV ? 15 : 12,
    color: '#ffffff',
    flex: 1,
  },
  captionItem: {
    marginBottom: Platform.isTV ? 10 : 8,
    paddingBottom: Platform.isTV ? 8 : 6,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  captionText: {
    fontSize: Platform.isTV ? 14 : 12,
    color: '#ffffff',
  },
  moreText: {
    fontSize: Platform.isTV ? 12 : 10,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: Platform.isTV ? 8 : 4,
  },
  faceItem: {
    backgroundColor: '#374151',
    paddingHorizontal: Platform.isTV ? 10 : 8,
    paddingVertical: Platform.isTV ? 6 : 4,
    borderRadius: 6,
    marginBottom: Platform.isTV ? 6 : 4,
  },
  faceText: {
    fontSize: Platform.isTV ? 13 : 11,
    color: '#ffffff',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreValue: {
    fontSize: Platform.isTV ? 15 : 12,
    fontWeight: 'bold',
  },
  scoreLow: {
    color: '#10b981',
  },
  scoreMedium: {
    color: '#f59e0b',
  },
  scoreHigh: {
    color: '#ef4444',
  },
  scoreIcon: {
    fontSize: Platform.isTV ? 18 : 14,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Platform.isTV ? 6 : 4,
  },
  noFlags: {
    fontSize: Platform.isTV ? 14 : 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});

export default MetadataScreen;
