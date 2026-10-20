// Shared helpers for the API tests.
// The app is started on a random port and the MySQL pool is replaced by a
// stub, so the tests never open a database connection.

import { once } from 'node:events'

import app from '../src/app.js'
import pool from '../src/config/db.js'

// Starts the Express app on 127.0.0.1 with an OS assigned port.
export async function startApp() {
  const server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()

  return {
    base: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise((resolve) => {
        server.close(() => resolve())
        server.closeAllConnections()
      })
  }
}

// Replaces pool.query with a stub. handler receives (sql, params) and
// returns the rows array. The returned function restores the real pool.
export function stubPoolQuery(handler) {
  pool.query = async (sql, params) => [await handler(sql, params), []]
  return () => {
    delete pool.query
  }
}

// Fetches a URL and parses the JSON body when there is one.
export async function request(base, path, init = {}) {
  const res = await fetch(`${base}${path}`, init)
  const text = await res.text()

  let body = null
  if (text) {
    try {
      body = JSON.parse(text)
    } catch {
      body = text
    }
  }

  return { status: res.status, headers: res.headers, body }
}

// POSTs a JSON payload. Pass a raw string to send a broken body on purpose.
export function postJson(base, path, payload, headers = {}) {
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload)
  return request(base, path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body
  })
}
