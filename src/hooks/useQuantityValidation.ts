import { env } from '../config/env'

const MAX_ITEMS = env.VITE_MAX_CART_ITEMS

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
