import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import App from './App'

describe('App Integration', () => {
  it('should render header with correct title', () => {
    render(<App />)

    expect(screen.getByText('🛒 Product Shop')).toBeInTheDocument()
    expect(screen.getByText('Your one-stop shop for tech products')).toBeInTheDocument()
  })

  it('should start with empty cart', () => {
    render(<App />)

    expect(screen.getByText('0 items')).toBeInTheDocument()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('should display all products from catalog', () => {
    render(<App />)

    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument()
    expect(screen.getByText('Keyboard')).toBeInTheDocument()
    expect(screen.getByText('Monitor 27"')).toBeInTheDocument()
  })

  it('should add item to cart when add to cart button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Initially 0 items
    expect(screen.getByText('0 items')).toBeInTheDocument()

    // Click first add to cart button (Laptop)
    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(addButtons[0])

    // Now 1 item
    expect(screen.getByText('1 items')).toBeInTheDocument()
    // Laptop appears in both catalog and cart
    expect(screen.getAllByText('Laptop').length).toBeGreaterThan(1)
  })

  it('should increment quantity when same product is added multiple times', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })

    // Add laptop twice
    await user.click(addButtons[0])
    await user.click(addButtons[0])

    expect(screen.getByText('2 items')).toBeInTheDocument()
    const input = screen.getByRole('spinbutton', { name: /quantity for laptop/i })
    expect(input).toBeInTheDocument()
  })

  it('should add multiple different products to cart', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })

    // Add laptop and mouse
    await user.click(addButtons[0]) // Laptop
    await user.click(addButtons[1]) // Mouse

    expect(screen.getByText('2 items')).toBeInTheDocument()

    // Both products should be in cart
    const laptopInCart = screen.getAllByText('Laptop')
    const mouseInCart = screen.getAllByText('Wireless Mouse')
    expect(laptopInCart.length).toBeGreaterThan(1) // In catalog + cart
    expect(mouseInCart.length).toBeGreaterThan(1)
  })

  it('should calculate correct subtotal for multiple items', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })

    // Add laptop ($999.99) and mouse ($29.99)
    await user.click(addButtons[0])
    await user.click(addButtons[1])

    // Total should be 1029.98
    expect(screen.getAllByText('$1,029.98').length).toBeGreaterThan(0)
  })

  it('should remove item from cart when remove button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add an item first
    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(addButtons[0]) // Add Laptop

    expect(screen.getByText('1 items')).toBeInTheDocument()

    // Remove it - now matches new aria-label
    const removeButton = screen.getByRole('button', { name: /remove.*from cart/i })
    await user.click(removeButton)

    // Cart should be empty again
    expect(screen.getByText('0 items')).toBeInTheDocument()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('should enable checkout button when cart has items', async () => {
    const user = userEvent.setup()
    render(<App />)

    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout|cart is empty/i })
    expect(checkoutButton).toBeDisabled()

    // Add item
    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(addButtons[0])

    expect(checkoutButton).not.toBeDisabled()
  })

  it('should update cart count in real-time when items are added', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })

    expect(screen.getByText('0 items')).toBeInTheDocument()

    await user.click(addButtons[0])
    expect(screen.getByText('1 items')).toBeInTheDocument()

    await user.click(addButtons[1])
    expect(screen.getByText('2 items')).toBeInTheDocument()

    await user.click(addButtons[0]) // Add first item again
    expect(screen.getByText('3 items')).toBeInTheDocument()
  })

  it('should display correct quantity badge in header', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addButtons = screen.getAllByRole('button', { name: /add.*to cart/i })

    // Add 2 of same item + 1 of different item
    await user.click(addButtons[0]) // Laptop
    await user.click(addButtons[0]) // Laptop again
    await user.click(addButtons[1]) // Mouse

    // Cart badge shows 3 (2 + 1)
    const cartBadge = screen.getAllByText('3')
    expect(cartBadge.length).toBeGreaterThan(0)
  })

  it('should render footer with tech stack info', () => {
    render(<App />)

    expect(screen.getByText(/built with ❤️ for ai course/i)).toBeInTheDocument()
    expect(screen.getByText(/react 19 \+ typescript \+ tailwind css/i)).toBeInTheDocument()
  })
})
