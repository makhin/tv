// src/screens/SettingsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { FocusableButton } from '@/components/FocusableButton';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const storedUsername = useAppStore((state) => state.credentials.username);
  const storedPassword = useAppStore((state) => state.credentials.password);
  const persistCredentials = useAppStore((state) => state.setCredentials);

  const [username, setUsername] = useState(storedUsername);
  const [password, setPassword] = useState(storedPassword);

  useEffect(() => {
    setUsername(storedUsername);
    setPassword(storedPassword);
  }, [storedUsername, storedPassword]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
            <FocusableButton title="Сохранить" onPress={handleSaveCredentials} />
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
