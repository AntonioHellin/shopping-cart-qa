import { useState } from 'react'
import { ProductCatalog } from '@features/product-catalog/ProductCatalog'
import { ShoppingCart } from '@features/shopping-cart/ShoppingCart'
import { PRODUCTS } from '@shared/data/products'
import type { Product, CartItem } from '@shared/types'
import * as Sentry from '@sentry/react'

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // 🔥 Test Error Button - Demonstrates Sentry error tracking
  const handleTestError = () => {
    // Add breadcrumb before throwing error
    Sentry.addBreadcrumb({
      message: 'User clicked "Test Error" button',
      category: 'user.action',
      level: 'info',
    })

    // Throw error that will be captured by Sentry
    throw new Error('This is a test error from Sentry! Check your dashboard.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                🛒 Product Shop
              </h1>
              <p className="text-gray-600 mt-1 text-sm">Your one-stop shop for tech products</p>
            </div>
            <div className="flex items-center gap-4">
              {/* 🔥 Sentry Test Button - Only visible in development */}
              {import.meta.env.DEV && (
                <button
                  onClick={handleTestError}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-md"
                  title="Test Sentry error tracking"
                >
                  🔥 Test Error
                </button>
              )}
              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm">
                {itemCount} items
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProductCatalog products={PRODUCTS} onAddToCart={handleAddToCart} />
          <Sentry.ErrorBoundary
            fallback={
              <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-red-700 font-semibold shadow-sm">
                Something went wrong with the shopping cart
              </div>
            }
            showDialog
          >
            <ShoppingCart items={cartItems} onRemoveItem={handleRemoveItem} />
          </Sentry.ErrorBoundary>
        </div>
      </main>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-indigo-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Built with ❤️ for AI Course • React 19 + TypeScript + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default App
