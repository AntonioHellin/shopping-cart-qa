import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PriceCalculator } from './PriceCalculator';

describe('PriceCalculator', () => {
  it('should calculate the total correctly when user types quantity and unit price', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<PriceCalculator />);
    const quantityInput = screen.getByLabelText(/quantity/i);
    const unitPriceInput = screen.getByLabelText(/unit price/i);

    // Act
    await user.type(quantityInput, '3');
    await user.type(unitPriceInput, '10.50');

    // Assert
    expect(screen.getByText('Total: $31.50')).toBeInTheDocument();
  });
});
