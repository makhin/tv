import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.tsx'],
  },
});
