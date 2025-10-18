// src/screens/SettingsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { FocusableButton } from '@/components/FocusableButton';
import {
  selectCredentials,
  useAppStore,
} from '@/store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme, setTheme, user, reset } = useAppStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    user: state.user,
    reset: state.reset,
  }));
  const storedCredentials = useAppStore(selectCredentials);
  const persistCredentials = useAppStore((state) => state.setCredentials);

  const [username, setUsername] = useState(storedCredentials.username);
  const [password, setPassword] = useState(storedCredentials.password);

  useEffect(() => {
    setUsername(storedCredentials.username);
    setPassword(storedCredentials.password);
  }, [storedCredentials.username, storedCredentials.password]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleReset = () => {
    reset();
  };

  const handleSaveCredentials = () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername) {
      Alert.alert('Ошибка', 'Имя пользователя не может быть пустым.');
      return;
    }

    if (!password) {
      Alert.alert('Ошибка', 'Пароль не может быть пустым.');
      return;
    }

    persistCredentials({
      username: normalizedUsername,
      password,
    });

    Alert.alert('Успех', 'Учетные данные сохранены.');
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

        {/* Credentials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Учетные данные</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Имя пользователя</Text>
            <TextInput
              focusable
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Введите имя пользователя"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              focusable
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Введите пароль"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />
          </View>
          <View style={styles.buttonSpacing}>
            <FocusableButton title="Сохранить" onPress={handleSaveCredentials} />
          </View>
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: Platform.isTV ? 22 : 16,
    color: '#e5e7eb',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: Platform.isTV ? 16 : 12,
    paddingHorizontal: Platform.isTV ? 20 : 14,
    color: '#ffffff',
    fontSize: Platform.isTV ? 22 : 16,
  },
});

export default SettingsScreen;
