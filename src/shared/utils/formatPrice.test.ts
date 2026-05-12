import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('should format whole numbers with .00', () => {
    expect(formatPrice(100)).toBe('$100.00')
  })

  it('should format decimal numbers with 2 decimals', () => {
    expect(formatPrice(99.99)).toBe('$99.99')
  })

  it('should format with commas for thousands', () => {
    expect(formatPrice(1000)).toBe('$1,000.00')
  })

  it('should format with commas for larger amounts', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56')
  })

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('should round to 2 decimal places', () => {
    expect(formatPrice(99.999)).toBe('$100.00')
  })
})
