import { useState } from 'react'

export function TestErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('🔥 Test Error: Sent to Sentry Dashboard for verification!')
  }

  return (
    <button
      onClick={() => setShouldThrow(true)}
      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
      title="Click to trigger a test error to verify Sentry integration"
    >
      <span>🚨</span>
      <span>Test Sentry Error</span>
    </button>
  )
}
