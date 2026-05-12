import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ShoppingCart } from './ShoppingCart'
import type { CartItem } from '@shared/types'

describe('ShoppingCart Integration', () => {
  const mockCartItems: CartItem[] = [
    { id: '1', name: 'Laptop', description: 'High-performance', price: 999.99, emoji: '💻', quantity: 2 },
    { id: '2', name: 'Mouse', description: 'Wireless', price: 29.99, emoji: '🖱️', quantity: 1 }
  ]

  it('should display empty cart message when no items', () => {
    render(<ShoppingCart items={[]} onRemoveItem={vi.fn()} />)

    expect(screen.getByText(/your cart is ready for items/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /browse products/i })).toBeInTheDocument()
  })

  it('should display all cart items', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('Mouse')).toBeInTheDocument()
  })

  it('should display correct item count in header badge', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    // 2 laptops + 1 mouse = 3 total items
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should display quantities for each item', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    expect(screen.getByText('Qty: 2')).toBeInTheDocument()
    expect(screen.getByText('Qty: 1')).toBeInTheDocument()
  })

  it('should calculate and display correct subtotal', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    // (999.99 * 2) + (29.99 * 1) = 2029.97
    const subtotalElements = screen.getAllByText('$2,029.97')
    expect(subtotalElements.length).toBeGreaterThan(0)
  })

  it('should display correct total with discount applied', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('$2,029.97')).toBeInTheDocument() // Subtotal
    expect(screen.getByText('$1,725.47')).toBeInTheDocument() // Total after 15% discount
  })

  it('should have enabled checkout button when cart has items', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    const button = screen.getByRole('button', { name: /proceed to checkout/i })
    expect(button).not.toBeDisabled()
  })

  it('should have disabled checkout button when cart is empty', () => {
    render(<ShoppingCart items={[]} onRemoveItem={vi.fn()} />)

    const button = screen.getByRole('button', { name: /cart is empty|proceed to checkout/i })
    expect(button).toBeDisabled()
  })

  it('should call onRemoveItem when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemoveItem = vi.fn()

    render(<ShoppingCart items={mockCartItems} onRemoveItem={onRemoveItem} />)

    const removeButtons = screen.getAllByRole('button', { name: /remove.*from cart/i })
    await user.click(removeButtons[0])

    expect(onRemoveItem).toHaveBeenCalledWith('1')
    expect(onRemoveItem).toHaveBeenCalledTimes(1)
  })

  it('should allow removing multiple items', async () => {
    const user = userEvent.setup()
    const onRemoveItem = vi.fn()

    render(<ShoppingCart items={mockCartItems} onRemoveItem={onRemoveItem} />)

    const removeButtons = screen.getAllByRole('button', { name: /remove.*from cart/i })

    await user.click(removeButtons[0])
    await user.click(removeButtons[1])

    expect(onRemoveItem).toHaveBeenCalledTimes(2)
    expect(onRemoveItem).toHaveBeenNthCalledWith(1, '1')
    expect(onRemoveItem).toHaveBeenNthCalledWith(2, '2')
  })

  it('should display shipping info in cart summary', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)

    // With $2029.97 subtotal, should show "Free shipping applied!"
    expect(screen.getByText(/free shipping applied/i)).toBeInTheDocument()
    expect(screen.getByText(/safe & secure checkout/i)).toBeInTheDocument()
  })

  it('should display 15% discount for orders over $100', () => {
    render(<ShoppingCart items={mockCartItems} onRemoveItem={vi.fn()} />)
    // Subtotal: $2,029.97 → 15% discount = $304.50

    expect(screen.getByText('Discount')).toBeInTheDocument()
    expect(screen.getByText('-$304.50')).toBeInTheDocument()
  })

  it('should scroll to top when Browse Products button is clicked', async () => {
    const user = userEvent.setup()
    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    render(<ShoppingCart items={[]} onRemoveItem={vi.fn()} />)

    const browseButton = screen.getByRole('button', { name: /browse products/i })
    await user.click(browseButton)

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
