/**
 * Business Rules - Centralized constants for business logic
 * Extracted from magic numbers to improve maintainability
 */

export const businessRules = {
  bulkDiscount: {
    threshold: 5, // Minimum quantity for bulk discount
    percentage: 0.1, // 10% discount for 5+ items
  },
  orderDiscount: {
    threshold: 100, // Minimum order amount for order discount
    percentage: 0.15, // 15% discount for orders $100+
  },
  quantity: {
    min: 1,
    max: 99,
  },
} as const
