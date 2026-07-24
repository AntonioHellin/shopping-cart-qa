import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('user can add a product to the cart', async ({ page }) => {
    // 1. Navigate to home
    await page.goto('/');

    // 2. Verify the product catalog loaded
    await expect(page.getByRole('heading', { name: /available products/i })).toBeVisible();

    // 3. Add the first product to the cart
    await page.getByRole('button', { name: /add to cart/i }).first().click();

    // 4. Verify the cart summary is visible and shows the product
    await expect(page.getByTestId('cart-summary')).toBeVisible();
    await expect(page.getByRole('button', { name: /proceed to checkout/i })).toBeEnabled();
  });
});
