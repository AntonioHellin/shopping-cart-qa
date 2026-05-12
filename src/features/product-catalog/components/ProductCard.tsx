import type { Product } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import * as Sentry from '@sentry/react'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ✅ REFACTORED: Using formatPrice utility instead of primitive obsession
  // ✅ REFACTORED: Removed unused calculateBulkDiscount function (dead code)
  // TODO: Extract button component to shared/components for reusability

  const handleAddToCart = () => {
    // 🍞 Breadcrumb: Track user adding items to cart
    Sentry.addBreadcrumb({
      message: 'User added item to cart',
      category: 'cart.action',
      level: 'info',
      data: {
        productId: product.id,
        productName: product.name,
        price: product.price,
      },
    })

    onAddToCart(product)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        </div>
        <span className="text-2xl">{product.emoji}</span>
      </div>
      <p className="text-2xl font-bold text-indigo-600 mt-4">{formatPrice(product.price)}</p>
      <button
        onClick={handleAddToCart}
        className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Add to Cart
      </button>
    </div>
  )
}
