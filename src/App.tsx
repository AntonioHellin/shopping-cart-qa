function App() {
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
              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm">
                0 items
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Catalog Section */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Laptop</h3>
                    <p className="text-sm text-gray-500 mt-1">High-performance laptop</p>
                  </div>
                  <span className="text-2xl">💻</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600 mt-4">$999.99</p>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Add to Cart
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Wireless Mouse</h3>
                    <p className="text-sm text-gray-500 mt-1">Ergonomic design</p>
                  </div>
                  <span className="text-2xl">🖱️</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600 mt-4">$29.99</p>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Add to Cart
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Keyboard</h3>
                    <p className="text-sm text-gray-500 mt-1">Mechanical RGB</p>
                  </div>
                  <span className="text-2xl">⌨️</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600 mt-4">$149.99</p>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Add to Cart
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Monitor 27"</h3>
                    <p className="text-sm text-gray-500 mt-1">4K UHD display</p>
                  </div>
                  <span className="text-2xl">🖥️</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600 mt-4">$349.99</p>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
          </section>

          {/* Shopping Cart Section */}
          <section className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-24 border border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  0
                </span>
              </div>
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl">
                <div className="text-6xl mb-4 animate-bounce">🛒</div>
                <p className="text-gray-600 font-medium">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
              </div>
              <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">-$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      $0.00
                    </span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-white py-3 px-4 rounded-xl font-semibold cursor-not-allowed shadow-md">
                  Proceed to Checkout
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  💳 Secure checkout • 🚚 Free shipping over $100
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-indigo-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Built with ❤️ for AI Course • React 19 + TypeScript + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default App
