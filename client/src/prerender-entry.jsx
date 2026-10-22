import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

import App from './App.jsx'
import { takePageMeta } from './lib/usePageMeta.js'

// Entry point of the prerender step, scripts/prerender.mjs. Vite builds
// it as an SSR bundle next to the client bundle, so every asset URL the
// markup carries is the hashed URL the client build writes, and hydration
// in client/src/main.jsx matches the HTML it finds in the page.

function fullPath(base, path) {
  const cleanBase = base === '/' ? '' : base.replace(/\/+$/, '')
  if (path === '/') return `${cleanBase}/`
  return `${cleanBase}${path}`
}

// Renders one route and returns its markup together with the head tags
// the page computed while rendering, see client/src/lib/usePageMeta.js.
export function renderRoute(path, base = '/') {
  const html = renderToString(
    <MemoryRouter basename={base} initialEntries={[fullPath(base, path)]}>
      <App />
    </MemoryRouter>
  )

  return { html, meta: takePageMeta() }
}
