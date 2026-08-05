import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Sentry DSN parameters for tunnel proxy
const SENTRY_ORG_ID = 'o4511859633160192'
const SENTRY_REGION = 'de'
const SENTRY_PROJECT_ID = '4511859637026896'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@context': path.resolve(__dirname, './src/context'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
    },
  },
  server: {
    proxy: {
      '/tunnel': {
        target: `https://${SENTRY_ORG_ID}.ingest.${SENTRY_REGION}.sentry.io/api/${SENTRY_PROJECT_ID}/envelope/`,
        changeOrigin: true,
        rewrite: (pathStr) => pathStr.replace(/^\/tunnel/, ''),
      },
    },
  },
})
