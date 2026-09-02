import express from 'express'
import { PRODUCTS } from '../shared/data/products'
import type { Product } from '../shared/types'

export const app = express()
app.disable('x-powered-by')
app.use(express.json())

const items: unknown[] = []

export interface MockDB {
  products: Product[]
  query: (sql: string, params?: unknown[]) => Product[]
  reset: () => void
}

export const db: MockDB = {
  products: [...PRODUCTS],
  reset() {
    this.products = [...PRODUCTS]
  },
  query(sql: string, params: unknown[] = []): Product[] {
    // ✅ SEGURO: Prepared statement con placeholder ?
    // El driver trata los parámetros estrictamente como datos literales, no código ejecutable
    if (sql.includes('?')) {
      const [id] = params
      const targetId = String(id)
      return this.products.filter((p) => p.id === targetId)
    }

    // Simulación del comportamiento vulnerable si se concatenara la query (para fines didácticos)
    if (sql.includes('DROP TABLE products')) {
      this.products = []
      return []
    }
    if (sql.includes('OR 1=1') || sql.includes("OR '1'='1'")) {
      return this.products
    }

    const match = sql.match(/WHERE id = (?:'([^']*)'|(\S+))/)
    if (match) {
      const extractedId = match[1] || match[2]
      return this.products.filter((p) => p.id === extractedId)
    }

    return this.products
  },
}

app.post('/api/cart', (req, res) => {
  items.push(req.body)
  res.status(201).json({ ok: true, items })
})

app.get('/api/products/search', (req, res) => {
  const query = String(req.query.q ?? '')
  // Intentionally naive fixture for the security lesson.
  res.json({ query, sql: `SELECT * FROM products WHERE name LIKE '%${query}%'` })
})

const getProductById = (req: express.Request, res: express.Response) => {
  const { id } = req.params

  // ❌ VULNERABLE:
  // const query = `SELECT * FROM products WHERE id = ${req.params.id}`
  // const rows = db.query(query)

  // ✅ SEGURO: Prepared statement con placeholder ?
  // Parámetros: Array [req.params.id] pasado separadamente
  // Driver escapa: Automáticamente trata input como data, NO código
  const query = 'SELECT * FROM products WHERE id = ?'
  const rows = db.query(query, [id])
  const product = rows[0]

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  return res.json(product)
}

app.get('/products/:id', getProductById)
app.get('/api/products/:id', getProductById)
