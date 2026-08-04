import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getMetricCount,
  setMetricCount,
  trackAbandonmentRate,
  logConversionRate,
  trackAddToCart,
  trackCheckout,
} from './metrics'

describe('metrics utility (Cart Abandonment Rate & Conversion Rate)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should initialize metric count to 0 if not set in localStorage', () => {
    expect(getMetricCount('addToCartCount')).toBe(0)
    expect(getMetricCount('checkoutCount')).toBe(0)
  })

  it('should store and retrieve metric counts from localStorage', () => {
    setMetricCount('addToCartCount', 5)
    expect(getMetricCount('addToCartCount')).toBe(5)
  })

  it('should log 0.0% abandonment and normal status when addToCartCount is 0', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const rate = trackAbandonmentRate()

    expect(rate).toBe(0)
    expect(consoleSpy).toHaveBeenCalledWith('🔍 Cart Abandonment: 0.0%')
    expect(consoleSpy).toHaveBeenCalledWith('✅ Abandono normal')
  })

  it('should calculate ~80% abandonment rate and warn high abandonment for 5 adds and 1 checkout', () => {
    setMetricCount('addToCartCount', 5)
    setMetricCount('checkoutCount', 1)

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const rate = trackAbandonmentRate()

    expect(rate).toBe(80)
    expect(consoleLogSpy).toHaveBeenCalledWith('🔍 Cart Abandonment: 80.0%')
    expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️ ABANDONO ALTO: Revisar precios/UX')
  })

  describe('logConversionRate dashboard', () => {
    it('should log "25.5% 🟡 NORMAL" for 47 addToCart and 12 checkouts', () => {
      setMetricCount('addToCartCount', 47)
      setMetricCount('checkoutCount', 12)

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      const rate = logConversionRate()

      expect(rate).toBeCloseTo(25.5319, 2)
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Conversion Rate: 25.5% 🟡 NORMAL\nAdd to Cart: 47\nCheckouts: 12'
      )
    })

    it('should log "🟢 EXCELENTE" for >= 30% conversion rate', () => {
      setMetricCount('addToCartCount', 10)
      setMetricCount('checkoutCount', 4)

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logConversionRate()

      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Conversion Rate: 40.0% 🟢 EXCELENTE\nAdd to Cart: 10\nCheckouts: 4'
      )
    })

    it('should log "🔴 CRÍTICO" for < 10% conversion rate', () => {
      setMetricCount('addToCartCount', 100)
      setMetricCount('checkoutCount', 5)

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logConversionRate()

      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Conversion Rate: 5.0% 🔴 CRÍTICO\nAdd to Cart: 100\nCheckouts: 5'
      )
    })
  })

  it('should increment addToCartCount when trackAddToCart is called', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})

    trackAddToCart()
    expect(getMetricCount('addToCartCount')).toBe(1)

    trackAddToCart()
    expect(getMetricCount('addToCartCount')).toBe(2)
  })

  it('should increment checkoutCount when trackCheckout is called', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    setMetricCount('addToCartCount', 5)

    trackCheckout()
    expect(getMetricCount('checkoutCount')).toBe(1)
  })
})
