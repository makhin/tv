import React, { createContext, useContext, useMemo } from 'react';

export type ThemeName = 'light' | 'dark';

export interface ThemePalette {
  mode: ThemeName;
  background: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  overlay: string;
  border: string;
  borderMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverted: string;
  accent: string;
  accentMuted: string;
  accentContrast: string;
  danger: string;
  warning: string;
  success: string;
  placeholder: string;
  buttonBackground: string;
  buttonFocusedBackground: string;
  buttonText: string;
  buttonFocusedText: string;
  buttonFocusedBorder: string;
  buttonFocusedShadow: string;
  tagBackground: string;
  tagText: string;
  personTagBackground: string;
  personTagText: string;
  nsfwBackground: string;
  listItemBackground: string;
  listItemFocusedBackground: string;
  listItemFocusedBorder: string;
  thumbnailBackground: string;
  separator: string;
  statusBarStyle: 'light-content' | 'dark-content';
  activityIndicator: string;
  inputBackground: string;
  inputBorder: string;
  inputText: string;
}

const themePalettes: Record<ThemeName, ThemePalette> = {
  dark: {
    mode: 'dark',
    background: '#0f172a',
    surface: '#111827',
    surfaceAlt: '#1f2937',
    card: '#1f2937',
    overlay: 'rgba(15, 23, 42, 0.75)',
    border: '#1e293b',
    borderMuted: '#27364b',
    textPrimary: '#f9fafb',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    textInverted: '#020617',
    accent: '#3b82f6',
    accentMuted: '#2563eb',
    accentContrast: '#ffffff',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#22c55e',
    placeholder: '#64748b',
    buttonBackground: '#2563eb',
    buttonFocusedBackground: '#1d4ed8',
    buttonText: '#f8fafc',
    buttonFocusedText: '#f8fafc',
    buttonFocusedBorder: '#f8fafc',
    buttonFocusedShadow: '#60a5fa',
    tagBackground: '#065f46',
    tagText: '#a7f3d0',
    personTagBackground: '#1e3a8a',
    personTagText: '#93c5fd',
    nsfwBackground: '#ef4444',
    listItemBackground: '#1f2937',
    listItemFocusedBackground: '#334155',
    listItemFocusedBorder: '#3b82f6',
    thumbnailBackground: '#0f172a',
    separator: '#475569',
    statusBarStyle: 'light-content',
    activityIndicator: '#3b82f6',
    inputBackground: '#0f172a',
    inputBorder: '#1e293b',
    inputText: '#e2e8f0',
  },
  light: {
    mode: 'light',
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceAlt: '#f1f5f9',
    card: '#ffffff',
    overlay: 'rgba(241, 245, 249, 0.85)',
    border: '#cbd5f5',
    borderMuted: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#1f2937',
    textMuted: '#475569',
    textInverted: '#f8fafc',
    accent: '#2563eb',
    accentMuted: '#1d4ed8',
    accentContrast: '#f8fafc',
    danger: '#dc2626',
    warning: '#d97706',
    success: '#16a34a',
    placeholder: '#94a3b8',
    buttonBackground: '#2563eb',
    buttonFocusedBackground: '#1d4ed8',
    buttonText: '#f8fafc',
    buttonFocusedText: '#f8fafc',
    buttonFocusedBorder: '#2563eb',
    buttonFocusedShadow: '#93c5fd',
    tagBackground: '#bbf7d0',
    tagText: '#14532d',
    personTagBackground: '#bfdbfe',
    personTagText: '#1e3a8a',
    nsfwBackground: '#dc2626',
    listItemBackground: '#ffffff',
    listItemFocusedBackground: '#e2e8f0',
    listItemFocusedBorder: '#2563eb',
    thumbnailBackground: '#e2e8f0',
    separator: '#94a3b8',
    statusBarStyle: 'dark-content',
    activityIndicator: '#2563eb',
    inputBackground: '#ffffff',
    inputBorder: '#cbd5e1',
    inputText: '#0f172a',
  },
};

const ThemeContext = createContext<ThemePalette>(themePalettes.dark);

export const ThemeProvider: React.FC<{ theme: ThemeName; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  const palette = useMemo(() => themePalettes[theme], [theme]);

  return <ThemeContext.Provider value={palette}>{children}</ThemeContext.Provider>;
};

export const useThemePalette = () => useContext(ThemeContext);

export const getThemePalette = (theme: ThemeName): ThemePalette => themePalettes[theme];

export const isDarkTheme = (theme: ThemeName) => theme === 'dark';
