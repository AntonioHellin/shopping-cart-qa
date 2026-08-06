/**
 * PLAYBOOK: Cart Error Response
 *
 * TRIGGER: Error rate > 2% in cart operations
 *
 * DIAGNOSIS STEPS:
 * 1. Check product API status: /api/health
 * 2. Verify cart data structure in latest Sentry issues
 * 3. Check recent deployments (last 2 hours) in CI/CD
 * 4. Review Sentry breadcrumbs for user journey pattern
 *
 * REMEDIATION:
 * - If API down: Enable fallback mode (static product data)
 * - If data structure issue: Rollback to previous release
 * - If user input issue: Add validation + hotfix deploy
 *
 * INCIDENT MANAGEMENT:
 * - Create incident in Sentry: Mark as "Critical"
 * - Notify team: Post in #incidents Slack channel
 * - Update status page: "Cart experiencing issues"
 *
 * TARGETS:
 * - MTTR: < 15 minutes
 * - Escalation: After 30 min without resolution → call on-call
 * - Post-mortem: Required for all > 5 min downtime
 *
 * CONTACT: oncall-engineer@example.com
 */

import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '@shared/types'
import { CartContext } from './CartContextValue'

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id)
      if (existing) {
        return prev.map((it) =>
          it.id === product.id
            ? { ...it, quantity: it.quantity + quantity }
            : it,
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((it) => it.id !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
