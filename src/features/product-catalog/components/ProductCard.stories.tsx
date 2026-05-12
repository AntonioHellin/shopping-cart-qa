import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './ProductCard'
import type { Product } from '@shared/types'

/**
 * ProductCard Component Stories
 *
 * Displays individual product information with price formatting and XSS protection.
 * Demonstrates various product types and edge cases.
 */
const meta: Meta<typeof ProductCard> = {
  title: 'Features/Product Catalog/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProductCard>

// Mock callback for adding to cart
const handleAddToCart = (product: Product) => {
  console.log('Added to cart:', product)
}

// Mock product data
const laptopProduct: Product = {
  id: '1',
  name: 'Laptop Pro',
  description: 'High-performance laptop for developers',
  price: 1299.99,
  emoji: '💻',
}

const headphonesProduct: Product = {
  id: '2',
  name: 'Wireless Headphones',
  description: 'Noise-canceling bluetooth headphones',
  price: 199.99,
  emoji: '🎧',
}

const cheapProduct: Product = {
  id: '3',
  name: 'USB Cable',
  description: 'USB-C charging cable',
  price: 9.99,
  emoji: '🔌',
}

const expensiveProduct: Product = {
  id: '4',
  name: 'Gaming Setup',
  description: 'Complete gaming workstation',
  price: 4999.99,
  emoji: '🎮',
}

// XSS test product (demonstrates DOMPurify sanitization)
const xssProduct: Product = {
  id: '5',
  name: '<script>alert("XSS")</script>Hacked Product',
  description: '<img src=x onerror=alert("XSS")>This should be safe',
  price: 99.99,
  emoji: '🛡️',
}

/**
 * Default story showing a typical product card
 */
export const Default: Story = {
  args: {
    product: laptopProduct,
    onAddToCart: handleAddToCart,
  },
}

/**
 * Story showing an affordable product
 */
export const AffordableProduct: Story = {
  args: {
    product: headphonesProduct,
    onAddToCart: handleAddToCart,
  },
}

/**
 * Story showing a low-price product
 */
export const CheapProduct: Story = {
  args: {
    product: cheapProduct,
    onAddToCart: handleAddToCart,
  },
}

/**
 * Story showing a premium/expensive product
 */
export const ExpensiveProduct: Story = {
  args: {
    product: expensiveProduct,
    onAddToCart: handleAddToCart,
  },
}

/**
 * Security test story demonstrating XSS protection
 * The malicious scripts should be sanitized by DOMPurify
 */
export const XSSProtection: Story = {
  args: {
    product: xssProduct,
    onAddToCart: handleAddToCart,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates XSS protection. The product name and description contain malicious scripts that are safely sanitized by DOMPurify.',
      },
    },
  },
}
