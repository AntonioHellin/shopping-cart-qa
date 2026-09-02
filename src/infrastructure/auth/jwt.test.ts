import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'
import { createToken, SECRET_KEY } from './jwt'

describe('JWT Token Generation', () => {
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
