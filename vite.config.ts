import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  server: {
    // 🔧 Sentry Tunnel Proxy - Solves CORS and ad-blocker issues
    // Students: Replace with your own Sentry project values from DSN
    // DSN format: https://[KEY]@o[ORG-ID].ingest.[REGION].sentry.io/[PROJECT-ID]
    proxy: {
      '/tunnel': {
        // Students: Replace with your actual org ID and region from Sentry DSN
        target: 'https://o4508888888888888.ingest.us.sentry.io',
        changeOrigin: true,
        // Students: Replace PROJECT-ID with your actual project ID
        rewrite: () => '/api/4508888888888888/envelope/',
      },
    },
  },
})
