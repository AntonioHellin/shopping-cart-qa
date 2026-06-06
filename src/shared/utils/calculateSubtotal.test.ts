import { describe, it, expect } from 'vitest';
import { calculateSubtotal, CartItem } from './calculateSubtotal';

describe('calculateSubtotal', () => {
  it('should calculate the correct subtotal for an array of cart items', () => {
    // Arrange
    const items: CartItem[] = [
      { price: 10, quantity: 2 },
      { price: 5.50, quantity: 1 },
    ];

    // Act
    const result = calculateSubtotal(items);

    // Assert
    expect(result).toBe(25.50);
  });
});
