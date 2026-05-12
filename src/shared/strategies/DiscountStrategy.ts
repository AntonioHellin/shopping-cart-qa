/**
 * Strategy Pattern for Discount Calculations
 *
 * This pattern eliminates switch statements and makes it easy to add
 * new discount types without modifying existing code (Open/Closed Principle)
 */

export interface DiscountStrategy {
  /**
   * Calculate discount amount
   * @param subtotal - The subtotal amount
   * @returns The discount amount to subtract
   */
  calculate(subtotal: number): number

  /**
   * Get description of the discount
   */
  getDescription(): string
}

export class NoDiscountStrategy implements DiscountStrategy {
  calculate(subtotal: number): number {
    return subtotal * 0
  }

  getDescription(): string {
    return 'No discount applied'
  }
}

export class OrderDiscountStrategy implements DiscountStrategy {
  private threshold: number
  private percentage: number

  constructor(threshold: number, percentage: number) {
    this.threshold = threshold
    this.percentage = percentage
  }

  calculate(subtotal: number): number {
    if (subtotal >= this.threshold) {
      return subtotal * this.percentage
    }
    return 0
  }

  getDescription(): string {
    return `Order discount: ${this.percentage * 100}% off for orders $${this.threshold}+`
  }
}
