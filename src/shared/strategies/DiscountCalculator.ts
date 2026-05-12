import type { DiscountStrategy } from './DiscountStrategy'
import { OrderDiscountStrategy, NoDiscountStrategy } from './DiscountStrategy'
import { businessRules } from '../constants/businessRules'

/**
 * DiscountCalculator uses Strategy Pattern to calculate discounts
 *
 * Benefits:
 * - Easy to add new discount types
 * - No switch statements
 * - Each strategy is independently testable
 * - Follows Open/Closed Principle
 */
export class DiscountCalculator {
  private strategy: DiscountStrategy

  constructor(strategy?: DiscountStrategy) {
    this.strategy = strategy || new NoDiscountStrategy()
  }

  setStrategy(strategy: DiscountStrategy): void {
    this.strategy = strategy
  }

  calculate(subtotal: number): number {
    return this.strategy.calculate(subtotal)
  }

  getDescription(): string {
    return this.strategy.getDescription()
  }

  /**
   * Factory method to get the appropriate strategy based on subtotal
   */
  static getStrategyForOrder(subtotal: number): DiscountStrategy {
    if (subtotal >= businessRules.orderDiscount.threshold) {
      return new OrderDiscountStrategy(
        businessRules.orderDiscount.threshold,
        businessRules.orderDiscount.percentage
      )
    }
    return new NoDiscountStrategy()
  }
}
