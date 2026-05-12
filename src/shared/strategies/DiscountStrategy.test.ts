import { describe, it, expect } from 'vitest'
import { NoDiscountStrategy, OrderDiscountStrategy } from './DiscountStrategy'
import { DiscountCalculator } from './DiscountCalculator'
import { businessRules } from '../constants/businessRules'

describe('DiscountStrategy', () => {
  const noDiscountMessage = 'No discount applied'

  describe('NoDiscountStrategy', () => {
    it('should return 0 discount', () => {
      const strategy = new NoDiscountStrategy()
      expect(strategy.calculate(50)).toBe(0)
      expect(strategy.calculate(100)).toBe(0)
      expect(strategy.calculate(150)).toBe(0)
    })

    it('should return no discount applied message', () => {
      const strategy = new NoDiscountStrategy()
      expect(strategy.getDescription()).toBe(noDiscountMessage)
    })
  })

  describe('OrderDiscountStrategy', () => {
    const strategy = new OrderDiscountStrategy(
      businessRules.orderDiscount.threshold,
      businessRules.orderDiscount.percentage
    )
    const expectedDescription = 'Order discount'

    it('should return 0 discount when below threshold', () => {
      expect(strategy.calculate(50)).toBe(0)
      expect(strategy.calculate(99)).toBe(0)
    })

    it('should calculate 15% discount when at or above threshold', () => {
      expect(strategy.calculate(100)).toBe(15) // 100 * 0.15
      expect(strategy.calculate(200)).toBe(30) // 200 * 0.15
      expect(strategy.calculate(1000)).toBe(150) // 1000 * 0.15
    })

    it('should include discount details in description', () => {
      expect(strategy.getDescription()).toContain(expectedDescription)
      expect(strategy.getDescription()).toContain('15%')
      expect(strategy.getDescription()).toContain('$100')
    })
  })
})

describe('DiscountCalculator', () => {
  const noDiscountMessage = 'No discount applied'

  it('should use NoDiscountStrategy by default', () => {
    const calculator = new DiscountCalculator()
    expect(calculator.calculate(100)).toBe(0)
  })

  it('should allow setting a strategy', () => {
    const calculator = new DiscountCalculator()
    const orderStrategy = new OrderDiscountStrategy(100, 0.15)

    calculator.setStrategy(orderStrategy)
    expect(calculator.calculate(100)).toBe(15)
  })

  it('should return correct description from strategy', () => {
    const calculator = new DiscountCalculator()
    const expectedDescription = 'Order discount'
    expect(calculator.getDescription()).toBe(noDiscountMessage)

    calculator.setStrategy(new OrderDiscountStrategy(100, 0.15))
    expect(calculator.getDescription()).toContain(expectedDescription)
  })

  describe('getStrategyForOrder (Factory Method)', () => {
    it('should return NoDiscountStrategy for orders below threshold', () => {
      const strategy = DiscountCalculator.getStrategyForOrder(50)
      expect(strategy.calculate(50)).toBe(0)
    })

    it('should return OrderDiscountStrategy for orders at or above threshold', () => {
      const strategy = DiscountCalculator.getStrategyForOrder(100)
      expect(strategy.calculate(100)).toBe(15)
    })
  })
})
