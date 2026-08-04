const ADD_TO_CART_KEY = 'addToCartCount'
const CHECKOUT_KEY = 'checkoutCount'

export const getMetricCount = (key: string): number => {
  if (typeof localStorage === 'undefined') return 0
  const value = localStorage.getItem(key)
  return value ? parseInt(value, 10) || 0 : 0
}

export const setMetricCount = (key: string, count: number): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, count.toString())
  }
}

export const incrementMetricCount = (key: string): number => {
  const current = getMetricCount(key)
  const next = current + 1
  setMetricCount(key, next)
  return next
}

export const trackAbandonmentRate = (): number => {
  const addToCartCount = getMetricCount(ADD_TO_CART_KEY)
  const checkoutCount = getMetricCount(CHECKOUT_KEY)

  if (addToCartCount === 0) {
    console.log('🔍 Cart Abandonment: 0.0%')
    console.log('✅ Abandono normal')
    return 0
  }

  const rate = ((addToCartCount - checkoutCount) / addToCartCount) * 100
  const formattedRate = rate.toFixed(1)

  console.log(`🔍 Cart Abandonment: ${formattedRate}%`)

  if (rate > 70) {
    console.warn('⚠️ ABANDONO ALTO: Revisar precios/UX')
  } else if (rate >= 50) {
    console.log('⚠️ Abandono moderado')
  } else {
    console.log('✅ Abandono normal')
  }

  return rate
}

export const logConversionRate = (): number => {
  const addToCartCount = getMetricCount(ADD_TO_CART_KEY)
  const checkoutCount = getMetricCount(CHECKOUT_KEY)

  const rate = addToCartCount === 0 ? 0 : (checkoutCount / addToCartCount) * 100
  const formattedRate = rate.toFixed(1)

  let status = '🔴 CRÍTICO'
  if (rate >= 30) {
    status = '🟢 EXCELENTE'
  } else if (rate >= 10) {
    status = '🟡 NORMAL'
  }

  console.log(
    `📊 Conversion Rate: ${formattedRate}% ${status}\nAdd to Cart: ${addToCartCount}\nCheckouts: ${checkoutCount}`
  )

  return rate
}

export const trackAddToCart = (): number => {
  incrementMetricCount(ADD_TO_CART_KEY)
  logConversionRate()
  return trackAbandonmentRate()
}

export const trackCheckout = (): number => {
  incrementMetricCount(CHECKOUT_KEY)
  logConversionRate()
  return trackAbandonmentRate()
}
