/**
 * Password Validation Utility
 *
 * OWASP A07: Identification and Authentication Failures
 *
 * Implements strong password requirements:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * - Rejects common passwords
 *
 * Production usage:
 * - Combine with password hashing (bcrypt with 12+ rounds)
 * - Implement account lockout after 5 failed attempts
 * - Add MFA for sensitive operations
 * - Use password breach detection (haveibeenpwned API)
 */

export type PasswordStrength = 'weak' | 'medium' | 'strong'

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: PasswordStrength
}

// Common passwords to reject (small sample - use full list in production)
const COMMON_PASSWORDS = [
  'password',
  'password123',
  'qwerty',
  'qwerty123',
  'welcome',
  'welcome123',
  'admin',
  'admin123',
  'letmein',
  '123456',
]

/**
 * Validates password strength according to OWASP recommendations
 *
 * @param password - The password to validate
 * @returns Validation result with isValid flag, error messages, and strength rating
 *
 * @example
 * ```typescript
 * const result = validatePassword('MyStr0ng!P@ssword')
 * if (!result.isValid) {
 *   console.error('Password validation failed:', result.errors)
 * }
 * ```
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  let strengthScore = 0

  // Requirement 1: Minimum length (12 characters)
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long')
  } else {
    strengthScore++
  }

  // Requirement 2: Uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  } else {
    strengthScore++
  }

  // Requirement 3: Lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  } else {
    strengthScore++
  }

  // Requirement 4: Number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  } else {
    strengthScore++
  }

  // Requirement 5: Special character
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character')
  } else {
    strengthScore++
  }

  // Check against common passwords (case-insensitive)
  const lowerPassword = password.toLowerCase()
  const isCommon = COMMON_PASSWORDS.some(common => lowerPassword.includes(common))

  if (isCommon) {
    errors.push('Password is too common. Please choose a more unique password.')
  }

  // Calculate strength rating
  let strength: PasswordStrength
  if (strengthScore <= 2) {
    strength = 'weak'
  } else if (strengthScore <= 4) {
    strength = 'medium'
  } else {
    strength = 'strong'
  }

  // Password is valid only if all requirements are met AND not common
  const isValid = errors.length === 0

  return {
    isValid,
    errors,
    strength,
  }
}

/**
 * Get user-friendly strength label with color coding
 */
export function getStrengthLabel(strength: PasswordStrength): { label: string; color: string } {
  switch (strength) {
    case 'weak':
      return { label: 'Weak', color: 'text-red-600' }
    case 'medium':
      return { label: 'Medium', color: 'text-yellow-600' }
    case 'strong':
      return { label: 'Strong', color: 'text-green-600' }
  }
}
