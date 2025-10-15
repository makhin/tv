// src/screens/DetailScreen.tsx
import React from 'react';
import { View, StyleSheet, Image, Dimensions, ActivityIndicator, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { usePhotosGetPhoto } from '@/api/generated/photos/photos';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { width, height } = Dimensions.get('window');

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { photoId } = route.params;

  const { data: photo, isLoading, isError } = usePhotosGetPhoto(photoId);

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
    <View style={styles.container}>
      {photo.previewUrl && (
        <Image
          source={{ uri: photo.previewUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
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
});

export default DetailScreen;
