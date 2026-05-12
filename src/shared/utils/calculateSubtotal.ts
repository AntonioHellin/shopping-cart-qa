import type { CartItem } from '../types'
import * as Sentry from '@sentry/react'

/**
 * Calculates the subtotal of all items in the shopping cart
 *
 * Sums the total price by multiplying each item's price by its quantity.
 * This is the pre-discount, pre-tax total.
 *
 * @param items - Array of cart items with price and quantity
 * @returns Subtotal in dollars (e.g., 99.99 for $99.99)
 *
 * @example
 * ```typescript
 * const items = [
 *   { id: '1', name: 'Laptop', price: 999.99, quantity: 1, emoji: '💻' },
 *   { id: '2', name: 'Mouse', price: 29.99, quantity: 2, emoji: '🖱️' }
 * ]
 * calculateSubtotal(items) // Returns: 1059.97
 * ```
 *
 * @remarks
 * - Performance tracked via Sentry span for production monitoring
 * - TODO: Add input validation for negative prices and quantities
 *
 * @see {@link formatPrice} for formatting the result
 * @see {@link DiscountCalculator} for applying discounts to this subtotal
 */
// TODO: Add input validation for negative prices and quantities
export function calculateSubtotal(items: CartItem[]): number {
  // 📊 Performance: Track how long cart calculation takes with span
  return Sentry.startSpan(
    {
      name: 'calculate-subtotal',
      op: 'function',
    },
    () => {
      return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
  )
}
