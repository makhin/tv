// src/navigation/RootNavigator.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import HomeScreen from '@/screens/HomeScreen';
import DetailScreen from '@/screens/DetailScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { authService } from '@/services/authService';

export type RootStackParamList = {
  Home: undefined;
  Detail: { previewUrl: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    performAutoLogin();
  }, []);

  const performAutoLogin = async () => {
    try {
      const success = await authService.autoLogin();
      if (!success) {
        setAuthError('Не удалось авторизоваться');
      }
    } catch (error) {
      console.error('Auto-login error:', error);
      setAuthError('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Авторизация...</Text>
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          animation: Platform.isTV ? 'fade' : 'default',
          headerTitleStyle: {
            fontSize: Platform.isTV ? 32 : 20,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Photobank' }} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Photo' }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: Platform.isTV ? 24 : 16,
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
    fontSize: Platform.isTV ? 28 : 18,
    color: '#ef4444',
    textAlign: 'center',
  },
});
