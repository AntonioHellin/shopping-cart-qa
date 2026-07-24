import type { CartItem } from '../types'

export function calculateSubtotal(items: CartItem[]): number {
  if (!items) {
    throw new Error('Items array is required')
  }

  items.forEach(item => {
    if (item.price < 0) {
      throw new Error('Price cannot be negative')
    }
    if (item.quantity < 0) {
      throw new Error('Quantity cannot be negative')
    }
  })

  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}
