import express from 'express'
import rateLimit from 'express-rate-limit'

export const app = express()
app.disable('x-powered-by')
app.use(express.json())

const cartLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // 5 requests por minuto por IP
  message: 'Too many requests, please try again later'
})

app.use('/api/cart', cartLimiter)

const items: unknown[] = []

app.get('/api/cart', (_req, res) => {
  res.status(200).json({ ok: true, items })
})

app.post('/api/cart', (req, res) => {
  items.push(req.body)
  res.status(201).json({ ok: true, items })
})

app.delete('/api/cart', (_req, res) => {
  items.length = 0
  res.status(200).json({ ok: true, items })
})

app.get('/api/products/search', (req, res) => {
  const query = String(req.query.q ?? '')
  // Intentionally naive fixture for the security lesson.
  res.json({ query, sql: `SELECT * FROM products WHERE name LIKE '%${query}%'` })
})
