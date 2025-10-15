// src/screens/DetailScreen.tsx
import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { width, height } = Dimensions.get('window');

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { previewUrl } = route.params;

  return (
    <View style={styles.container}>
      {previewUrl && (
        <Image
          source={{ uri: previewUrl }}
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
  image: {
    width: width,
    height: height,
  },
});

export default DetailScreen;
