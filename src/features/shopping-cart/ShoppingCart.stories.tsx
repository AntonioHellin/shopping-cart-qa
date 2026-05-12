import type { Meta, StoryObj } from '@storybook/react'
import { ShoppingCart } from './ShoppingCart'
import type { CartItem } from '@shared/types'

/**
 * ShoppingCart Component Stories
 *
 * Main shopping cart container that displays cart items, total, and handles item removal.
 * Tracks business metrics with Sentry.
 */
const meta: Meta<typeof ShoppingCart> = {
  title: 'Features/Shopping Cart/ShoppingCart',
  component: ShoppingCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '450px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ShoppingCart>

// Mock callback for removing items
const handleRemoveItem = (productId: string) => {
  console.log('Remove product:', productId)
}

// Mock cart items
const sampleItems: CartItem[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'High-performance laptop for developers',
    price: 1299.99,
    quantity: 1,
    emoji: '💻',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-canceling bluetooth headphones',
    price: 199.99,
    quantity: 2,
    emoji: '🎧',
  },
  {
    id: '3',
    name: 'USB Cable',
    description: 'USB-C charging cable',
    price: 9.99,
    quantity: 3,
    emoji: '🔌',
  },
]

const manyItems: CartItem[] = [
  ...sampleItems,
  {
    id: '4',
    name: 'Mouse',
    description: 'Wireless gaming mouse',
    price: 49.99,
    quantity: 1,
    emoji: '🖱️',
  },
  {
    id: '5',
    name: 'Keyboard',
    description: 'Mechanical keyboard',
    price: 79.99,
    quantity: 1,
    emoji: '⌨️',
  },
]

/**
 * Empty cart state
 * Shows placeholder message when no items are in cart
 */
export const EmptyCart: Story = {
  args: {
    items: [],
    onRemoveItem: handleRemoveItem,
  },
}

/**
 * Cart with few items
 * Typical shopping cart with 3 items
 */
export const WithItems: Story = {
  args: {
    items: sampleItems,
    onRemoveItem: handleRemoveItem,
  },
}

/**
 * Cart with many items
 * Shows scrolling behavior with 5+ items
 */
export const WithManyItems: Story = {
  args: {
    items: manyItems,
    onRemoveItem: handleRemoveItem,
  },
}

/**
 * Single item cart
 * Minimal cart with only one product
 */
export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
    onRemoveItem: handleRemoveItem,
  },
}
