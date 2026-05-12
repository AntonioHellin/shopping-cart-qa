import type { CartItem as CartItemType } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: string) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  // ❌ CODE SMELL: Duplicate validation logic (también en ProductCard - no usada pero existe)
  const validateQuantity = (qty: number) => {
    if (qty < 1) return 'Quantity must be at least 1'
    if (qty > 99) return 'Quantity cannot exceed 99'
    return ''
  }

  // ❌ CODE SMELL: Primitive obsession - formateo de precio repetido
  const itemPrice = `$${item.price.toFixed(2)}`

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.emoji}</span>
        <div>
          <h4 className="font-semibold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-indigo-600">{formatPrice(item.price)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
