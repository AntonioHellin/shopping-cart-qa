import { describe, it, expect } from 'vitest'
import { validatePassword, type PasswordValidationResult } from './validatePassword'

describe('validatePassword (OWASP A07 - Authentication Failures)', () => {
  describe('Password strength validation', () => {
    it('should reject password shorter than 12 characters', () => {
      const result = validatePassword('Short1!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must be at least 12 characters long')
    })

    it('should reject password without uppercase letter', () => {
      const result = validatePassword('lowercase123!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one uppercase letter')
    })

    it('should reject password without lowercase letter', () => {
      const result = validatePassword('UPPERCASE123!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one lowercase letter')
    })

    it('should reject password without number', () => {
      const result = validatePassword('NoNumbersHere!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one number')
    })

    it('should reject password without special character', () => {
      const result = validatePassword('NoSpecial123')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one special character')
    })

    it('should accept strong password with all requirements', () => {
      const result = validatePassword('StrongPass123!')

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.strength).toBe('strong')
    })

    it('should return all errors for completely weak password', () => {
      const result = validatePassword('weak')

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(4) // Missing: length, uppercase, number, special
    })
  })

  describe('Password strength scoring', () => {
    it('should rate password as "weak" with only 2 criteria met', () => {
      const result = validatePassword('weakpassword')

      expect(result.strength).toBe('weak')
    })

    it('should rate password as "medium" with 3-4 criteria met', () => {
      const result = validatePassword('MediumPass123')

      expect(result.strength).toBe('medium')
    })

    it('should rate password as "strong" with all 5 criteria met', () => {
      const result = validatePassword('VeryStr0ng!Pass')

      expect(result.strength).toBe('strong')
      expect(result.isValid).toBe(true)
    })
  })

  describe('Common password detection', () => {
    // eslint-disable-next-line sonarjs/no-hardcoded-passwords
    const COMMON_PASSWORD_ERROR = 'Password is too common. Please choose a more unique password.'

    it('should reject common password "Password123!"', () => {
      const result = validatePassword('Password123!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(COMMON_PASSWORD_ERROR)
    })

    it('should reject common password "Welcome123!"', () => {
      const result = validatePassword('Welcome123!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(COMMON_PASSWORD_ERROR)
    })

    it('should reject common password "Qwerty123!"', () => {
      const result = validatePassword('Qwerty123!')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(COMMON_PASSWORD_ERROR)
    })

    it('should accept unique password with all criteria', () => {
      const result = validatePassword('MyUn1queP@ssw0rd!')

      expect(result.isValid).toBe(true)
    })
  })

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = validatePassword('')

      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should handle very long password', () => {
      const longPassword = 'VeryL0ng!Phrase'.repeat(10) // Avoid "password" keyword
      const result = validatePassword(longPassword)

      expect(result.isValid).toBe(true)
    })

    it('should handle password with only spaces', () => {
      const result = validatePassword('            ')

      expect(result.isValid).toBe(false)
    })

    it('should handle password with unicode characters', () => {
      const result = validatePassword('Unicøde123!Pässwörd')

      expect(result.isValid).toBe(true)
    })
  })

  describe('Return type structure', () => {
    it('should return correct structure for valid password', () => {
      const result: PasswordValidationResult = validatePassword('ValidP@ssw0rd123')

      expect(result).toHaveProperty('isValid')
      expect(result).toHaveProperty('errors')
      expect(result).toHaveProperty('strength')
      expect(typeof result.isValid).toBe('boolean')
      expect(Array.isArray(result.errors)).toBe(true)
      expect(['weak', 'medium', 'strong']).toContain(result.strength)
    })

    it('should return correct structure for invalid password', () => {
      const result: PasswordValidationResult = validatePassword('weak')

      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.strength).toBe('weak')
    })
  })
})
