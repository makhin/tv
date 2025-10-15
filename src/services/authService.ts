// src/services/authService.ts
import { authLogin } from '@/api/generated/auth/auth';
import { authHelpers } from '@/api/client';

const HARDCODED_EMAIL = 'amakhin@gmail.com';
const HARDCODED_PASSWORD = 'Omega0))';

export const authService = {
  autoLogin: async (): Promise<boolean> => {
    try {
      // Проверяем, есть ли уже токен
      const existingToken = await authHelpers.getToken();
      if (existingToken) {
        console.log('Token already exists, skipping login');
        return true;
      }

      // Выполняем логин с захардкоженными credentials
      console.log('Attempting auto-login...');
      const response = await authLogin({
        email: HARDCODED_EMAIL,
        password: HARDCODED_PASSWORD,
        rememberMe: true,
      });
      console.log('Response:', response);

      // response уже содержит data напрямую (customInstance возвращает data)
      if (response?.token) {
        await authHelpers.saveToken(response.token);
        console.log('Auto-login successful');
        return true;
      }

      console.error('Login response did not contain token', response);
      return false;
    } catch (error) {
      console.error('Auto-login failed:', error);
      return false;
    }
  },

  logout: async (): Promise<void> => {
    await authHelpers.removeToken();
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await authHelpers.getToken();
    return !!token;
  },
};
