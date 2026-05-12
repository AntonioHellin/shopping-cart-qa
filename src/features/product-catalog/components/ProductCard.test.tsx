import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ProductCard } from './ProductCard'
import type { Product } from '@shared/types'

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    emoji: '💻'
  }

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />)
    expect(screen.getByText('Laptop')).toBeInTheDocument()
  })

  it('should render product description', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />)
    expect(screen.getByText('High-performance laptop')).toBeInTheDocument()
  })

  it('should render product emoji', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />)
    expect(screen.getByText('💻')).toBeInTheDocument()
  })

  it('should render formatted price', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />)
    expect(screen.getByText('$999.99')).toBeInTheDocument()
  })

  it('should render add to cart button', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />)
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('should call onAddToCart when button is clicked', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    await user.click(button)

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
    expect(onAddToCart).toHaveBeenCalledTimes(1)
  })
})
