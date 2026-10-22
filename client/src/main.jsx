import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { initAnalytics } from './lib/analytics.js'
import './styles/tokens.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/home.css'
import './styles/menu.css'
import './styles/pages.css'

// BASE_URL follows the Vite base path, so the temporary GitHub Pages
// deployment under /elfa-bakery/ matches its routes and the local dev
// server keeps working at the root.
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const container = document.getElementById('root')

// The prerender step writes the rendered page into #root so crawlers get
// real content without running JavaScript. Hydration keeps it, so the
// photographs and the menu rows already on screen are not rebuilt. A page
// the step did not prerender starts from an empty root and React renders
// it from scratch, which is what the 404 page on GitHub Pages does.
if (container.firstChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

initAnalytics()
