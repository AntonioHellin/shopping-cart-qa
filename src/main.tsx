import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'

Sentry.init({
  dsn: 'https://19225d5d17e30ef55eee20e658bdcbf9@o4511859633160192.ingest.de.sentry.io/4511859637026896',
  tunnel: import.meta.env.DEV ? '/tunnel' : undefined,
  environment: import.meta.env.DEV ? 'development' : 'production',
  debug: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
