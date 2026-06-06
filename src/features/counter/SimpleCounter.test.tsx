import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SimpleCounter } from './SimpleCounter';

describe('SimpleCounter', () => {
  it('should increment the count when the increment button is clicked', () => {
    // Arrange
    render(<SimpleCounter />);
    const button = screen.getByRole('button', { name: /increment/i });
    const countDisplay = screen.getByTestId('count-display');

    // Act
    fireEvent.click(button);

    // Assert
    expect(countDisplay).toHaveTextContent('Count: 1');
  });
});
