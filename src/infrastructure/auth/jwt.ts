import jwt from 'jsonwebtoken'

export const SECRET_KEY = 'my-secret-key'

/**
 * Generates a signed JWT authentication token for a user
 * @param userId - Unique identifier of the user
 * @param email - User's email address
 * @returns Encoded and signed JWT string
 */
export function createToken(userId: number, email: string): string {
  return jwt.sign(
    { userId, email },
    SECRET_KEY,
    { expiresIn: '15m' }
  )
}

/**
 * Verifies the validity of a JWT token and returns its decoded payload
 * @param token - JWT token string to verify
 * @returns Decoded payload object if valid, or null if invalid/expired
 */
export function verifyToken(token: string): object | null {
  try {
    const payload = jwt.verify(token, SECRET_KEY)
    return typeof payload === 'object' ? payload : null
  } catch (error) {
    if (error instanceof Error) {
      console.error('Token verification failed:', error.message)
    }
    return null
  }
}
