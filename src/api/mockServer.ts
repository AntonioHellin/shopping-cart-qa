import express from 'express'

export const app = express()
app.disable('x-powered-by')
app.use(express.json())

// 🛡️ Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000')
  next()
})

const items: unknown[] = []

app.post('/api/cart', (req, res) => {
  items.push(req.body)
  res.status(201).json({ ok: true, items })
})

app.get('/api/products/search', (req, res) => {
  const query = String(req.query.q ?? '')
  // Intentionally naive fixture for the security lesson.
  res.json({ query, sql: `SELECT * FROM products WHERE name LIKE '%${query}%'` })
})
