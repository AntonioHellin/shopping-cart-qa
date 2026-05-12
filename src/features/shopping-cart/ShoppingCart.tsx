import { CartItem } from './components/CartItem'
import { CartSummary } from './components/CartSummary'
import { calculateSubtotal } from '@shared/utils/calculateSubtotal'
import type { CartItem as CartItemType } from '@shared/types'
import * as Sentry from '@sentry/react'
import { useEffect } from 'react'

interface ShoppingCartProps {
  items: CartItemType[]
  onRemoveItem: (productId: string) => void
}

export function ShoppingCart({ items, onRemoveItem }: ShoppingCartProps) {
  const subtotal = calculateSubtotal(items)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // 📊 Custom Metric: Track cart size for business insights
  useEffect(() => {
    // Track cart metrics as tags for filtering/analysis
    Sentry.setTag('cart.items.count', itemCount)
    Sentry.setTag('cart.subtotal.amount', subtotal)

    // Add measurement for performance tracking
    Sentry.setMeasurement('cart.items', itemCount, 'none')
    Sentry.setMeasurement('cart.value', subtotal, 'none')
  }, [items, itemCount, subtotal])

  return (
    <section className="lg:col-span-1">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-24 border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            {itemCount}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl">
            <div className="text-6xl mb-4 animate-bounce">🛒</div>
            <p className="text-gray-600 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        )}

        <CartSummary subtotal={subtotal} />
      </div>
    </section>
  )
}
