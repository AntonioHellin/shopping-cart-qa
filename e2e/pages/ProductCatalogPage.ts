import { expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductCatalogPage extends BasePage {
  // Locators
  readonly catalogSection: Locator
  readonly productCards: Locator

  constructor(page: Page) {
    super(page)
    this.catalogSection = page.locator('section').first()
    // More specific selector to avoid matching login demo
    this.productCards = this.catalogSection.locator('.bg-white.p-6.rounded-xl')
  }

  // Actions
  async getProductCard(index: number): Promise<Locator> {
    return this.productCards.nth(index)
  }

  async addProductToCart(productIndex: number = 0) {
    const card = await this.getProductCard(productIndex)
    const addButton = card.getByRole('button', { name: /add to cart/i })
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
    await expect(card.getByRole('button', { name: /add to cart/i })).toBeVisible()
  }
}
