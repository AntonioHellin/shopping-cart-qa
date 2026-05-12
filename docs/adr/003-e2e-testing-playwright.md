# ADR-003: Use Playwright for E2E Testing

**Date**: 2025-10-21
**Status**: Accepted
**Deciders**: @team

## Context

Need end-to-end testing solution for shopping cart application to:
- Test complete user journeys (browse → add → checkout)
- Validate cross-browser compatibility
- Visual regression testing
- CI/CD integration

Requirements:
- Multi-browser testing (Chromium, Firefox, WebKit)
- Fast execution in CI
- Good developer experience
- Screenshot/video capture for debugging
- Stable selectors (avoid flaky tests)

## Considered Options

1. **Cypress**
   - Pros: Popular, great DX, time-travel debugging, excellent docs
   - Cons: No real multi-browser testing (only Chrome-based), slower than Playwright

2. **Playwright**
   - Pros: True multi-browser (Chromium, Firefox, WebKit), fast, Microsoft-backed
   - Cons: Newer than Cypress, smaller community

3. **Selenium**
   - Pros: Industry standard, mature, many integrations
   - Cons: Slow, flaky, outdated architecture, poor DX

4. **Testing Library + JSDOM only**
   - Pros: Fast, already using for unit tests
   - Cons: Not a real browser, misses CSS/layout issues, no visual testing

## Decision

Use **Playwright** for E2E testing

## Rationale

- **True multi-browser testing**:
  - Chromium: Chrome, Edge (most users)
  - Firefox: Different rendering engine
  - WebKit: Safari (iOS users)
  - All browsers in parallel

- **Performance**:
  - 21 E2E tests run in ~6 seconds (all browsers)
  - Auto-wait (no manual sleeps = stable tests)
  - Parallel execution by default

- **Modern architecture**:
  - Built for modern web (async/await)
  - Auto-waits for elements
  - Network interception built-in
  - TypeScript-first

- **Developer experience**:
  - Codegen: Record tests visually
  - Trace viewer: Time-travel debugging
  - Screenshot on failure
  - HTML reporter with videos

- **Visual regression**:
  - Built-in screenshot comparison
  - Pixel-perfect diff images
  - Cross-browser visual testing

- **CI-friendly**:
  - Docker images with browsers
  - Runs headless by default
  - Sharded execution for speed

Comparison (21 tests across 3 browsers):
- Playwright: ~18 seconds total
- Cypress: ~45 seconds (Chromium only)
- Selenium: ~2-3 minutes (flaky)

## Consequences

### Positive
+ Multi-browser coverage (Chromium, Firefox, WebKit)
+ Fast execution (~6s for 21 tests)
+ Stable tests (auto-wait, smart selectors)
+ Excellent debugging (trace viewer, screenshots, videos)
+ Visual regression testing built-in
+ CI-optimized (Docker images, parallel execution)
+ Active development (Microsoft-backed)
+ TypeScript support excellent

### Negative
- Newer than Cypress (less Stack Overflow answers)
- Smaller plugin ecosystem than Selenium
- Requires browser binaries (~300MB)
- Learning curve for Page Object Model

## Implementation Details

**Test structure**:
```typescript
// e2e/shopping-journey.spec.ts
test('should complete shopping flow', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Add to Cart' }).click()
  await expect(page.getByText('1 item')).toBeVisible()
})
```

**Page Object Model**:
```typescript
// e2e/pages/CartPage.ts
export class CartPage {
  async addProduct(name: string) {
    await this.page.getByRole('button', { name }).click()
  }
}
```

**Visual regression**:
```typescript
await expect(page).toHaveScreenshot('cart-empty.png')
```

## References

- [Playwright documentation](https://playwright.dev/)
- [Playwright vs Cypress comparison](https://playwright.dev/docs/why-playwright)
- [Playwright best practices](https://playwright.dev/docs/best-practices)
- Course: 21 E2E tests across authentication, shopping, visual regression
