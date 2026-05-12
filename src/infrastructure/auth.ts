/**
 * Simulated Authentication System
 *
 * EDUCATIONAL PURPOSES ONLY - NOT FOR PRODUCTION
 *
 * This is a simplified authentication system to demonstrate AuthN/AuthZ concepts
 * without requiring a backend server. In production:
 * - Tokens should be generated/verified by a secure backend
 * - Use httpOnly cookies instead of localStorage
 * - Never store passwords (even fake ones)
 * - Use proper JWT libraries with strong secrets
 *
 * AuthN (Authentication): "Who are you?"
 * AuthZ (Authorization): "What can you do?"
 */

// Simulated user database (in production, this would be a real database)
/* eslint-disable sonarjs/no-hardcoded-passwords */
const MOCK_USERS = {
  'demo@example.com': {
    id: 'user-1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'user' as const,
    password: 'demo123', // NEVER store plaintext passwords in production!
  },
  'admin@example.com': {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const,
    password: 'admin123', // NEVER store plaintext passwords in production!
  },
}
/* eslint-enable sonarjs/no-hardcoded-passwords */

export type User = {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export type AuthToken = {
  user: User
  issuedAt: number
  expiresAt: number
}

const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRY_MS = 60 * 60 * 1000 // 1 hour

/**
 * Simulate JWT token creation
 * In production: use jsonwebtoken library with proper secret
 */
function createToken(user: User): string {
  const token: AuthToken = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    issuedAt: Date.now(),
    expiresAt: Date.now() + TOKEN_EXPIRY_MS,
  }

  // In production: jwt.sign(payload, secret)
  // For demo: just base64 encode (INSECURE!)
  return btoa(JSON.stringify(token))
}

/**
 * Simulate JWT token verification
 * In production: use jwt.verify(token, secret)
 */
function verifyToken(token: string): { valid: boolean; user?: User; reason?: string } {
  try {
    // In production: jwt.verify(token, secret)
    const decoded = JSON.parse(atob(token)) as AuthToken

    // Check expiration
    if (Date.now() > decoded.expiresAt) {
      return { valid: false, reason: 'Token expired' }
    }

    return { valid: true, user: decoded.user }
  } catch {
    return { valid: false, reason: 'Invalid token' }
  }
}

/**
 * Login with email and password
 * Returns token if credentials are valid
 */
export function login(email: string, password: string): { success: boolean; token?: string; error?: string } {
  const user = MOCK_USERS[email as keyof typeof MOCK_USERS]

  if (!user || user.password !== password) {
    return { success: false, error: 'Invalid email or password' }
  }

  const token = createToken(user)

  // ❌ localStorage is vulnerable to XSS attacks
  // ✅ In production: use httpOnly cookies set by backend
  localStorage.setItem(TOKEN_KEY, token)

  return { success: true, token }
}

/**
 * Logout - clear token
 */
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Get current authenticated user
 * Returns null if not authenticated or token expired
 */
export function getCurrentUser(): User | null {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    return null
  }

  const result = verifyToken(token)

  if (!result.valid) {
    // Token invalid/expired, clear it
    logout()
    return null
  }

  return result.user!
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

/**
 * Check if user has a specific role (Authorization)
 */
export function hasRole(role: 'user' | 'admin'): boolean {
  const user = getCurrentUser()
  return user?.role === role
}

/**
 * Require authentication
 * Returns user if authenticated, throws if not
 */
export function requireAuth(): User {
  const user = getCurrentUser()

  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}

/**
 * Require specific role (Authorization)
 * Throws if user doesn't have required role
 */
export function requireRole(role: 'user' | 'admin'): User {
  const user = requireAuth()

  if (user.role !== role && user.role !== 'admin') {
    throw new Error(`Insufficient permissions. Required role: ${role}`)
  }

  return user
}
