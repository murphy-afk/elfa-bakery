import { after, before, describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'

import { startApp, request, stubPoolQuery } from './helpers.js'

const categories = [
  { id: 1, name_it: 'Pizze Classiche', name_en: 'Classic Pizzas', slug: 'pizze-classiche', position: 1 },
  { id: 2, name_it: 'Bagel', name_en: 'Bagels', slug: 'bagel', position: 2 }
]

const items = [
  {
    id: 10,
    category_id: 1,
    name_it: 'Diavola',
    name_en: 'Diavola',
    description_it: 'Pomodoro, mozzarella e salame piccante',
    description_en: 'Tomato, mozzarella and spicy salami',
    price: null,
    image_url: null,
    is_featured: 1,
    position: 1
  },
  {
    id: 11,
    category_id: 2,
    name_it: 'Bagel con salmone',
    name_en: 'Salmon bagel',
    description_it: 'Salmone, formaggio ed uovo',
    description_en: 'Salmon, cheese and egg',
    price: null,
    image_url: null,
    is_featured: 1,
    position: 1
  }
]

let dbFails = false

// Answers from the fixture above. Unknown SQL fails loudly, so a new
// query in a route has to be added here on purpose.
async function poolHandler(sql, params) {
  if (dbFails) {
    throw new Error('connect ECONNREFUSED 127.0.0.1:3306')
  }

  if (sql.includes('FROM categories') && sql.includes('WHERE slug')) {
    return categories.filter((category) => category.slug === params.slug)
  }
  if (sql.includes('FROM categories')) {
    return categories
  }
  if (sql.includes('WHERE category_id')) {
    return items.filter((item) => item.category_id === params.id)
  }
  if (sql.includes('FROM items')) {
    return items
  }

  throw new Error(`Unexpected query in test: ${sql}`)
}

let ctx
let restorePool

before(async () => {
  ctx = await startApp()
  restorePool = stubPoolQuery(poolHandler)
})

after(async () => {
  restorePool()
  await ctx.close()
})

describe('GET /api/menu', () => {
  it('lists every category with its own items', async () => {
    const { status, body } = await request(ctx.base, '/api/menu')
    assert.equal(status, 200)
    assert.equal(body.length, 2)
    assert.deepEqual(
      body.map((category) => category.slug),
      ['pizze-classiche', 'bagel']
    )
    assert.deepEqual(
      body.map((category) => category.items.map((item) => item.name_it)),
      [['Diavola'], ['Bagel con salmone']]
    )
  })

  it('keeps a price that is still missing as null', async () => {
    const { body } = await request(ctx.base, '/api/menu')
    const prices = body.flatMap((category) => category.items.map((item) => item.price))
    assert.deepEqual(prices, [null, null])
  })
})

describe('GET /api/menu/:slug', () => {
  it('returns one category with its items', async () => {
    const { status, body } = await request(ctx.base, '/api/menu/bagel')
    assert.equal(status, 200)
    assert.equal(body.slug, 'bagel')
    assert.equal(body.name_it, 'Bagel')
    assert.equal(body.items.length, 1)
    assert.equal(body.items[0].name_it, 'Bagel con salmone')
  })

  it('answers 404 for a slug that does not exist', async () => {
    const { status, body } = await request(ctx.base, '/api/menu/non-esiste')
    assert.equal(status, 404)
    assert.deepEqual(body, { error: 'Category not found' })
  })
})

describe('database failures', () => {
  it('answers 500 without leaking the driver error', async () => {
    dbFails = true
    const log = mock.method(console, 'error', () => {})

    try {
      const { status, body } = await request(ctx.base, '/api/menu')
      assert.equal(status, 500)
      assert.deepEqual(body, { error: 'Internal server error' })
      assert.ok(!JSON.stringify(body).includes('ECONNREFUSED'))
      assert.ok(!JSON.stringify(body).includes('stack'))
    } finally {
      log.mock.restore()
      dbFails = false
    }
  })
})
