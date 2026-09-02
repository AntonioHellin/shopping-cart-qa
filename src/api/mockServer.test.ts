import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { createServer, type Server } from 'http'
import type { AddressInfo } from 'net'
import { app, db } from './mockServer'
import { PRODUCTS } from '../shared/data/products'

describe('mockServer - SQL Injection Mitigation (OWASP A03)', () => {
  let server: Server
  let baseUrl: string

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = createServer(app).listen(0, () => {
        const port = (server.address() as AddressInfo).port
        baseUrl = `http://127.0.0.1:${port}`
        resolve()
      })
    })
  })

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  })

  beforeEach(() => {
    db.reset()
  })

  describe('GET /products/:id (Prepared Statements)', () => {
    it('should return product with id 1 on normal request', async () => {
      const response = await fetch(`${baseUrl}/products/1`)
      expect(response.status).toBe(200)

      const body = await response.json()
      expect(body).toEqual(PRODUCTS[0])
      expect(body.id).toBe('1')
      expect(body.name).toBe('Laptop')
    })

    it('should return product not found on SQL injection attempt "1 OR 1=1"', async () => {
      // Intento de inyección: busca forzar WHERE id = 1 OR 1=1 para retornar todas las filas
      const injectionUrl = `${baseUrl}/products/1%20OR%201=1`
      const response = await fetch(injectionUrl)

      expect(response.status).toBe(404)
      const body = await response.json()
      expect(body).toEqual({ error: 'Product not found' })

      // Verificar que no se retornaron todas las filas
      expect(Array.isArray(body)).toBe(false)
    })

    it('should return product not found and NOT drop table on injection attempt "1\';DROP TABLE products;--"', async () => {
      // Intento de inyección destructiva
      const destructivePayload = encodeURIComponent("1';DROP TABLE products;--")
      const response = await fetch(`${baseUrl}/products/${destructivePayload}`)

      expect(response.status).toBe(404)
      const body = await response.json()
      expect(body).toEqual({ error: 'Product not found' })

      // Validar que la base de datos permanece intacta
      expect(db.products).toHaveLength(PRODUCTS.length)
      expect(db.products[0].name).toBe('Laptop')
    })

    it('should also work for /api/products/:id route', async () => {
      const response = await fetch(`${baseUrl}/api/products/2`)
      expect(response.status).toBe(200)

      const body = await response.json()
      expect(body.id).toBe('2')
    })
  })

  describe('Other endpoints for coverage completeness', () => {
    it('handles POST /api/cart', async () => {
      const item = { id: '1', quantity: 2 }
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })

      expect(response.status).toBe(201)
      const body = await response.json()
      expect(body.ok).toBe(true)
      expect(body.items).toContainEqual(item)
    })

    it('handles GET /api/products/search', async () => {
      const response = await fetch(`${baseUrl}/api/products/search?q=Laptop`)
      expect(response.status).toBe(200)

      const body = await response.json()
      expect(body.query).toBe('Laptop')
      expect(body.sql).toContain('Laptop')
    })
  })
})
