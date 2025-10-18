// App.tsx
import React, { useMemo } from 'react';
import { StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from './src/navigation/RootNavigator';
import { queryClient } from '@/api';
import { selectTheme, useAppStore } from '@/store/useAppStore';
import { getThemePalette } from '@/config/theme';

const App: React.FC = () => {
  const themeName = useAppStore(selectTheme);
  const palette = useMemo(() => getThemePalette(themeName), [themeName]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={palette.statusBarStyle}
            backgroundColor={palette.background}
            hidden={Platform.isTV}
          />
          <RootNavigator />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
