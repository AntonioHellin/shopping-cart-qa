import { useState } from 'react'
import { login, logout, getCurrentUser, type User } from '@/infrastructure/auth'

// ✅ Usable Forms Pattern: Track field-level validation state
type FieldError = {
  email?: string
  password?: string
}

export function LoginDemo() {
  const [user, setUser] = useState<User | null>(getCurrentUser())
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldError>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // ✅ Real-time validation: Validate individual field
  const validateEmail = (value: string): string | undefined => {
    if (!value) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address'
    }
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return 'Password is required'
    if (value.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return undefined
  }

  // ✅ Progressive validation: Only show errors after user touches field
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (touched.email) {
      const emailError = validateEmail(value)
      setFieldErrors(prev => ({ ...prev, email: emailError }))
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (touched.password) {
      const passwordError = validatePassword(value)
      setFieldErrors(prev => ({ ...prev, password: passwordError }))
    }
  }

  // ✅ Mark field as touched on blur
  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }))

    // Validate on blur
    if (field === 'email') {
      const emailError = validateEmail(email)
      setFieldErrors(prev => ({ ...prev, email: emailError }))
    } else {
      const passwordError = validatePassword(password)
      setFieldErrors(prev => ({ ...prev, password: passwordError }))
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Mark all fields as touched
    setTouched({ email: true, password: true })

    // Validate all fields
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    setFieldErrors({ email: emailError, password: passwordError })

    // Don't submit if there are validation errors
    if (emailError || passwordError) {
      return
    }

    // ✅ Loading state: Show spinner during async operation
    setIsLoading(true)

    // Simulate async login (real apps would have network delay)
    await new Promise(resolve => setTimeout(resolve, 800))

    const result = login(email, password)

    setIsLoading(false)

    if (result.success) {
      // ✅ Success state: Show success message before transition
      setShowSuccess(true)

      setTimeout(() => {
        setUser(getCurrentUser())
        setEmail('')
        setPassword('')
        setFieldErrors({})
        setTouched({})
        setShowSuccess(false)
      }, 1000)
    } else {
      setError(result.error || 'Login failed')
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  if (user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Authenticated</h3>
            <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              user.role === 'admin'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {user.role.toUpperCase()}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Demo Login</h3>
      <p className="text-sm text-gray-600 mb-4">
        Try demo credentials (educational purposes only):
      </p>
      <div className="bg-gray-50 p-3 rounded-lg text-xs mb-4 space-y-1">
        <p>
          <strong>User:</strong> demo@example.com / demo123
        </p>
        <p>
          <strong>Admin:</strong> admin@example.com / admin123
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4" noValidate>
        {/* ✅ Email Field with Inline Validation */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              fieldErrors.email
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="demo@example.com"
            disabled={isLoading}
          />
          {/* ✅ Inline Error Message */}
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 flex items-start gap-1">
              <span className="text-base" aria-hidden="true">⚠️</span>
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>

        {/* ✅ Password Field with Inline Validation */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => handlePasswordChange(e.target.value)}
            onBlur={() => handleBlur('password')}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              fieldErrors.password
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="demo123"
            disabled={isLoading}
          />
          {/* ✅ Inline Error Message */}
          {fieldErrors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600 flex items-start gap-1">
              <span className="text-base" aria-hidden="true">⚠️</span>
              <span>{fieldErrors.password}</span>
            </p>
          )}
        </div>

        {/* ✅ Form-level Error Message */}
        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
          >
            <span className="text-lg" aria-hidden="true">❌</span>
            <span>{error}</span>
          </div>
        )}

        {/* ✅ Success Message */}
        {showSuccess && (
          <div
            role="status"
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
          >
            <span className="text-lg" aria-hidden="true">✅</span>
            <span>Login successful! Redirecting...</span>
          </div>
        )}

        {/* ✅ Submit Button with Loading State */}
        <button
          type="submit"
          disabled={isLoading || showSuccess}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isLoading || showSuccess
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          } text-white`}
        >
          {isLoading && (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Logging in...</span>
            </>
          )}
          {showSuccess && <span>Success!</span>}
          {!isLoading && !showSuccess && <span>Login</span>}
        </button>
      </form>
    </div>
  )
}
