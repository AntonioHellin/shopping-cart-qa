import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { ShoppingCartPage } from './pages/ShoppingCartPage'

test.describe('Shopping Journey E2E', () => {
  test('should display initial empty state', async ({ page }) => {
    const homePage = new HomePage(page)
    const cartPage = new ShoppingCartPage(page)

    await homePage.open()
    await homePage.shouldBeVisible()
    await homePage.shouldHaveCartCount(0)
    await cartPage.shouldBeEmpty()
  })

  test('should add single product to cart', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)
    const cartPage = new ShoppingCartPage(page)

    await homePage.open()

    // Verify products loaded
    await catalogPage.shouldHaveProducts(4)

    // Add first product
    await catalogPage.addProductToCart(0)

    // Verify cart updated
    await homePage.shouldHaveCartCount(1)
    await cartPage.shouldHaveItems(1)
    await cartPage.shouldHaveBadgeCount(1)
    await cartPage.shouldEnableCheckout()
  })

  test('should add multiple products to cart', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)
    const cartPage = new ShoppingCartPage(page)

    await homePage.open()

    // Add first product (Laptop)
    await catalogPage.addProductToCart(0)
    await cartPage.shouldShowItem('Laptop')

    // Add second product (Mouse)
    await catalogPage.addProductToCart(1)
    await cartPage.shouldShowItem('Wireless Mouse')

    // Verify cart state
    await homePage.shouldHaveCartCount(2)
    await cartPage.shouldHaveItems(2)
    await cartPage.shouldHaveBadgeCount(2)
  })

  test('should increment quantity when adding same product twice', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)
    const cartPage = new ShoppingCartPage(page)

    await homePage.open()

    // Add same product twice
    await catalogPage.addProductToCart(0)
    await catalogPage.addProductToCart(0)

    // Cart should have 1 item with quantity 2
    await homePage.shouldHaveCartCount(2) // Total items
    await cartPage.shouldHaveItems(1) // Unique products
    await cartPage.shouldHaveBadgeCount(2) // Badge shows total quantity

    const quantity = await cartPage.getItemQuantity(0)
    expect(quantity).toBe(2)
  })

  test('should remove product from cart', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)
    const cartPage = new ShoppingCartPage(page)

    await homePage.open()

    // Add product
    await catalogPage.addProductToCart(0)
    await cartPage.shouldHaveItems(1)

    // Remove product
    await cartPage.removeItem(0)

    // Cart should be empty again
    await homePage.shouldHaveCartCount(0)
    await cartPage.shouldBeEmpty()
  })

  test('should calculate correct subtotal', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)
    const cartPage = new ShoppingCartPage(page)

    await homePage.open()

    // Add Laptop ($999.99) and Mouse ($29.99)
    await catalogPage.addProductToCart(0)
    await catalogPage.addProductToCart(1)

    // Verify subtotal
    await cartPage.shouldShowSubtotal('$1,029.98')
  })

  test('should display all product information', async ({ page }) => {
    const homePage = new HomePage(page)
    const catalogPage = new ProductCatalogPage(page)

    await homePage.open()

    // Verify all products show details
    for (let i = 0; i < 4; i++) {
      await catalogPage.shouldShowProductDetails(i)
    }

    // Verify specific product data
    const laptopName = await catalogPage.getProductName(0)
    const laptopPrice = await catalogPage.getProductPrice(0)

    expect(laptopName).toBe('Laptop')
    expect(laptopPrice).toBe('$999.99')
  })
})
