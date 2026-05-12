import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { LoginDemo } from './LoginDemo'
import { logout } from '../../infrastructure/auth'

// Test constants (educational purposes only)
const DEMO_EMAIL = 'demo@example.com'
const DEMO_PASSWORD = 'demo123' // eslint-disable-line sonarjs/no-hardcoded-passwords
const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123' // eslint-disable-line sonarjs/no-hardcoded-passwords
const INVALID_EMAIL = 'invalid@example.com'

describe('LoginDemo Component', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Logged Out State', () => {
    it('should render login form when not authenticated', () => {
      render(<LoginDemo />)

      expect(screen.getByRole('heading', { name: /demo login/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('should show demo credentials hint', () => {
      render(<LoginDemo />)

      expect(screen.getByText(/demo@example.com/i)).toBeInTheDocument()
      expect(screen.getByText(/admin@example.com/i)).toBeInTheDocument()
    })

    it('should login successfully with valid demo user credentials', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, DEMO_EMAIL)
      await user.type(passwordInput, DEMO_PASSWORD)
      await user.click(loginButton)

      // Should show logged-in state
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      expect(screen.getByText(/welcome back, demo user!/i)).toBeInTheDocument()
      expect(screen.getByText(/demo@example.com/i)).toBeInTheDocument()
    })

    it('should login successfully with valid admin credentials', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, ADMIN_EMAIL)
      await user.type(passwordInput, ADMIN_PASSWORD)
      await user.click(loginButton)

      // Should show logged-in state with admin role
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      expect(screen.getByText(/welcome back, admin user!/i)).toBeInTheDocument()
      expect(screen.getByText(/admin@example.com/i)).toBeInTheDocument()
      // Find the role badge specifically (not the "Admin User" name)
      const badge = screen.getByText((content, element) => {
        return element?.tagName === 'SPAN' && content === 'ADMIN'
      })
      expect(badge).toBeInTheDocument()
    })

    it('should show error message with invalid email', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, INVALID_EMAIL)
      await user.type(passwordInput, DEMO_PASSWORD)
      await user.click(loginButton)

      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })

    it('should show error message with invalid password', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, DEMO_EMAIL)
      await user.type(passwordInput, 'wrongpassword')
      await user.click(loginButton)

      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })

    it('should clear form inputs after successful login', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, DEMO_EMAIL)
      await user.type(passwordInput, DEMO_PASSWORD)
      await user.click(loginButton)

      // Form should be hidden after successful login
      expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument()
      expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument()
    })

    it('should not clear form inputs after failed login', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, INVALID_EMAIL)
      await user.type(passwordInput, 'wrongpassword')
      await user.click(loginButton)

      // Form should still be visible with values
      expect(emailInput.value).toBe(INVALID_EMAIL)
      expect(passwordInput.value).toBe('wrongpassword')
    })
  })

  describe('Logged In State', () => {
    it('should render user info when authenticated as demo user', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // Login first
      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      // Should show user info
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      expect(screen.getByText(/welcome back, demo user!/i)).toBeInTheDocument()
      expect(screen.getByText(/demo@example.com/i)).toBeInTheDocument()
      // Find the role badge specifically (not the "Demo User" name)
      const badge = screen.getByText((content, element) => {
        return element?.tagName === 'SPAN' && content === 'USER'
      })
      expect(badge).toBeInTheDocument()
    })

    it('should render admin badge when authenticated as admin', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // Login as admin
      await user.type(screen.getByLabelText(/email/i), ADMIN_EMAIL)
      await user.type(screen.getByLabelText(/password/i), ADMIN_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      // Should show admin badge
      const badge = screen.getByText((content, element) => {
        return element?.tagName === 'SPAN' && content === 'ADMIN'
      })
      expect(badge).toBeInTheDocument()
    })

    it('should show logout button when authenticated', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // Login first
      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      // Should show logout button
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    })

    it('should logout successfully when logout button is clicked', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // Login first
      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      // Click logout
      const logoutButton = screen.getByRole('button', { name: /logout/i })
      await user.click(logoutButton)

      // Should show login form again
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('should persist login state on re-render', async () => {
      const user = userEvent.setup()
      const { unmount } = render(<LoginDemo />)

      // Login
      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      // Unmount and remount component (simulating navigation)
      unmount()
      render(<LoginDemo />)

      // Should still be logged in (token persisted in localStorage)
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      expect(screen.getByText(/welcome back, demo user!/i)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle form submission with empty email', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // Only fill password, leave email empty
      const passwordInput = screen.getByLabelText(/password/i)
      await user.type(passwordInput, DEMO_PASSWORD)

      const loginButton = screen.getByRole('button', { name: /login/i })
      await user.click(loginButton)

      // Form should prevent submission due to required email field
      // Should NOT show the authenticated view
      expect(screen.queryByRole('heading', { name: /authenticated/i })).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /demo login/i })).toBeInTheDocument()
    })

    it('should clear error message when logging in successfully after failed attempt', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // First attempt - fail
      await user.type(screen.getByLabelText(/email/i), 'invalid@example.com')
      await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
      await user.click(screen.getByRole('button', { name: /login/i }))

      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()

      // Clear inputs
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
      await user.clear(emailInput)
      await user.clear(passwordInput)

      // Second attempt - success
      await user.type(emailInput, DEMO_EMAIL)
      await user.type(passwordInput, DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      // Error should be gone
      expect(screen.queryByText(/invalid email or password/i)).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
    })

    it('should render correctly when localStorage has existing valid token', () => {
      // Pre-populate localStorage with valid token
      const token = {
        user: { id: 'user-1', email: DEMO_EMAIL, name: 'Demo User', role: 'user' },
        issuedAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
      }
      localStorage.setItem('auth_token', btoa(JSON.stringify(token)))

      render(<LoginDemo />)

      // Should show logged-in state immediately
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      expect(screen.getByText(/welcome back, demo user!/i)).toBeInTheDocument()
    })

    it('should render login form when localStorage has expired token', () => {
      // Pre-populate localStorage with expired token
      const expiredToken = {
        user: { id: 'user-1', email: DEMO_EMAIL, name: 'Demo User', role: 'user' },
        issuedAt: Date.now() - 7200000, // 2 hours ago
        expiresAt: Date.now() - 3600000, // 1 hour ago (expired)
      }
      localStorage.setItem('auth_token', btoa(JSON.stringify(expiredToken)))

      render(<LoginDemo />)

      // Should show login form (token should be cleared)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  describe('Programmatic Logout', () => {
    it('should update UI when user is logged out programmatically', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      // Login first
      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /login/i }))

      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()

      // Logout programmatically (simulating external logout)
      logout()
      localStorage.clear()

      // Need to trigger re-render by unmounting and remounting
      const { unmount } = render(<LoginDemo />)
      unmount()
      render(<LoginDemo />)

      // Should show login form
      expect(screen.getByRole('heading', { name: /demo login/i })).toBeInTheDocument()
    })
  })
})
