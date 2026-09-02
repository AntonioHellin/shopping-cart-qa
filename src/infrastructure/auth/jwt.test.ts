import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'
import { createToken, verifyToken, SECRET_KEY } from './jwt'

const TEST_EMAIL = 'user@example.com'
const TEST_USER_ID = 123

describe('JWT Auth Module', () => {
  describe('createToken', () => {
    it('should generate a valid JWT token string', () => {
      const token = createToken(TEST_USER_ID, TEST_EMAIL)
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })

    it('should decode payload with correct userId and email', () => {
      const token = createToken(TEST_USER_ID, TEST_EMAIL)

      const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; email: string; iat: number; exp: number }
      expect(decoded.userId).toBe(TEST_USER_ID)
      expect(decoded.email).toBe(TEST_EMAIL)
      expect(decoded.exp - decoded.iat).toBe(15 * 60) // 15 minutes
    })
  })

  describe('verifyToken', () => {
    it('should return decoded payload for valid tokens', () => {
      const token = createToken(TEST_USER_ID, TEST_EMAIL)
      const payload = verifyToken(token) as { userId: number; email: string } | null
      expect(payload).not.toBeNull()
      expect(payload?.userId).toBe(TEST_USER_ID)
      expect(payload?.email).toBe(TEST_EMAIL)
    })

    it('should return null for tampered/modified tokens', () => {
      const token = createToken(TEST_USER_ID, TEST_EMAIL)
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
        { userId: TEST_USER_ID, email: TEST_EMAIL },
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
