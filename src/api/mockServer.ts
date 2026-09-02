import express from 'express'

export const app = express()
app.disable('x-powered-by')
app.use(express.json())

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
