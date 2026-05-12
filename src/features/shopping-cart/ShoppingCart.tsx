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

  const handleBrowseProducts = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="lg:col-span-1" aria-label="Shopping cart">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-24 border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <span
            className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            aria-label={`${itemCount} items in cart`}
            role="status"
          >
            {itemCount}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl">
            <div className="text-6xl mb-4 animate-bounce" role="img" aria-label="Empty shopping cart">
              🛒
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-2">Your cart is ready for items!</h3>
            <p className="text-sm text-gray-500 mb-4">Browse our products and add items you love</p>
            <button
              onClick={handleBrowseProducts}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-3" role="list" aria-label="Cart items">
            {items.map(item => (
              <div key={item.id} role="listitem">
                <CartItem item={item} onRemove={onRemoveItem} />
              </div>
            ))}
          </div>
        )}

        <CartSummary subtotal={subtotal} />
      </div>
    </section>
  )
}
