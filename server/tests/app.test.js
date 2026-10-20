import { after, before, describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { startApp, request } from './helpers.js'

let ctx

before(async () => {
  ctx = await startApp()
})

after(async () => {
  await ctx.close()
})

describe('GET /api/health', () => {
  it('answers 200 with a status object', async () => {
    const { status, body } = await request(ctx.base, '/api/health')
    assert.equal(status, 200)
    assert.deepEqual(body, { status: 'ok' })
  })
})

describe('security headers', () => {
  it('sends the helmet defaults', async () => {
    const { headers } = await request(ctx.base, '/api/health')
    assert.equal(headers.get('x-content-type-options'), 'nosniff')
    assert.equal(headers.get('x-frame-options'), 'SAMEORIGIN')
    assert.match(headers.get('content-security-policy'), /default-src 'self'/)
  })

  it('rate limits the api', async () => {
    const { headers } = await request(ctx.base, '/api/health')
    assert.equal(headers.get('ratelimit-limit'), '200')
    assert.equal(headers.get('ratelimit-policy'), '200;w=900')
  })
})

describe('CORS', () => {
  it('allows the configured site origin', async () => {
    const { headers } = await request(ctx.base, '/api/health', {
      headers: { Origin: 'http://localhost:5173' }
    })
    assert.equal(headers.get('access-control-allow-origin'), 'http://localhost:5173')
  })

  it('pins the allowed origin to the configured site', async () => {
    const { headers } = await request(ctx.base, '/api/health', {
      headers: { Origin: 'https://example.com' }
    })
    // The header never echoes a foreign origin, so a browser blocks the
    // response. Only the configured dev origin gets the matching header.
    assert.notEqual(headers.get('access-control-allow-origin'), 'https://example.com')
    assert.equal(headers.get('access-control-allow-origin'), 'http://localhost:5173')
    assert.match(headers.get('vary'), /Origin/)
  })
})

describe('unknown routes', () => {
  it('answers 404 with a json error', async () => {
    const { status, body } = await request(ctx.base, '/api/questo-non-esiste')
    assert.equal(status, 404)
    assert.deepEqual(body, { error: 'Not found' })
  })

  it('answers 404 outside the api prefix', async () => {
    const { status, body } = await request(ctx.base, '/altro')
    assert.equal(status, 404)
    assert.deepEqual(body, { error: 'Not found' })
  })
})
