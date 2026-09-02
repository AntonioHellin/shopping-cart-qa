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
