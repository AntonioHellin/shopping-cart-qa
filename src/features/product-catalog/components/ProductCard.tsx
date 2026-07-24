import type { Product } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import { Button } from '@shared/components/Button'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
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
      <Button
        variant="primary"
        className="w-full mt-4"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </Button>
    </div>
  )
}
