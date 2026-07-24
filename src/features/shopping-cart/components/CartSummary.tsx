import { formatPrice } from '@shared/utils/formatPrice'
import { DiscountCalculator } from '@shared/strategies/DiscountCalculator'
import { Button } from '@shared/components/Button'

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
      <Button
        variant="secondary"
        disabled={subtotal === 0}
        className="w-full py-3 rounded-xl font-semibold shadow-md"
      >
        Proceed to Checkout
      </Button>
      <p className="text-xs text-gray-400 text-center mt-3">
        💳 Secure checkout • 🚚 Free shipping over $100
      </p>
    </div>
  )
}
