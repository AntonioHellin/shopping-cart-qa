import { describe, it, expect } from 'vitest';
import { calculateTax } from './calculateTax';

describe('calculateTax', () => {
  it('should return 10 when amount is 100 and taxRate is 10', () => {
    // Arrange
    const amount = 100;
    const taxRate = 10;

    // Act
    const result = calculateTax(amount, taxRate);

    // Assert
    expect(result).toBe(10);
  });

  it('should return 30 when amount is 200 and taxRate is 15', () => {
    // Arrange
    const amount = 200;
    const taxRate = 15;

    // Act
    const result = calculateTax(amount, taxRate);

    // Assert
    expect(result).toBe(30);
  });
});
