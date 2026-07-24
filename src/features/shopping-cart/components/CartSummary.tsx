import { formatPrice } from '@shared/utils/formatPrice'
import { businessRules } from '@shared/constants/businessRules'

interface CartSummaryProps {
  subtotal: number
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  let discount = 0
  if (subtotal >= businessRules.cartDiscount.threshold) {
    discount = subtotal * businessRules.cartDiscount.percentage
  }
  const total = subtotal - discount

  return (
    <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Discount</span>
          <span className="text-green-600">-{formatPrice(discount)}</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      <button
        disabled={subtotal === 0}
        className={`w-full py-3 px-4 rounded-xl font-semibold shadow-md ${
          subtotal === 0
            ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
        }`}
      >
        Proceed to Checkout
      </button>
      <p className="text-xs text-gray-400 text-center mt-3">
        💳 Secure checkout • 🚚 Free shipping over ${businessRules.cartDiscount.threshold}
      </p>
    </div>
  )
}
