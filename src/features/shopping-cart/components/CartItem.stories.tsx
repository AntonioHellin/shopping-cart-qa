import type { Meta, StoryObj } from '@storybook/react'
import { CartItem } from './CartItem'
import type { CartItem as CartItemType } from '@shared/types'

/**
 * CartItem Component Stories
 *
 * Displays individual cart items with quantity, price calculation, and remove functionality.
 */
const meta: Meta<typeof CartItem> = {
  title: 'Features/Shopping Cart/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '16px', backgroundColor: '#f9fafb' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CartItem>

// Mock callback for removing items
const handleRemove = (productId: string) => {
  console.log('Remove product:', productId)
}

// Mock cart items
const laptopItem: CartItemType = {
  id: '1',
  name: 'Laptop Pro',
  description: 'High-performance laptop for developers',
  price: 1299.99,
  quantity: 1,
  emoji: '💻',
}

const headphonesItem: CartItemType = {
  id: '2',
  name: 'Wireless Headphones',
  description: 'Noise-canceling bluetooth headphones',
  price: 199.99,
  quantity: 2,
  emoji: '🎧',
}

const bulkItem: CartItemType = {
  id: '3',
  name: 'USB Cable',
  description: 'USB-C charging cable',
  price: 9.99,
  quantity: 10,
  emoji: '🔌',
}

/**
 * Default story showing a cart item with quantity 1
 */
export const Default: Story = {
  args: {
    item: laptopItem,
    onRemove: handleRemove,
  },
}

/**
 * Story showing a cart item with multiple quantities
 */
export const MultipleQuantity: Story = {
  args: {
    item: headphonesItem,
    onRemove: handleRemove,
  },
}

/**
 * Story showing bulk purchase (10+ items)
 * Demonstrates price calculation for large quantities
 */
export const BulkPurchase: Story = {
  args: {
    item: bulkItem,
    onRemove: handleRemove,
  },
}
