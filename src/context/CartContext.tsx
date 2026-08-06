import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '@shared/types'
import { CartContext } from './CartContextValue'
import * as Sentry from '@sentry/react'

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id)
      const newItems = existing
        ? prev.map((it) =>
            it.id === product.id
              ? { ...it, quantity: it.quantity + quantity }
              : it,
          )
        : [...prev, { ...product, quantity }]

      // Business metric — gauge captura snapshot del valor actual
      Sentry.metrics.gauge('cart.items.count', newItems.length, {
        attributes: { category: 'business' },
        unit: 'item',
      })

      return newItems
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
