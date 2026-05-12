import { useContext } from 'react'
import { CartContext } from './CartContextValue'
import type { CartContextValue } from './CartContextValue'

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
