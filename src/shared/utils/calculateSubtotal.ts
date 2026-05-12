import type { CartItem } from '../types'
import * as Sentry from '@sentry/react'

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
