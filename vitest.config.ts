import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['node_modules', 'e2e'],
    coverage: {
      provider: 'v8',
      clean: false,
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        'e2e/',
        '*.config.ts',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        // 🏗️ INFRASTRUCTURE TIER (0%): TypeScript validates, no logic to test
        'src/shared/types/**',
      ],
      thresholds: {
        // Global baseline for non-critical code
        global: {
          functions: 100,
          lines: 80,
          branches: 80,
          statements: 80,
        },
        // 🎯 CORE TIER (100%): Business logic that handles money/critical data
        'src/shared/utils/calculateSubtotal.ts': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
        'src/shared/utils/formatPrice.ts': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
        'src/shared/strategies/DiscountStrategy.ts': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
        'src/shared/strategies/DiscountCalculator.ts': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
        // 🔧 IMPORTANT TIER (80%+): User-facing features
        'src/features/**/*.tsx': {
          statements: 80,
          functions: 90,
          lines: 80,
        },
      },
    },
  },
})
