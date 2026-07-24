import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('cart with item should match visual baseline', async ({ page }) => {
    // 1. Navigate to home
    await page.goto('/');

    // 2. Add the first product to the cart
    await page.getByRole('button', { name: /add to cart/i }).first().click();

    // 3. Wait for cart count to update to "1 items" (synchronization)
    await expect(page.getByText('1 items')).toBeVisible();

    // 4. Capture screenshot and compare with baseline
    await expect(page).toHaveScreenshot('cart-with-item.png', {
      maxDiffPixels: 100,
    });
  });
});
