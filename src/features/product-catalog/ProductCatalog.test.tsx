import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ProductCatalog } from './ProductCatalog'
import type { Product } from '@shared/types'

describe('ProductCatalog Integration', () => {
  const mockProducts: Product[] = [
    { id: '1', name: 'Laptop', description: 'High-performance', price: 999.99, emoji: '💻' },
    { id: '2', name: 'Mouse', description: 'Wireless', price: 29.99, emoji: '🖱️' },
    { id: '3', name: 'Keyboard', description: 'Mechanical', price: 149.99, emoji: '⌨️' }
  ]

  it('should render all products from catalog', () => {
    render(<ProductCatalog products={mockProducts} onAddToCart={vi.fn()} />)

    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('Mouse')).toBeInTheDocument()
    expect(screen.getByText('Keyboard')).toBeInTheDocument()
  })

  it('should display product details for each item', () => {
    render(<ProductCatalog products={mockProducts} onAddToCart={vi.fn()} />)

    expect(screen.getByText('High-performance')).toBeInTheDocument()
    expect(screen.getByText('$999.99')).toBeInTheDocument()
    expect(screen.getByText('💻')).toBeInTheDocument()
  })

  it('should render correct number of add to cart buttons', () => {
    render(<ProductCatalog products={mockProducts} onAddToCart={vi.fn()} />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    expect(buttons).toHaveLength(3)
  })

  it('should call onAddToCart with correct product when button is clicked', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()

    render(<ProductCatalog products={mockProducts} onAddToCart={onAddToCart} />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(buttons[0])

    expect(onAddToCart).toHaveBeenCalledWith(mockProducts[0])
    expect(onAddToCart).toHaveBeenCalledTimes(1)
  })

  it('should allow adding multiple different products', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()

    render(<ProductCatalog products={mockProducts} onAddToCart={onAddToCart} />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })

    await user.click(buttons[0]) // Laptop
    await user.click(buttons[1]) // Mouse
    await user.click(buttons[2]) // Keyboard

    expect(onAddToCart).toHaveBeenCalledTimes(3)
    expect(onAddToCart).toHaveBeenNthCalledWith(1, mockProducts[0])
    expect(onAddToCart).toHaveBeenNthCalledWith(2, mockProducts[1])
    expect(onAddToCart).toHaveBeenNthCalledWith(3, mockProducts[2])
  })

  it('should allow adding same product multiple times', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()

    render(<ProductCatalog products={mockProducts} onAddToCart={onAddToCart} />)

    const firstButton = screen.getAllByRole('button', { name: /add.*to cart/i })[0]

    await user.click(firstButton)
    await user.click(firstButton)

    expect(onAddToCart).toHaveBeenCalledTimes(2)
    expect(onAddToCart).toHaveBeenCalledWith(mockProducts[0])
  })

  it('should render empty catalog when no products', () => {
    render(<ProductCatalog products={[]} onAddToCart={vi.fn()} />)

    expect(screen.getByText('Available Products')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /add.*to cart/i })).not.toBeInTheDocument()
  })
})
