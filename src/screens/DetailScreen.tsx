// src/screens/DetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { FocusableButton } from '@/components/FocusableButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId, title } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>ID: {itemId}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Информация</Text>
          <Text style={styles.infoText}>
            Это детальный экран для элемента {title}
          </Text>
          <Text style={styles.infoText}>
            Здесь можно отображать подробную информацию о выбранном контенте.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <FocusableButton
            title="Назад"
            onPress={() => navigation.goBack()}
            hasTVPreferredFocus={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: Platform.isTV ? 32 : 16,
  },
  title: {
    fontSize: Platform.isTV ? 42 : 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Platform.isTV ? 24 : 16,
    color: '#9ca3af',
    marginBottom: 32,
  },
  infoSection: {
    backgroundColor: '#1f2937',
    padding: Platform.isTV ? 24 : 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? 28 : 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  infoText: {
    fontSize: Platform.isTV ? 20 : 14,
    color: '#e5e7eb',
    lineHeight: Platform.isTV ? 32 : 22,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'flex-start',
  },
});

export default DetailScreen;
