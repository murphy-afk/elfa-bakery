import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE says where the site is served from. The temporary preview on
// GitHub Pages lives under /elfa-bakery/, a host that serves the domain
// at the root leaves it unset. Asset URLs, the router basename in
// client/src/main.jsx, and scripts/prerender.mjs all read the same value.
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
