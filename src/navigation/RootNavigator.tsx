// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

// ������ �������
import HomeScreen from '@/screens/HomeScreen';
import DetailScreen from '@/screens/DetailScreen';
import SettingsScreen from '@/screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: { itemId: string; title: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          animation: Platform.isTV ? 'fade' : 'default',
          // TV-����������� ���������
          headerTitleStyle: {
            fontSize: Platform.isTV ? 32 : 20,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '�������' }} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '���������' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
