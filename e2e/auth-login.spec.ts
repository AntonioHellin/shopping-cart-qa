import { test, expect } from '@playwright/test'

// Test constants (educational purposes only)
const DEMO_EMAIL = 'demo@example.com'
const DEMO_PASSWORD = 'demo123' // eslint-disable-line sonarjs/no-hardcoded-passwords
const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123' // eslint-disable-line sonarjs/no-hardcoded-passwords

test.describe('Authentication Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should display login form on page load', async ({ page }) => {
    await page.goto('/')

    // Should see login form
    await expect(page.getByRole('heading', { name: /demo login/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /^login$/i })).toBeVisible()
  })

  test('should show demo credentials hint', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText(/demo@example.com \/ demo123/i)).toBeVisible()
    await expect(page.getByText(/admin@example.com \/ admin123/i)).toBeVisible()
  })

  test('should login successfully with demo user credentials', async ({ page }) => {
    await page.goto('/')

    // Fill in login form
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()

    // Should see authenticated state
    await expect(page.getByRole('heading', { name: /authenticated/i })).toBeVisible()
    await expect(page.getByText(/welcome back, demo user!/i)).toBeVisible()
    await expect(page.getByText(/demo@example.com/i)).toBeVisible()
    // Check for role badge (span element with exact text)
    await expect(page.locator('span.bg-blue-100', { hasText: 'USER' })).toBeVisible()
  })

  test('should login successfully with admin credentials', async ({ page }) => {
    await page.goto('/')

    // Fill in login form
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL)
    await page.getByLabel(/password/i).fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()

    // Should see authenticated state with admin role
    await expect(page.getByRole('heading', { name: /authenticated/i })).toBeVisible()
    await expect(page.getByText(/welcome back, admin user!/i)).toBeVisible()
    await expect(page.getByText(/admin@example.com/i)).toBeVisible()
    // Check for role badge (span element with exact text)
    await expect(page.locator('span.bg-purple-100', { hasText: 'ADMIN' })).toBeVisible()
  })

  test('should show error message with invalid email', async ({ page }) => {
    await page.goto('/')

    // Try to login with invalid email
    await page.getByLabel(/email/i).fill('invalid@example.com')
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()

    // Should see error message
    await expect(page.getByText(/invalid email or password/i)).toBeVisible()
    // Should still be on login form
    await expect(page.getByRole('heading', { name: /demo login/i })).toBeVisible()
  })

  test('should show error message with invalid password', async ({ page }) => {
    await page.goto('/')

    // Try to login with invalid password
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).fill('wrongpassword')
    await page.getByRole('button', { name: /^login$/i }).click()

    // Should see error message
    await expect(page.getByText(/invalid email or password/i)).toBeVisible()
    // Should still be on login form
    await expect(page.getByRole('heading', { name: /demo login/i })).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    await page.goto('/')

    // Login first
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()
    await expect(page.getByRole('heading', { name: /authenticated/i })).toBeVisible()

    // Logout
    await page.getByRole('button', { name: /logout/i }).click()

    // Should see login form again
    await expect(page.getByRole('heading', { name: /demo login/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test('should persist login state after page refresh', async ({ page }) => {
    await page.goto('/')

    // Login
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()
    await expect(page.getByRole('heading', { name: /authenticated/i })).toBeVisible()

    // Refresh page
    await page.reload()

    // Should still be logged in
    await expect(page.getByRole('heading', { name: /authenticated/i })).toBeVisible()
    await expect(page.getByText(/welcome back, demo user!/i)).toBeVisible()
  })

  test('should clear error message on successful login after failed attempt', async ({ page }) => {
    await page.goto('/')

    // Failed login
    await page.getByLabel(/email/i).fill('invalid@example.com')
    await page.getByLabel(/password/i).fill('wrongpassword')
    await page.getByRole('button', { name: /^login$/i }).click()
    await expect(page.getByText(/invalid email or password/i)).toBeVisible()

    // Clear and try again with valid credentials
    await page.getByLabel(/email/i).clear()
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).clear()
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()

    // Error should be gone, should be logged in
    await expect(page.getByText(/invalid email or password/i)).not.toBeVisible()
    await expect(page.getByRole('heading', { name: /authenticated/i })).toBeVisible()
  })

  test('should show user ID and email when authenticated', async ({ page }) => {
    await page.goto('/')

    // Login
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()

    // Should display user details
    await expect(page.getByText(/ID:/i)).toBeVisible()
    await expect(page.getByText(/user-1/i)).toBeVisible()
    await expect(page.getByText(/Email:/i)).toBeVisible()
    await expect(page.getByText(/demo@example.com/i)).toBeVisible()
  })

  test('should clear login form inputs after successful login', async ({ page }) => {
    await page.goto('/')

    // Fill and submit login form
    await page.getByLabel(/email/i).fill(DEMO_EMAIL)
    await page.getByLabel(/password/i).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: /^login$/i }).click()

    // After login, form should be hidden (replaced with authenticated view)
    await expect(page.getByLabel(/email/i)).not.toBeVisible()
    await expect(page.getByLabel(/password/i)).not.toBeVisible()
  })
})
