// src/screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { EpisodeListItem } from '@/components/EpisodeListItem';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface Episode {
  id: string;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { setFocusedItemId } = useAppStore();

  // Данные эпизодов в стиле "Блуи"
  const episodes: Episode[] = Array.from({ length: 20 }, (_, i) => ({
    id: `episode-${i + 1}`,
    title: `Блуи - S02E${String(i + 1).padStart(2, '0')} - Эпизод ${i + 1}`,
    subtitle: `Bluey.S02E${String(i + 1).padStart(2, '0')}.720p.mkv`,
    thumbnailUrl: `https://picsum.photos/50/50?random=${i}`,
  }));

  const handleItemFocus = useCallback(
    (itemId: string) => {
      setFocusedItemId(itemId);
    },
    [setFocusedItemId]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Episode; index: number }) => (
      <EpisodeListItem
        title={item.title}
        subtitle={item.subtitle}
        thumbnailUrl={item.thumbnailUrl}
        onPress={() => {
          navigation.navigate('Detail', {
            itemId: item.id,
            title: item.title,
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
        <Text style={styles.title}>Блуи - Сезон 2</Text>
        <FocusableButton
          title="Настройки"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        />
      </View>

      <FlatList
        data={episodes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f', // Синий фон как на скриншоте
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
  settingsButton: {
    minWidth: Platform.isTV ? 150 : 100,
  },
  listContainer: {
    paddingHorizontal: Platform.isTV ? 32 : 16,
    paddingVertical: Platform.isTV ? 16 : 8,
  },
});

export default HomeScreen;
