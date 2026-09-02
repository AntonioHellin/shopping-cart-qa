import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { Server } from 'http'
import { app } from './mockServer'

describe('mockServer Rate Limiter', () => {
  let server: Server
  let baseUrl: string

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address()
        if (address && typeof address === 'object') {
          baseUrl = `http://127.0.0.1:${address.port}`
        }
        resolve()
      })
    })
  })

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()))
    })
  })

  it('allows 5 requests and blocks the 6th with 429 Too Many Requests', async () => {
    for (let i = 1; i <= 5; i++) {
      const res = await fetch(`${baseUrl}/api/cart`)
      expect(res.status).toBe(200)
    }

    const res6 = await fetch(`${baseUrl}/api/cart`)
    expect(res6.status).toBe(429)
    const text = await res6.text()
    expect(text).toBe('Too many requests, please try again later')
  })
})
