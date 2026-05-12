import * as Sentry from '@sentry/react'
import type { ReactNode } from 'react'

interface SentryErrorBoundaryProps {
  children: ReactNode
}

/**
 * SentryErrorBoundary - Graceful error handling with Sentry
 *
 * Wraps the application to:
 * - Catch React errors automatically
 * - Send errors to Sentry dashboard
 * - Show user-friendly fallback UI
 * - Allow user to report feedback
 */
export function SentryErrorBoundary({ children }: SentryErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We've been notified and are working on a fix. Please try again.
            </p>
            <details className="text-left mb-4">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error details
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {error instanceof Error ? error.message : String(error)}
              </pre>
            </details>
            <button
              onClick={resetError}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      showDialog // Shows user feedback dialog on error
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}
