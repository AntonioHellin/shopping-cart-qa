const MAX_ITEMS = Number(import.meta.env.VITE_MAX_CART_ITEMS) || 99

export function useQuantityValidation() {
  const validate = (quantity: number) => {
    if (quantity > MAX_ITEMS) {
      return `Maximum ${MAX_ITEMS} items allowed`
    }
    return null
  }
  return { validate }
}

export function validateQuantity(quantity: number): string | null {
  if (quantity < 1) return 'Quantity must be at least 1'
  if (quantity > MAX_ITEMS) return `Quantity cannot exceed ${MAX_ITEMS}`
  return null
}
