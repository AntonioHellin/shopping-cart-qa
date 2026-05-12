import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { LoginDemo } from './LoginDemo'
import { logout } from '../../infrastructure/auth'

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear()
})

// Test constants (educational purposes only)
const DEMO_EMAIL = 'demo@example.com'
const DEMO_PASSWORD = 'demo123' // eslint-disable-line sonarjs/no-hardcoded-passwords
const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123' // eslint-disable-line sonarjs/no-hardcoded-passwords
const INVALID_EMAIL = 'invalid@example.com'

describe('LoginDemo Component', () => {
  describe('Logged Out State', () => {
    it('should render login form when not authenticated', () => {
      render(<LoginDemo />)

      expect(screen.getByRole('heading', { name: /demo login/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument()
    })

    it('should show demo credentials hint', () => {
      render(<LoginDemo />)

      expect(screen.getByText(/demo@example.com/)).toBeInTheDocument()
      expect(screen.getByText(/admin@example.com/)).toBeInTheDocument()
    })

    it('should login successfully with valid demo user credentials', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      // Wait for logged-in state
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should login successfully with valid admin credentials', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), ADMIN_EMAIL)
      await user.type(screen.getByLabelText(/password/i), ADMIN_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      // Wait for logged-in state with admin role
      await waitFor(() => {
        expect(screen.getByText(/welcome back, admin user!/i)).toBeInTheDocument()
      }, { timeout: 3000 })

      // Check admin badge (extracted to avoid deep nesting)
      const badge = screen.getByText((content, element) => {
        return element?.tagName === 'SPAN' && content === 'ADMIN'
      })
      expect(badge).toBeInTheDocument()
    })

    it('should show error message with invalid credentials', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), INVALID_EMAIL)
      await user.type(screen.getByLabelText(/password/i), 'wrongpass')
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i)
      }, { timeout: 1500 })
    })
  })

  describe('Form Validation - Progressive Disclosure', () => {
    it('should show email validation error on blur with invalid format', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalidemail')
      await user.tab()

      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()
    })

    it('should show password validation error on blur with short password', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const passwordInput = screen.getByLabelText(/password/i)
      await user.type(passwordInput, '123')
      await user.tab()

      expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    })

    it('should perform real-time validation after field is touched', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i)

      // Type invalid email and blur
      await user.type(emailInput, 'invalid')
      await user.tab()

      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()

      // Type valid email - error should disappear
      await user.clear(emailInput)
      await user.type(emailInput, DEMO_EMAIL)

      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument()
      })
    })

    it('should prevent submission when email is invalid', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), 'invalidemail')
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      // Should show validation error, not attempt login
      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()
      expect(screen.queryByText(/logging in.../i)).not.toBeInTheDocument()
    })
  })

  describe('Loading and Success States', () => {
    it('should show loading state during login', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      // Should show loading spinner immediately
      expect(screen.getByText(/logging in.../i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /logging in.../i })).toBeDisabled()
    })

    it('should disable form inputs during login', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

      await user.type(emailInput, DEMO_EMAIL)
      await user.type(passwordInput, DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      // Inputs should be disabled during loading
      expect(emailInput).toBeDisabled()
      expect(passwordInput).toBeDisabled()
    })
  })

  describe('Logged In State', () => {
    it('should show logout button when authenticated', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should logout successfully', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      const logoutButton = await screen.findByRole('button', { name: /logout/i }, { timeout: 3000 })
      await user.click(logoutButton)

      // Should show login form again
      expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument()
    })

    it('should persist login state on re-render', async () => {
      const user = userEvent.setup()
      const { unmount } = render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      }, { timeout: 3000 })

      // Unmount and remount
      unmount()
      render(<LoginDemo />)

      // Should still be logged in
      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle form submission with empty email', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      // Should show validation error
      expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    })

    it('should render correctly when localStorage has existing valid token', () => {
      const token = {
        user: { id: 'user-1', email: DEMO_EMAIL, name: 'Demo User', role: 'user' },
        issuedAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000,
      }
      localStorage.setItem('auth_token', btoa(JSON.stringify(token)))

      render(<LoginDemo />)

      expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
    })

    it('should render login form when localStorage has expired token', () => {
      const expiredToken = {
        user: { id: 'user-1', email: DEMO_EMAIL, name: 'Demo User', role: 'user' },
        issuedAt: Date.now() - 7200000,
        expiresAt: Date.now() - 3600000,
      }
      localStorage.setItem('auth_token', btoa(JSON.stringify(expiredToken)))

      render(<LoginDemo />)

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  describe('Programmatic Logout', () => {
    it('should update UI when user is logged out programmatically', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText(/email/i), DEMO_EMAIL)
      await user.type(screen.getByLabelText(/password/i), DEMO_PASSWORD)
      await user.click(screen.getByRole('button', { name: /^login$/i }))

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /authenticated/i })).toBeInTheDocument()
      }, { timeout: 3000 })

      // Logout programmatically
      logout()
      localStorage.clear()

      const { unmount } = render(<LoginDemo />)
      unmount()
      render(<LoginDemo />)

      expect(screen.getByRole('heading', { name: /demo login/i })).toBeInTheDocument()
    })
  })
})
