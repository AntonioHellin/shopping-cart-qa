import { expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductCatalogPage extends BasePage {
  // Locators
  readonly catalogSection: Locator
  readonly productCards: Locator

  constructor(page: Page) {
    super(page)
    this.catalogSection = page.locator('section').first()
    // Use article tag for semantic product cards (Lesson 26: accessibility improvements)
    this.productCards = this.catalogSection.locator('article')
  }

  // Actions
  async waitForProducts() {
    // Wait for at least one product card to be visible
    await this.productCards.first().waitFor({ state: 'visible', timeout: 5000 })
  }

  async getProductCard(index: number): Promise<Locator> {
    await this.waitForProducts()
    return this.productCards.nth(index)
  }

  async addProductToCart(productIndex: number = 0) {
    const card = await this.getProductCard(productIndex)
    // Button has aria-label with product name, e.g. "Add Laptop to cart for $999.99"
    const addButton = card.getByRole('button', { name: /add.*to cart/i })
    await addButton.click()
  }

  async getProductName(productIndex: number): Promise<string> {
    const card = await this.getProductCard(productIndex)
    const name = card.locator('h3')
    return (await name.textContent()) || ''
  }

  async getProductPrice(productIndex: number): Promise<string> {
    const card = await this.getProductCard(productIndex)
    const price = card.locator('.text-indigo-600').first()
    return (await price.textContent()) || ''
  }

  // Assertions
  async shouldHaveProducts(count: number) {
    await expect(this.productCards).toHaveCount(count)
  }

  async shouldShowProductDetails(productIndex: number) {
    const card = await this.getProductCard(productIndex)
    await expect(card.locator('h3')).toBeVisible()
    await expect(card.locator('.text-indigo-600')).toBeVisible()
    await expect(card.getByRole('button', { name: /add.*to cart/i })).toBeVisible()
  }
}
