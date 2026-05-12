import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeSentry } from './infrastructure/sentry'

// 🔍 Initialize Sentry error tracking
// Configuration is in src/infrastructure/sentry.ts
initializeSentry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
