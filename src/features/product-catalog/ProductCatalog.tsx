import { ProductCard } from './components/ProductCard'
import type { Product } from '@shared/types'

interface ProductCatalogProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  return (
    <section className="lg:col-span-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}
