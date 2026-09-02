import type { CartItem } from '../types'
import * as Sentry from '@sentry/react'

/**
 * Calcula el subtotal total de los artículos en el carrito de compras.
 *
 * @param items - Array de artículos en el carrito con precio y cantidad
 * @returns Total acumulado del carrito en USD (o unidad monetaria base)
 * @throws {Error} Si algún artículo contiene un precio o cantidad inválidos (si aplica validación)
 *
 * @example
 * const items = [
 *   { id: '1', name: 'Laptop', description: 'Portátil', price: 999.99, emoji: '💻', quantity: 2 }
 * ]
 * calculateSubtotal(items) // 1999.98
 */
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
