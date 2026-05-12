export function calculateShippingCost(subtotal: number): number {
  if (subtotal <= 0) return 0
  if (subtotal >= 100) return 0
  return 9.99
}
