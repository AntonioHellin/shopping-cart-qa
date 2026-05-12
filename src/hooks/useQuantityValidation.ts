const MAX_CART_ITEMS = 10

export function validateQuantity(quantity: number): string | null {
  if (quantity < 1) return 'Quantity must be at least 1'
  if (quantity > MAX_CART_ITEMS) return `Quantity cannot exceed ${MAX_CART_ITEMS}`
  return null
}
