import type { Product } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import { businessRules } from '@shared/constants/businessRules'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ❌ CODE SMELL: Primitive obsession - formateo de precio repetido (en vez de usar formatPrice)
  const formattedPrice = `$${product.price.toFixed(2)}`

  const calculateBulkDiscount = (qty: number) => {
    if (qty >= businessRules.bulkDiscount.minQuantity) {
      return product.price * qty * businessRules.bulkDiscount.percentage
    }
    return 0
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
      <p className="text-2xl font-bold text-indigo-600 mt-4">{formattedPrice}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Add to Cart
      </button>
    </div>
  )
}
