import { expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  // Locators
  readonly header: Locator
  readonly title: Locator
  readonly cartBadge: Locator
  readonly productsHeading: Locator

  constructor(page: Page) {
    super(page)
    this.header = page.locator('header')
    this.title = page.getByText('🛒 Product Shop')
    // Using literal space instead of \s to avoid slow-regex warning
    this.cartBadge = page.getByText(/\d+ items/)
    this.productsHeading = page.getByRole('heading', { name: /available products/i })
  }

  // Actions
  async open() {
    await this.goto('/')
    await this.waitForPageLoad()
  }

  async getCartItemCount(): Promise<number> {
    const text = await this.cartBadge.textContent()
    const match = text?.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  // Assertions
  async shouldBeVisible() {
    await expect(this.title).toBeVisible()
    await expect(this.productsHeading).toBeVisible()
  }

  async shouldHaveCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(`${count} items`)
  }
}
