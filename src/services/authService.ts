// src/services/authService.ts
import { authLogin } from '@/api/generated/auth/auth';
import { authHelpers } from '@/api/client';
import { authConfig, type AuthCredentials } from '@/config/authConfig';
import { useAppStore, selectCredentials, type CredentialsState } from '@/store/useAppStore';

type AutoLoginInput = Partial<AuthCredentials> & Partial<CredentialsState>;

const normalizeCredentials = (
  credentials?: AutoLoginInput | null
): (AuthCredentials & { rememberMe?: boolean }) | null => {
  if (!credentials) {
    return null;
  }

  const email = credentials.email?.trim() ?? credentials.username?.trim();
  const password = credentials.password?.trim();

  if (!email || !password) {
    return null;
  }

  return {
    email,
    password,
    rememberMe: credentials.rememberMe,
  };
};

export const authService = {
  autoLogin: async (credentials?: AutoLoginInput): Promise<boolean> => {
    try {
      // Проверяем, есть ли уже токен
      const existingToken = await authHelpers.getToken();
      if (existingToken) {
        console.log('Token already exists, skipping login');
        return true;
      }

      const storedCredentials = normalizeCredentials(
        selectCredentials(useAppStore.getState())
      );

      const providedCredentials = normalizeCredentials(credentials);

      const resolvedCredentials =
        storedCredentials ??
        providedCredentials ??
        normalizeCredentials(authConfig.loadEnvironmentCredentials());

      if (!resolvedCredentials?.email || !resolvedCredentials?.password) {
        console.warn('Auto-login aborted: credentials are not available');
        return false;
      }

      const rememberMe =
        resolvedCredentials.rememberMe ?? true;

      // Выполняем логин с безопасно полученными credentials
      console.log('Attempting auto-login...');
      const response = await authLogin({
        email: resolvedCredentials.email,
        password: resolvedCredentials.password,
        rememberMe,
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
