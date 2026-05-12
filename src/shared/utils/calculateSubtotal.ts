import type { CartItem } from '../types'

// TODO: Add input validation for negative prices and quantities
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}
