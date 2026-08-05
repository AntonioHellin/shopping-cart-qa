import * as Sentry from '@sentry/react'

export function TestErrorButton() {
  const handleClick = () => {
    Sentry.setUser({ id: 'test-user', email: 'test@example.com' })
    Sentry.captureException(new Error('Test error from button'))
    console.log('Error sent to Sentry')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
    >
      <span>🚨</span>
      <span>Test Error</span>
    </button>
  )
}

export default TestErrorButton
