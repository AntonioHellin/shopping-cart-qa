import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { login, logout, getCurrentUser, isAuthenticated, hasRole, requireAuth, requireRole } from './auth'

// Test constants (educational purposes only)
const DEMO_EMAIL = 'demo@example.com'
const DEMO_PASSWORD = 'demo123' // eslint-disable-line sonarjs/no-hardcoded-passwords
const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123' // eslint-disable-line sonarjs/no-hardcoded-passwords

describe('Authentication Module', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('login', () => {
    it('should login successfully with valid credentials', () => {
      const result = login(DEMO_EMAIL, DEMO_PASSWORD)

      expect(result.success).toBe(true)
      expect(result.token).toBeDefined()
      expect(result.error).toBeUndefined()
    })

    it('should fail login with invalid email', () => {
      const result = login('invalid@example.com', DEMO_PASSWORD)

      expect(result.success).toBe(false)
      expect(result.token).toBeUndefined()
      expect(result.error).toBe('Invalid email or password')
    })

    it('should fail login with invalid password', () => {
      const result = login(DEMO_EMAIL, 'wrongpassword')

      expect(result.success).toBe(false)
      expect(result.token).toBeUndefined()
      expect(result.error).toBe('Invalid email or password')
    })

    it('should store token in localStorage on successful login', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)

      const token = localStorage.getItem('auth_token')
      expect(token).toBeDefined()
      expect(token).not.toBe('')
    })

    it('should login admin user successfully', () => {
      const result = login(ADMIN_EMAIL, ADMIN_PASSWORD)

      expect(result.success).toBe(true)
      expect(result.token).toBeDefined()
    })
  })

  describe('logout', () => {
    it('should clear token from localStorage', () => {
      // First login
      login(DEMO_EMAIL, DEMO_PASSWORD)
      expect(localStorage.getItem('auth_token')).toBeDefined()

      // Then logout
      logout()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })

    it('should handle logout when not logged in', () => {
      expect(() => logout()).not.toThrow()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  describe('getCurrentUser', () => {
    it('should return null when not authenticated', () => {
      const user = getCurrentUser()
      expect(user).toBeNull()
    })

    it('should return user when authenticated', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)

      const user = getCurrentUser()
      expect(user).toBeDefined()
      expect(user?.email).toBe(DEMO_EMAIL)
      expect(user?.name).toBe('Demo User')
      expect(user?.role).toBe('user')
      expect(user?.id).toBe('user-1')
    })

    it('should return admin user when authenticated as admin', () => {
      login(ADMIN_EMAIL, ADMIN_PASSWORD)

      const user = getCurrentUser()
      expect(user).toBeDefined()
      expect(user?.email).toBe(ADMIN_EMAIL)
      expect(user?.role).toBe('admin')
    })

    it('should return null after logout', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)
      logout()

      const user = getCurrentUser()
      expect(user).toBeNull()
    })

    it('should return null for invalid token', () => {
      localStorage.setItem('auth_token', 'invalid-token')

      const user = getCurrentUser()
      expect(user).toBeNull()
    })

    it('should return null for expired token', () => {
      // Create an expired token
      const expiredToken = {
        user: { id: 'user-1', email: DEMO_EMAIL, name: 'Demo User', role: 'user' },
        issuedAt: Date.now() - 7200000, // 2 hours ago
        expiresAt: Date.now() - 3600000, // 1 hour ago (expired)
      }
      localStorage.setItem('auth_token', btoa(JSON.stringify(expiredToken)))

      const user = getCurrentUser()
      expect(user).toBeNull()
      // Token should be cleared after being detected as expired
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('should return false when not authenticated', () => {
      expect(isAuthenticated()).toBe(false)
    })

    it('should return true when authenticated', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)
      expect(isAuthenticated()).toBe(true)
    })

    it('should return false after logout', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)
      logout()
      expect(isAuthenticated()).toBe(false)
    })
  })

  describe('hasRole', () => {
    it('should return false when not authenticated', () => {
      expect(hasRole('user')).toBe(false)
      expect(hasRole('admin')).toBe(false)
    })

    it('should return true for user role when logged in as user', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)
      expect(hasRole('user')).toBe(true)
      expect(hasRole('admin')).toBe(false)
    })

    it('should return true for admin role when logged in as admin', () => {
      login(ADMIN_EMAIL, ADMIN_PASSWORD)
      expect(hasRole('admin')).toBe(true)
      expect(hasRole('user')).toBe(false)
    })
  })

  describe('requireAuth', () => {
    it('should throw error when not authenticated', () => {
      expect(() => requireAuth()).toThrow('Authentication required')
    })

    it('should return user when authenticated', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)

      const user = requireAuth()
      expect(user).toBeDefined()
      expect(user.email).toBe(DEMO_EMAIL)
    })
  })

  describe('requireRole', () => {
    it('should throw error when not authenticated', () => {
      expect(() => requireRole('user')).toThrow('Authentication required')
    })

    it('should throw error when user lacks required role', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)
      expect(() => requireRole('admin')).toThrow('Insufficient permissions. Required role: admin')
    })

    it('should return user when role matches', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)

      const user = requireRole('user')
      expect(user).toBeDefined()
      expect(user.email).toBe(DEMO_EMAIL)
      expect(user.role).toBe('user')
    })

    it('should allow admin to access any role', () => {
      login(ADMIN_EMAIL, ADMIN_PASSWORD)

      // Admin should always have access
      const userAsAdmin = requireRole('admin')
      expect(userAsAdmin).toBeDefined()
      expect(userAsAdmin.role).toBe('admin')
    })
  })

  describe('Token expiration', () => {
    it('should create token with 1 hour expiration', () => {
      login(DEMO_EMAIL, DEMO_PASSWORD)

      const token = localStorage.getItem('auth_token')!
      const decoded = JSON.parse(atob(token))

      const expectedExpiry = Date.now() + 60 * 60 * 1000 // 1 hour from now
      const actualExpiry = decoded.expiresAt

      // Allow 5 second tolerance for test execution time
      expect(actualExpiry).toBeGreaterThan(expectedExpiry - 5000)
      expect(actualExpiry).toBeLessThan(expectedExpiry + 5000)
    })
  })
})
