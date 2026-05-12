/**
 * Formats a number as a US dollar currency string
 *
 * Uses Intl.NumberFormat for locale-aware currency formatting with proper
 * decimal places and thousand separators.
 *
 * @param price - Price in dollars (e.g., 99.99 for $99.99)
 * @returns Formatted price string with $ symbol (e.g., "$99.99")
 *
 * @example
 * ```typescript
 * formatPrice(99.99)    // Returns: "$99.99"
 * formatPrice(1000)     // Returns: "$1,000.00"
 * formatPrice(0.99)     // Returns: "$0.99"
 * formatPrice(0)        // Returns: "$0.00"
 * ```
 *
 * @remarks
 * - Always displays exactly 2 decimal places
 * - Adds thousand separators (commas) for large numbers
 * - Handles negative numbers with "-" prefix
 * - Uses US locale formatting (en-US)
 *
 * @see {@link calculateSubtotal} for calculating the price to format
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
