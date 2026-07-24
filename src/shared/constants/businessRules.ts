export const businessRules = {
  bulkDiscount: {
    minQuantity: 5,
    percentage: 0.1,
  },
  cartDiscount: {
    threshold: 100,
    percentage: 0.15,
  },
} as const;
