// src/store/useAppStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Типы для стора
interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  // State
  user: User | null;
  theme: 'light' | 'dark';
  isLoading: boolean;
  focusedItemId: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setIsLoading: (isLoading: boolean) => void;
  setFocusedItemId: (id: string | null) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  theme: 'dark' as const,
  isLoading: false,
  focusedItemId: null,
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setUser: (user) => set({ user }, false, 'setUser'),
        
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        
        setIsLoading: (isLoading) => set({ isLoading }, false, 'setIsLoading'),
        
        setFocusedItemId: (focusedItemId) =>
          set({ focusedItemId }, false, 'setFocusedItemId'),
        
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'app-storage',
        storage: {
          getItem: async (name) => {
            const value = await AsyncStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          },
          setItem: async (name, value) => {
            await AsyncStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: async (name) => {
            await AsyncStorage.removeItem(name);
          },
        },
      }
    ),
    { name: 'AppStore' }
  )
);

// Селекторы для оптимизации перерендеров
export const selectUser = (state: AppState) => state.user;
export const selectTheme = (state: AppState) => state.theme;
export const selectIsLoading = (state: AppState) => state.isLoading;
export const selectFocusedItemId = (state: AppState) => state.focusedItemId;