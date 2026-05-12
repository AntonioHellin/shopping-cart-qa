import { expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ShoppingCartPage extends BasePage {
  // Locators
  readonly cartSection: Locator
  readonly cartHeader: Locator
  readonly cartBadge: Locator
  readonly cartItems: Locator
  readonly emptyCartMessage: Locator
  readonly subtotalLabel: Locator
  readonly totalLabel: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    super(page)
    this.cartSection = page.locator('section').last()
    this.cartHeader = page.getByRole('heading', { name: /shopping cart/i })
    this.cartBadge = this.cartSection.locator('.bg-indigo-600.text-white')
    // More specific selector scoped to cart section only
    this.cartItems = this.cartSection.locator('.bg-gray-50.rounded-lg')
    this.emptyCartMessage = page.getByText('Your cart is ready for items!')
    this.subtotalLabel = page.getByText('Subtotal')
    this.totalLabel = page.getByText('Total')
    // Button has different aria-label based on cart state
    this.checkoutButton = page.getByRole('button', { name: /proceed to checkout|cart is empty/i })
  }

  // Actions
  async removeItem(itemIndex: number = 0) {
    const removeButton = this.cartItems.nth(itemIndex).getByRole('button', { name: /remove/i })
    await removeButton.click()
  }

  async getItemName(itemIndex: number): Promise<string> {
    const item = this.cartItems.nth(itemIndex)
    const name = item.locator('h4')
    return (await name.textContent()) || ''
  }

  async getItemQuantity(itemIndex: number): Promise<number> {
    const item = this.cartItems.nth(itemIndex)
    const qtyText = await item.getByText(/qty:/i).textContent()
    const match = qtyText?.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent()
    return parseInt(text || '0')
  }

  // Assertions
  async shouldBeEmpty() {
    await expect(this.emptyCartMessage).toBeVisible()
    await expect(this.checkoutButton).toBeDisabled()
  }

  async shouldHaveItems(count: number) {
    await expect(this.cartItems).toHaveCount(count)
  }

  async shouldShowItem(itemName: string) {
    await expect(this.page.getByText(itemName).first()).toBeVisible()
  }

  async shouldHaveBadgeCount(count: number) {
    await expect(this.cartBadge).toHaveText(count.toString())
  }

  async shouldEnableCheckout() {
    await expect(this.checkoutButton).toBeEnabled()
  }

  async shouldShowSubtotal(amount: string) {
    const subtotalRow = this.page.locator('text=Subtotal').locator('..')
    await expect(subtotalRow).toContainText(amount)
  }
}
