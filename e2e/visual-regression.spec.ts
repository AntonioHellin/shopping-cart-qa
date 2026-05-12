import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { ProductCatalogPage } from './pages/ProductCatalogPage'

test.describe('Visual Regression Testing', () => {
  test('should match empty cart baseline', async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.open()
    await homePage.shouldBeVisible()

    // Take screenshot of empty cart state
    await expect(page).toHaveScreenshot('empty-cart.png')
  })

  test('should match cart with items baseline', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)

    await homePage.open()

    // Add product to cart
    await catalogPage.addProductToCart(0)

    // Wait for cart to update
    await homePage.shouldHaveCartCount(1)

    // Take screenshot with item in cart
    await expect(page).toHaveScreenshot('cart-with-item.png')
  })

  test('should match product catalog baseline', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)

    await homePage.open()
    await catalogPage.shouldHaveProducts(4)

    // Take screenshot of product catalog
    await expect(page).toHaveScreenshot('product-catalog.png')
  })
})
