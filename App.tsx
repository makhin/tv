// App.tsx
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={Platform.isTV ? 'light-content' : 'dark-content'}
        hidden={Platform.isTV}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;