import type { CartItem as CartItemType } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import * as Sentry from '@sentry/react'
import { useQuantityValidation } from '@/hooks/useQuantityValidation'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: string) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  const { error, handleBlur, clearError } = useQuantityValidation()

  const handleRemove = () => {
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

  const errorId = 'quantity-error-' + item.id

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label={item.name}>
          {item.emoji}
        </span>
        <div>
          <h4 className="font-semibold text-gray-900">{item.name}</h4>
          <label className="text-sm text-gray-500 flex items-center gap-2">
            Qty
            <input
              type="number"
              min={1}
              max={99}
              key={item.quantity}
              defaultValue={item.quantity}
              aria-label={'Quantity for ' + item.name}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              onBlur={(e) => handleBlur(Number(e.target.value))}
              onFocus={clearError}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          {error && (
            <span id={errorId} role="alert" className="text-xs text-red-600 block mt-1">
              {error}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-indigo-600">{formatPrice(item.price)}</p>
        <button
          onClick={handleRemove}
          aria-label={'Remove ' + item.name + ' from cart'}
          className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
