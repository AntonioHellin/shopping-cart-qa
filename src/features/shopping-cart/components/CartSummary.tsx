import { formatPrice } from '@shared/utils/formatPrice'
import { DiscountCalculator } from '@shared/strategies/DiscountCalculator'

interface CartSummaryProps {
  subtotal: number
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  // ✅ REFACTORED: Using Strategy Pattern (Open/Closed Principle)
  // Easy to add new discount types without modifying this code
  const strategy = DiscountCalculator.getStrategyForOrder(subtotal)
  const calculator = new DiscountCalculator(strategy)
  const discount = calculator.calculate(subtotal)
  const total = subtotal - discount

  return (
    <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200" role="region" aria-label="Order summary">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span aria-label={`Subtotal: ${formatPrice(subtotal)}`}>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Discount</span>
          <span className="text-green-600" aria-label={`Discount: ${formatPrice(discount)}`}>
            -{formatPrice(discount)}
          </span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span
            className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            aria-label={`Total: ${formatPrice(total)}`}
          >
            {formatPrice(total)}
          </span>
        </div>
      </div>
      <button
        disabled={subtotal === 0}
        aria-label={subtotal === 0 ? 'Cart is empty. Add items to proceed' : 'Proceed to checkout'}
        className={`w-full py-3 px-4 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          subtotal === 0
            ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
        }`}
      >
        Proceed to Checkout
      </button>
      <p className="text-xs text-gray-500 text-center mt-3">
        <span role="img" aria-label="Lock icon">
          🔒
        </span>{' '}
        Safe & secure checkout
        {subtotal >= 100 && (
          <span>
            {' '}•{' '}
            <span role="img" aria-label="Delivery truck">
              🚚
            </span>{' '}
            <span className="text-green-600 font-medium">Free shipping applied!</span>
          </span>
        )}
        {subtotal > 0 && subtotal < 100 && (
          <span>
            {' '}•{' '}
            <span role="img" aria-label="Delivery truck">
              🚚
            </span>{' '}
            Add ${formatPrice(100 - subtotal)} for free shipping
          </span>
        )}
      </p>
    </div>
  )
}
