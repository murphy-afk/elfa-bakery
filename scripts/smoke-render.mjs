// Renders every route with react-dom/server to catch runtime errors that
// the production build cannot see. React and the router stay external and
// are loaded through require, so the CommonJS builds work as they are.
// Run with: npm run check:render

import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

import { build } from 'esbuild'

const require = createRequire(import.meta.url)

const routes = [
  '/',
  '/menu',
  '/chi-siamo',
  '/galleria',
  '/contatti',
  '/privacy-policy',
  '/cookie-policy',
  '/non-esiste'
]

// The bundle lands inside scripts/ on purpose, so that its bare require
// calls for react and the router resolve against the workspace root.
const outFile = join(process.cwd(), 'scripts', '.smoke-app.cjs')

await build({
  entryPoints: ['client/src/App.jsx'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react-router-dom'],
  // Assets are inlined so the smoke test needs no output directory and
  // no extra files on disk. Vite does its own handling for the real build.
  loader: {
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl',
    '.webp': 'dataurl',
    '.svg': 'dataurl'
  },
  define: { 'import.meta.env': '{}' },
  outfile: outFile,
  logLevel: 'error'
})

const React = require('react')
const { renderToString } = require('react-dom/server')
const { MemoryRouter } = require('react-router-dom')
const { default: App } = require(outFile)

let failed = 0

for (const route of routes) {
  try {
    const html = renderToString(
      React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App))
    )
    const h1Count = (html.match(/<h1[ >]/g) || []).length
    console.log(`${route} -> ok, ${html.length} chars, h1 count: ${h1Count}`)
    if (h1Count !== 1) failed++
  } catch (err) {
    failed++
    console.log(`${route} -> FAILED: ${err.message}`)
  }
}

rmSync(outFile, { force: true })

if (failed > 0) {
  console.log(`\n${failed} route(s) failed.`)
  process.exitCode = 1
} else {
  console.log('\nAll routes rendered with exactly one h1.')
}
