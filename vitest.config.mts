import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    environmentMatchGlobs: [
      ['tests/e2e/**/*.test.tsx', 'node'],
      ['tests/unit/__tests__/services/**/*.test.ts', 'node'],
    ],
    alias: {
      '@': path.resolve(__dirname),
      '@features': path.resolve(__dirname, 'features'),
      '@shared': path.resolve(__dirname, 'shared'),
      'next/font/local': path.resolve(__dirname, 'tests/mocks/nextFontLocalMock.ts'),
    },
    globals: true,
    include: ['tests/unit/**/*.test.tsx', 'tests/unit/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
  },
});
