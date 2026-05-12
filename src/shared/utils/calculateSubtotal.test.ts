import { describe, it, expect } from 'vitest'
import { calculateSubtotal } from './calculateSubtotal'
import type { CartItem } from '../types'

describe('calculateSubtotal', () => {
  it('should return 0 for empty cart', () => {
    const items: CartItem[] = []
    expect(calculateSubtotal(items)).toBe(0)
  })

  it('should calculate subtotal for single item', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Laptop', description: 'High-performance', price: 999.99, emoji: '💻', quantity: 1 }
    ]
    expect(calculateSubtotal(items)).toBe(999.99)
  })

  it('should calculate subtotal for multiple quantities of same item', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Mouse', description: 'Wireless', price: 29.99, emoji: '🖱️', quantity: 3 }
    ]
    expect(calculateSubtotal(items)).toBe(89.97)
  })

  it('should calculate subtotal for multiple different items', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Laptop', description: 'High-performance', price: 999.99, emoji: '💻', quantity: 1 },
      { id: '2', name: 'Mouse', description: 'Wireless', price: 29.99, emoji: '🖱️', quantity: 2 }
    ]
    expect(calculateSubtotal(items)).toBe(1059.97)
  })
})
