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

  it('should render quantity', () => {
    render(<CartItem item={mockCartItem} onRemove={vi.fn()} />)
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument()
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
})
