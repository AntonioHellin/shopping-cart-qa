import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeSentry } from './infrastructure/sentry'
import { SentryErrorBoundary } from './infrastructure/SentryErrorBoundary'
import { validateEnv } from './infrastructure/env'

// 🔐 Validate environment variables before starting app
// Fails fast with clear error if config is invalid
validateEnv()

// 🔍 Initialize Sentry error tracking
// Configuration is in src/infrastructure/sentry.ts
initializeSentry()

// ♿ Initialize axe-core accessibility testing in development
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    import('react-dom').then((ReactDOM) => {
      axe.default(React, ReactDOM, 1000)
      console.log('♿ axe-core accessibility testing enabled')
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SentryErrorBoundary>
      <App />
    </SentryErrorBoundary>
  </StrictMode>,
)
