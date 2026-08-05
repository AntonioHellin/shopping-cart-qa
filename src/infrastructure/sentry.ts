import * as Sentry from '@sentry/react'

export const SENTRY_DSN =
  'https://19225d5d17e30ef55eee20e658bdcbf9@o4511859633160192.ingest.de.sentry.io/4511859637026896'

export function initSentry(): void {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    // Capture 100% of transactions for performance monitoring in dev/demo
    tracesSampleRate: 1.0,
    // Enable session replay / error sampling if needed
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE || 'development',
  })
}

export function logErrorToSentry(error: unknown, context?: Record<string, unknown>): void {
  Sentry.withScope(scope => {
    if (context) {
      scope.setExtras(context)
    }
    Sentry.captureException(error)
  })
}
