// Small fetch helper for the Express API.
// The Vite dev server proxies /api to port 4000, see vite.config.js.

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export async function getJSON(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' }
  })

  if (!response.ok) {
    throw new Error(`API request to ${path} failed with status ${response.status}`)
  }

  return response.json()
}
