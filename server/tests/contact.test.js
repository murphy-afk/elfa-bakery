import { after, before, describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'

import { startApp, postJson, request } from './helpers.js'

let ctx

before(async () => {
  ctx = await startApp()
})

after(async () => {
  await ctx.close()
})

const validMessage = {
  name: 'Marco',
  email: 'marco@example.com',
  message: 'Vorrei sapere se aprete anche domenica mattina.'
}

function fieldsOf(body) {
  return body.errors.map((error) => error.field)
}

describe('POST /api/contact', () => {
  it('accepts a valid message', async () => {
    const { status, body } = await postJson(ctx.base, '/api/contact', validMessage)
    assert.equal(status, 201)
    assert.deepEqual(body, { ok: true })
  })

  it('rejects a missing name', async () => {
    const { status, body } = await postJson(ctx.base, '/api/contact', {
      ...validMessage,
      name: '   '
    })
    assert.equal(status, 400)
    assert.deepEqual(fieldsOf(body), ['name'])
    assert.equal(body.errors[0].message, 'Il nome è obbligatorio')
  })

  it('rejects a missing email', async () => {
    const { status, body } = await postJson(ctx.base, '/api/contact', {
      ...validMessage,
      email: ''
    })
    assert.equal(status, 400)
    assert.deepEqual(fieldsOf(body), ['email'])
  })

  it('rejects an email that is not an address', async () => {
    const { status, body } = await postJson(ctx.base, '/api/contact', {
      ...validMessage,
      email: 'questa-non-e-una-email'
    })
    assert.equal(status, 400)
    assert.deepEqual(fieldsOf(body), ['email'])
  })

  it('rejects a message that is too short', async () => {
    const { status, body } = await postJson(ctx.base, '/api/contact', {
      ...validMessage,
      message: 'ciao'
    })
    assert.equal(status, 400)
    assert.deepEqual(fieldsOf(body), ['message'])
  })

  it('lists every invalid field at once', async () => {
    const { status, body } = await postJson(ctx.base, '/api/contact', {
      name: '',
      email: 'nope',
      message: 'too short'
    })
    assert.equal(status, 400)
    assert.deepEqual(fieldsOf(body), ['name', 'email', 'message'])
  })

  it('rejects a body that is not valid json', async () => {
    const log = mock.method(console, 'error', () => {})

    try {
      const { status, body } = await postJson(ctx.base, '/api/contact', '{ non json')
      assert.equal(status, 400)
      assert.equal(typeof body.error, 'string')
    } finally {
      log.mock.restore()
    }
  })

  it('rejects an empty body', async () => {
    const { status, body } = await request(ctx.base, '/api/contact', { method: 'POST' })
    assert.equal(status, 400)
    assert.deepEqual(fieldsOf(body), ['name', 'email', 'message'])
  })
})
