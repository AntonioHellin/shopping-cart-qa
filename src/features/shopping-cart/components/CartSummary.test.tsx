import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartSummary } from './CartSummary'

describe('CartSummary', () => {
  it('should display formatted subtotal', () => {
    render(<CartSummary subtotal={1059.97} />)
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getByText('$1,059.97')).toBeInTheDocument()
    // Total will be different due to 15% discount
  })

  it('should display discount as $0.00 when subtotal is 0', () => {
    render(<CartSummary subtotal={0} />)
    expect(screen.getByText('Discount')).toBeInTheDocument()
    expect(screen.getByText('-$0.00')).toBeInTheDocument()
  })

  it('should display total matching subtotal when no discount', () => {
    render(<CartSummary subtotal={50} />)
    expect(screen.getByText('Total')).toBeInTheDocument()
    // Under $100, no discount applied
    expect(screen.getAllByText('$50.00')).toHaveLength(2)
  })

  it('should apply 15% discount for orders $100+', () => {
    render(<CartSummary subtotal={100} />)
    expect(screen.getByText('$100.00')).toBeInTheDocument() // Subtotal
    expect(screen.getByText('-$15.00')).toBeInTheDocument() // 15% discount
    expect(screen.getByText('$85.00')).toBeInTheDocument() // Total after discount
  })

  it('should render checkout button', () => {
    render(<CartSummary subtotal={100} />)
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument()
  })

  it('should disable checkout button when subtotal is 0', () => {
    render(<CartSummary subtotal={0} />)
    const button = screen.getByRole('button', { name: /cart is empty|proceed to checkout/i })
    expect(button).toBeDisabled()
  })

  it('should enable checkout button when subtotal is greater than 0', () => {
    render(<CartSummary subtotal={100} />)
    const button = screen.getByRole('button', { name: /proceed to checkout/i })
    expect(button).not.toBeDisabled()
  })
})
