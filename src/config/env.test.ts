import { describe, it, expect } from 'vitest'
import { z } from 'zod'

describe('Environment Variable Validation (Zod Schema)', () => {
  const envSchema = z.object({
    VITE_MAX_CART_ITEMS: z
      .string()
      .transform(Number)
      .pipe(z.number().min(1).max(999)),
  })

  it('should successfully parse valid VITE_MAX_CART_ITEMS within 1-999 range', () => {
    const result = envSchema.parse({ VITE_MAX_CART_ITEMS: '99' })
    expect(result.VITE_MAX_CART_ITEMS).toBe(99)
  })

  it('should throw ZodError when VITE_MAX_CART_ITEMS exceeds 999', () => {
    expect(() => envSchema.parse({ VITE_MAX_CART_ITEMS: '1000' })).toThrow()
  })

  it('should throw ZodError when VITE_MAX_CART_ITEMS is less than 1', () => {
    expect(() => envSchema.parse({ VITE_MAX_CART_ITEMS: '0' })).toThrow()
  })
})

