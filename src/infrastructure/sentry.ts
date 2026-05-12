import * as Sentry from '@sentry/react'

// 🔍 SENTRY CONFIGURATION
// Students: Replace DSN with your own from sentry.io dashboard
// 1. Create free account at https://sentry.io/signup/
// 2. Create new React project
// 3. Copy DSN from project settings
// 4. Update vite.config.ts proxy with your org/project IDs

const SENTRY_DSN =
  'https://examplekey@o4508888888888888.ingest.us.sentry.io/4508888888888888'

/**
 * Initialize Sentry error tracking
 *
 * This setup includes:
 * - Tunnel proxy to avoid CORS and ad-blockers in development
 * - Performance monitoring with browser tracing
 * - Session replay to reproduce bugs
 * - beforeSend hook to filter noise
 */
export function initializeSentry() {
  if (import.meta.env.DEV) {
    console.log('🔍 Initializing Sentry with DSN:', SENTRY_DSN.slice(0, 30) + '...')
  }

  Sentry.init({
    // 📍 DSN - Data Source Name (identifies your Sentry project)
    dsn: SENTRY_DSN,

    // 🔧 Tunnel - Proxy to avoid CORS and ad-blocker issues in development
    // In production, requests go directly to Sentry (no tunnel needed)
    tunnel: import.meta.env.DEV ? '/tunnel' : undefined,

    // 🌍 Environment - Separate dev errors from production
    environment: import.meta.env.DEV ? 'development' : 'production',

    // 📦 Release - Track which version has the error
    release: 'ai-course@1.0.0',

    // 🐛 Debug - Detailed logs in development console
    debug: import.meta.env.DEV,

    // 📊 Sample Rates - Performance monitoring
    // 1.0 = 100% in dev (test everything)
    // 0.1 = 10% in prod (save costs, Sentry has usage limits)
    tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
    profilesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,

    // 🎥 Session Replay - Record user sessions
    replaysSessionSampleRate: import.meta.env.DEV ? 1.0 : 0.1, // 100% sessions in dev
    replaysOnErrorSampleRate: 1.0, // 100% sessions when error occurs

    // 🔌 Integrations
    integrations: [
      // 📊 Performance Monitoring: Core Web Vitals + RUM
      // Tracks LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
      // Real User Monitoring captures actual user experience, not synthetic tests
      Sentry.browserTracingIntegration({
        enableLongTask: true, // Detect tasks that block UI (>50ms)
        enableInp: true, // Interaction to Next Paint (Core Web Vital)
      }),
      // Session replay (record user actions like a video)
      Sentry.replayIntegration({
        maskAllText: false, // Show text (set true for sensitive data)
        maskAllInputs: false, // Show inputs (set true for passwords/credit cards)
        blockAllMedia: false, // Show images/videos
      }),
    ],

    // 🎣 beforeSend Hook - Filter or modify events before sending to Sentry
    beforeSend(event) {
      // Log events in development for debugging
      if (import.meta.env.DEV) {
        console.log('🔍 Sending event to Sentry via tunnel:', event)
      }

      // Filter out noise: ResizeObserver errors (common browser quirk, not real bugs)
      if (event.message?.includes('ResizeObserver')) {
        return null // Don't send to Sentry
      }

      // Filter out development-only errors
      if (import.meta.env.DEV && event.message?.includes('HMR')) {
        return null // Hot Module Replacement errors are not relevant
      }

      return event // Send to Sentry
    },
  })

  // 👤 Set user context (identifies who experienced the error)
  // In production, you'd get this from your auth system
  Sentry.setUser({
    id: import.meta.env.DEV ? 'dev-user' : undefined,
    email: import.meta.env.DEV ? 'dev@example.com' : undefined,
    username: import.meta.env.DEV ? 'Developer' : undefined,
  })

  // 🍞 Add test breadcrumb to verify setup
  if (import.meta.env.DEV) {
    Sentry.addBreadcrumb({
      message: 'Sentry initialized successfully',
      category: 'app.lifecycle',
      level: 'info',
    })
    console.log('✅ Sentry initialized')
    console.log('🔍 Test breadcrumb added')
  }
}
