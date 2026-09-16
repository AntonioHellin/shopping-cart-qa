import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { CartItem } from './CartItem'
import type { CartItem as CartItemType } from '@shared/types'

describe('CartItem', () => {
  const mockCartItem: CartItemType = {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    emoji: '💻',
    quantity: 2
  }

  it('should render product name', () => {
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    expect(screen.getByText('Laptop')).toBeInTheDocument()
  })

  it('should render product emoji', () => {
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    expect(screen.getByText('💻')).toBeInTheDocument()
  })

  it('should render formatted price', () => {
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    expect(screen.getByText('$999.99')).toBeInTheDocument()
  })

  it('should render quantity input with current value', () => {
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    const input = screen.getByRole('spinbutton', { name: /quantity for laptop/i })
    expect(input).toHaveValue(2)
  })

  it('should render remove button', () => {
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    expect(screen.getByRole('button', { name: /remove.*from cart/i })).toBeInTheDocument()
  })

  it('should call onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<CartItem item={mockCartItem} onRemove={onRemove} />)

    const button = screen.getByRole('button', { name: /remove.*from cart/i })
    await user.click(button)

    expect(onRemove).toHaveBeenCalledWith('1')
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
  it('should validate quantity using progressive validation pattern (onBlur + onFocus)', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    const input = screen.getByRole('spinbutton', { name: /quantity for laptop/i })

    await user.clear(input)
    await user.type(input, '150')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await user.tab()
    expect(screen.getByRole('alert')).toHaveTextContent('Quantity must be between 1 and 99')
    expect(input).toHaveAttribute('aria-invalid', 'true')

    await user.click(input)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'false')

    await user.clear(input)
    await user.type(input, '5')
    await user.tab()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
