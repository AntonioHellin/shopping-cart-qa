import type { CartItem as CartItemType } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import * as Sentry from '@sentry/react'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: string) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  // ✅ REFACTORED: Removed unused validateQuantity function (dead code)
  // ✅ REFACTORED: Removed itemPrice primitive obsession, using formatPrice utility directly

  const handleRemove = () => {
    // 🍞 Breadcrumb: Track user removing items from cart
    Sentry.addBreadcrumb({
      message: 'User removed item from cart',
      category: 'cart.action',
      level: 'info',
      data: {
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
      },
    })

    onRemove(item.id)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label={item.name}>
          {item.emoji}
        </span>
        <div>
          <h4 className="font-semibold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-indigo-600">{formatPrice(item.price)}</p>
        <button
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 text-sm font-medium"
        >
          OK
        </button>
      </div>
    </div>
  )
}
