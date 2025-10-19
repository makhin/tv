// src/screens/SettingsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';
import { authService } from '@/services/authService';
import { personsGetAll } from '@/api/generated/persons/persons';
import { getTags } from '@/api/generated/tags/tags';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const storedUsername = useAppStore((state) => state.credentials.username);
  const storedPassword = useAppStore((state) => state.credentials.password);
  const persistCredentials = useAppStore((state) => state.setCredentials);
  const setPersons = useAppStore((state) => state.setPersons);
  const setTags = useAppStore((state) => state.setTags);

  const [username, setUsername] = useState(storedUsername);
  const [password, setPassword] = useState(storedPassword);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername(storedUsername);
    setPassword(storedPassword);
  }, [storedUsername, storedPassword]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSaveCredentials = async () => {
    const normalizedUsername = username.trim();
    if (!normalizedUsername) {
      Alert.alert('Ошибка', 'Имя пользователя не может быть пустым.');
      return;
    }

    if (!password) {
      Alert.alert('Ошибка', 'Пароль не может быть пустым.');
      return;
    }

    setIsLoading(true);

    try {
      // Сохраняем credentials в store
      persistCredentials({
        username: normalizedUsername,
        password,
      });

      // Пытаемся залогиниться
      const authResult = await authService.autoLogin({
        username: normalizedUsername,
        password,
      });

      if (authResult.status === 'success') {
        // Загружаем справочники
        try {
          const [personsData, tagsData] = await Promise.all([personsGetAll(), getTags()]);
          setPersons(personsData);
          setTags(tagsData);
        } catch (error) {
          console.error('Error loading reference data:', error);
        }

        // Переходим на главный экран
        navigation.replace('Home');
      } else {
        const message =
          authResult.message ?? 'Не удалось авторизоваться. Проверьте учетные данные.';
        Alert.alert('Ошибка авторизации', message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Ошибка', 'Произошла ошибка при авторизации.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
            <FocusableButton
              title={isLoading ? 'Вход...' : 'Сохранить'}
              onPress={handleSaveCredentials}
              disabled={isLoading}
            />
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
  },
  content: {
    padding: Platform.isTV ? 21 : 11,
  },
  section: {
    backgroundColor: '#1f2937',
    padding: Platform.isTV ? 16 : 11,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? 19 : 13,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 11,
  },
  infoText: {
    fontSize: Platform.isTV ? 13 : 9,
    color: '#e5e7eb',
    lineHeight: Platform.isTV ? 21 : 15,
    marginBottom: 5,
  },
  buttonSpacing: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 11,
  },
  label: {
    fontSize: Platform.isTV ? 15 : 11,
    color: '#e5e7eb',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: Platform.isTV ? 11 : 8,
    paddingHorizontal: Platform.isTV ? 13 : 9,
    color: '#ffffff',
    fontSize: Platform.isTV ? 15 : 11,
  },
});

export default SettingsScreen;
