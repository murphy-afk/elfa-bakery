import { after, before, describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'

import { startApp, request, stubPoolQuery } from './helpers.js'

let ctx

before(async () => {
  ctx = await startApp()
})

after(async () => {
  await ctx.close()
})

// Every route in this file runs a single SELECT, so each block swaps in
// its own stub and removes it again.
function stubFor(rows) {
  return stubPoolQuery(async () => rows)
}

describe('GET /api/allergens', () => {
  let restore

  before(() => {
    restore = stubFor([
      { id: 1, code: 1, name_it: 'Cereali contenenti glutine', name_en: 'Cereals containing gluten' },
      { id: 2, code: 2, name_it: 'Crostacei e prodotti a base di crostacei', name_en: 'Crustaceans' },
      { id: 14, code: 14, name_it: 'Molluschi e prodotti a base di molluschi', name_en: 'Molluscs' }
    ])
  })

  after(() => restore())

  it('returns the allergen list in code order', async () => {
    const { status, body } = await request(ctx.base, '/api/allergens')
    assert.equal(status, 200)
    assert.equal(body.length, 3)
    assert.deepEqual(
      body.map((allergen) => allergen.code),
      [1, 2, 14]
    )
    assert.equal(body[0].name_it, 'Cereali contenenti glutine')
  })

  it('answers 500 without leaking the driver error', async () => {
    restore()
    restore = stubPoolQuery(async () => {
      throw new Error('connect ECONNREFUSED 127.0.0.1:3306')
    })
    const log = mock.method(console, 'error', () => {})

    try {
      const { status, body } = await request(ctx.base, '/api/allergens')
      assert.equal(status, 500)
      assert.deepEqual(body, { error: 'Internal server error' })
    } finally {
      log.mock.restore()
      restore()
      restore = stubFor([])
    }
  })
})

describe('GET /api/settings', () => {
  let restore

  before(() => {
    restore = stubFor([
      { setting_key: 'name', setting_value: 'Elfa Bakery' },
      { setting_key: 'email', setting_value: '' },
      { setting_key: 'latitude', setting_value: '45.461527' }
    ])
  })

  after(() => restore())

  it('turns the rows into a key value object', async () => {
    const { status, body } = await request(ctx.base, '/api/settings')
    assert.equal(status, 200)
    assert.equal(body.name, 'Elfa Bakery')
    assert.equal(body.latitude, '45.461527')
    assert.ok(!('missing_key' in body))
  })

  it('keeps an empty setting instead of dropping it', async () => {
    const { body } = await request(ctx.base, '/api/settings')
    assert.equal(body.email, '')
  })
})

describe('GET /api/hours', () => {
  let restore

  before(() => {
    restore = stubFor([
      {
        day_index: 0,
        day_name_it: 'Domenica',
        day_name_en: 'Sunday',
        opens: '05:30:00',
        closes: '21:00:00',
        is_open_all_day: 0,
        is_closed: 0,
        note: null
      },
      {
        day_index: 1,
        day_name_it: 'Lunedì',
        day_name_en: 'Monday',
        opens: null,
        closes: null,
        is_open_all_day: 1,
        is_closed: 0,
        note: null
      }
    ])
  })

  after(() => restore())

  it('returns the days with their time slots', async () => {
    const { status, body } = await request(ctx.base, '/api/hours')
    assert.equal(status, 200)
    assert.equal(body[0].day_name_it, 'Domenica')
    assert.equal(body[0].opens, '05:30:00')
    assert.equal(body[0].closes, '21:00:00')
    assert.equal(body[0].note, null)
    assert.equal(body[1].is_open_all_day, 1)
    assert.equal(body[1].opens, null)
  })
})

describe('GET /api/gallery', () => {
  let restore

  before(() => {
    restore = stubFor([])
  })

  after(() => restore())

  it('answers with an empty list while the owner sends no photos', async () => {
    const { status, body } = await request(ctx.base, '/api/gallery')
    assert.equal(status, 200)
    assert.deepEqual(body, [])
  })

  it('returns the photos in position order', async () => {
    restore()
    restore = stubFor([
      { id: 1, image_url: '/uploads/counter.webp', alt_it: 'Il banco', alt_en: 'The counter', position: 1 },
      { id: 2, image_url: '/uploads/pizza.webp', alt_it: 'La pizza', alt_en: 'The pizza', position: 2 }
    ])

    const { status, body } = await request(ctx.base, '/api/gallery')
    assert.equal(status, 200)
    assert.deepEqual(
      body.map((image) => image.position),
      [1, 2]
    )
    assert.equal(body[0].alt_it, 'Il banco')
  })
})
