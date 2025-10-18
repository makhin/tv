// src/navigation/RootNavigator.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import HomeScreen from '@/screens/HomeScreen';
import DetailScreen from '@/screens/DetailScreen';
import MetadataScreen from '@/screens/MetadataScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { authService } from '@/services/authService';
import { useAppStore, selectCredentials, selectTheme } from '@/store/useAppStore';
import { personsGetAll } from '@/api/generated/persons/persons';
import { getTags } from '@/api/generated/tags/tags';
import {
  ThemeProvider,
  getThemePalette,
  isDarkTheme,
  type ThemePalette,
} from '@/config/theme';

export type RootStackParamList = {
  Home: undefined;
  Detail: { photoId: number; photoIds: number[] };
  Metadata: { photoId: number; photoIds: number[] };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { setPersons, setTags } = useAppStore((state) => ({
    setPersons: state.setPersons,
    setTags: state.setTags,
  }));
  const credentials = useAppStore(selectCredentials);
  const themeName = useAppStore(selectTheme);
  const palette = useMemo(() => getThemePalette(themeName), [themeName]);
  const styles = useMemo(() => createStyles(palette), [palette]);
  const navigationTheme = useMemo(() => {
    const baseTheme = isDarkTheme(themeName) ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: palette.background,
        card: palette.surface,
        text: palette.textPrimary,
        border: palette.border,
        primary: palette.accent,
      },
    };
  }, [palette, themeName]);

  const loadReferenceData = useCallback(async () => {
    try {
      // Загружаем persons и tags параллельно
      const [personsData, tagsData] = await Promise.all([
        personsGetAll(),
        getTags(),
      ]);

      console.log('Loaded persons:', personsData.length);
      console.log('Loaded tags:', tagsData.length);

      setPersons(personsData);
      setTags(tagsData);
    } catch (error) {
      console.error('Error loading reference data:', error);
      // Не блокируем приложение, если не удалось загрузить справочники
    }
  }, [setPersons, setTags]);

  const initializeApp = useCallback(async () => {
    try {
      setIsLoading(true);
      // 1. Авторизация
      const authSuccess = await authService.autoLogin(credentials);
      if (!authSuccess) {
        setAuthError('Не удалось авторизоваться');
        return;
      }

      // 2. Загрузка справочников
      await loadReferenceData();
    } catch (error) {
      console.error('App initialization error:', error);
      setAuthError('Ошибка инициализации');
    } finally {
      setIsLoading(false);
    }
  }, [credentials, loadReferenceData]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const content = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.activityIndicator} />
          <Text style={styles.loadingText}>Загрузка...</Text>
        </View>
      );
    }

    if (authError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{authError}</Text>
        </View>
      );
    }

    return (
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: Platform.isTV ? 'fade' : 'default',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Photobank' }} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: 'Photo' }}
          />
          <Stack.Screen
            name="Metadata"
            component={MetadataScreen}
            options={{ title: 'Photo Metadata' }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return <ThemeProvider theme={themeName}>{content()}</ThemeProvider>;
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: Platform.isTV ? 24 : 16,
      color: theme.textMuted,
    },
    errorContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    errorText: {
      fontSize: Platform.isTV ? 28 : 18,
      color: theme.danger,
      textAlign: 'center',
    },
  });
