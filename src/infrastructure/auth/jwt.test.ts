import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'
import { createToken, verifyToken, SECRET_KEY } from './jwt'

describe('JWT Auth Module', () => {
  describe('createToken', () => {
    it('should generate a valid JWT token string', () => {
      const token = createToken(123, 'user@example.com')
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })

    it('should decode payload with correct userId and email', () => {
      const userId = 123
      const email = 'user@example.com'
      const token = createToken(userId, email)

      const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; email: string; iat: number; exp: number }
      expect(decoded.userId).toBe(userId)
      expect(decoded.email).toBe(email)
      expect(decoded.exp - decoded.iat).toBe(15 * 60) // 15 minutes
    })
  })

  describe('verifyToken', () => {
    it('should return decoded payload for valid tokens', () => {
      const token = createToken(123, 'user@example.com')
      const payload = verifyToken(token) as { userId: number; email: string } | null
      expect(payload).not.toBeNull()
      expect(payload?.userId).toBe(123)
      expect(payload?.email).toBe('user@example.com')
    })

    it('should return null for tampered/modified tokens', () => {
      const token = createToken(123, 'user@example.com')
      const tamperedToken = token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a')
      const payload = verifyToken(tamperedToken)
      expect(payload).toBeNull()
    })

    it('should return null for fake/malformed tokens', () => {
      const payload = verifyToken('fake.token.here')
      expect(payload).toBeNull()
    })

    it('should return null for expired tokens', async () => {
      const expiredToken = jwt.sign(
        { userId: 123, email: 'user@example.com' },
        SECRET_KEY,
        { expiresIn: '1ms' }
      )
      // Small sleep to ensure token expiration
      await new Promise((resolve) => setTimeout(resolve, 20))
      const payload = verifyToken(expiredToken)
      expect(payload).toBeNull()
    })
  })
})
