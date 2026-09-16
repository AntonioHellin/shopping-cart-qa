import { useState } from 'react'

export function useQuantityValidation() {
  const [error, setError] = useState<string | null>(null)

  const handleBlur = (value: number) => {
    if (isNaN(value) || value < 1 || value > 99) {
      setError('Quantity must be between 1 and 99')
    } else {
      setError(null)
    }
  }

  const clearError = () => setError(null)

  return { error, handleBlur, clearError }
}

export function validateQuantity(quantity: number): string | null {
  if (quantity < 1 || quantity > 99) return 'Quantity must be between 1 and 99'
  return null
}
