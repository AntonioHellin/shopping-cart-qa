import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getMetricCount,
  setMetricCount,
  trackAbandonmentRate,
  trackAddToCart,
  trackCheckout,
} from './metrics'

describe('metrics utility (Cart Abandonment Rate)', () => {
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

  it('should calculate 50% abandonment rate and log moderate abandonment for 2 adds and 1 checkout', () => {
    setMetricCount('addToCartCount', 2)
    setMetricCount('checkoutCount', 1)

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const rate = trackAbandonmentRate()

    expect(rate).toBe(50)
    expect(consoleLogSpy).toHaveBeenCalledWith('🔍 Cart Abandonment: 50.0%')
    expect(consoleLogSpy).toHaveBeenCalledWith('⚠️ Abandono moderado')
  })

  it('should calculate 25% abandonment rate and log normal abandonment for 4 adds and 3 checkouts', () => {
    setMetricCount('addToCartCount', 4)
    setMetricCount('checkoutCount', 3)

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const rate = trackAbandonmentRate()

    expect(rate).toBe(25)
    expect(consoleLogSpy).toHaveBeenCalledWith('🔍 Cart Abandonment: 25.0%')
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ Abandono normal')
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
