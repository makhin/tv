// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme, setTheme, user, reset } = useAppStore();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleReset = () => {
    reset();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Настройки</Text>

        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Информация о пользователе</Text>
          {user ? (
            <>
              <Text style={styles.infoText}>Имя: {user.name}</Text>
              <Text style={styles.infoText}>Email: {user.email}</Text>
            </>
          ) : (
            <Text style={styles.infoText}>Пользователь не авторизован</Text>
          )}
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Тема</Text>
          <Text style={styles.infoText}>
            Текущая тема: {theme === 'dark' ? 'Тёмная' : 'Светлая'}
          </Text>
          <View style={styles.buttonSpacing}>
            <FocusableButton
              title={`Переключить на ${theme === 'dark' ? 'светлую' : 'тёмную'}`}
              onPress={handleThemeToggle}
              hasTVPreferredFocus={true}
            />
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          <Text style={styles.infoText}>Версия: 0.0.1</Text>
          <Text style={styles.infoText}>
            React Native TV приложение с поддержкой Android TV
          </Text>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Действия</Text>
          <View style={styles.buttonSpacing}>
            <FocusableButton title="Сбросить настройки" onPress={handleReset} />
          </View>
          <View style={styles.buttonSpacing}>
            <FocusableButton title="Назад" onPress={() => navigation.goBack()} />
          </View>
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
    marginBottom: 32,
  },
  section: {
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
  buttonSpacing: {
    marginTop: 12,
  },
});

export default SettingsScreen;
