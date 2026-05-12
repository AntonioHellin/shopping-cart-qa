import { useState } from 'react'
import { login, logout, getCurrentUser, type User } from '@/infrastructure/auth'

export function LoginDemo() {
  const [user, setUser] = useState<User | null>(getCurrentUser())
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = login(email, password)

    if (result.success) {
      setUser(getCurrentUser())
      setEmail('')
      setPassword('')
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

      <form onSubmit={handleLogin} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="demo@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="demo123"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Login
        </button>
      </form>
    </div>
  )
}
