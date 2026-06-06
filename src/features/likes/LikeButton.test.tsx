import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LikeButton } from './LikeButton';

describe('LikeButton', () => {
  it('should increment likes count when button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<LikeButton />);
    const button = screen.getByRole('button', { name: /like \(0\)/i });

    // Act
    await user.click(button);

    // Assert
    expect(screen.getByRole('button', { name: /like \(1\)/i })).toBeInTheDocument();
  });
});
