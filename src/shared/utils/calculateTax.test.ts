import { describe, it, expect } from 'vitest';
import { calculateTax } from './calculateTax';

describe('calculateTax', () => {
  it('should calculate the correct tax amount for a given amount and rate', () => {
    // Arrange
    const amount = 100;
    const rate = 10;

    // Act
    const result = calculateTax(amount, rate);

    // Assert
    expect(result).toBe(10);
  });
});
