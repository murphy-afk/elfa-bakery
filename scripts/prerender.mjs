// Writes the final HTML of every page into client/dist, so a crawler (and
// a visitor without JavaScript) gets the real page: title, meta
// description, canonical, the hreflang pair, Open Graph tags, JSON-LD,
// and the rendered markup instead of an empty #root.
//
// It runs after the two Vite builds:
//   npm run build -w client        the browser bundle and index.html
//   npm run build:ssr -w client    the server bundle of the same app
// The head tags come from client/src/lib/usePageMeta.js through
// client/src/prerender-entry.jsx, so the prerendered tags and the tags
// the running site writes can never disagree.
//
// Output in client/dist:
//   index.html, en/index.html, menu/index.html, en/menu/index.html, ...
//   one folder per route, which is also how GitHub Pages resolves a URL
//   like /elfa-bakery/menu/ without any server rewrite.
//   404.html, the shell GitHub Pages serves for unknown URLs, which boots
//   the single page app and renders the 404 page in the browser.
//
// Run with: npm run prerender

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { localisedPages } from '../client/src/lib/routes.js'
import { site } from '../client/src/lib/site.js'
import { ogPhoto } from '../client/src/lib/photos.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'client', 'dist')
const ssrDir = join(root, 'client', 'dist-ssr')
const base = process.env.VITE_BASE || '/'

const TEMPLATE_PATH = join(distDir, 'index.html')
const SSR_ENTRY = ['prerender-entry.js', 'prerender-entry.mjs', 'prerender-entry.cjs'].find(
  (name) => existsSync(join(ssrDir, name))
)

if (!existsSync(TEMPLATE_PATH)) {
  console.error('client/dist/index.html is missing. Run the client build first.')
  process.exit(1)
}
if (!SSR_ENTRY) {
  console.error('No SSR bundle in client/dist-ssr. Run npm run build:ssr -w client first.')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Head tags.
// ---------------------------------------------------------------------------

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// The JSON-LD text sits inside a <script> tag, so every "<" is written
// as the JSON escape for it and cannot close the tag early.
function escapeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function headTags(meta) {
  const lines = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description ?? '')}" />`
  ]

  if (meta.robots) {
    lines.push(`<meta name="robots" content="${escapeAttr(meta.robots)}" />`)
  }
  if (meta.canonical) {
    lines.push(`<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`)
  }
  for (const alternate of meta.alternates) {
    lines.push(
      `<link rel="alternate" hreflang="${escapeAttr(alternate.hreflang)}" href="${escapeAttr(alternate.href)}" />`
    )
  }

  lines.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escapeAttr(meta.og.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.og.description ?? '')}" />`
  )
  if (meta.og.url) {
    lines.push(`<meta property="og:url" content="${escapeAttr(meta.og.url)}" />`)
  }
  if (meta.og.image) {
    lines.push(
      `<meta property="og:image" content="${escapeAttr(meta.og.image)}" />`,
      `<meta property="og:image:alt" content="${escapeAttr(meta.og.imageAlt)}" />`
    )
  }
  lines.push(
    `<meta property="og:locale" content="${escapeAttr(meta.og.locale)}" />`,
    `<meta property="og:locale:alternate" content="${escapeAttr(meta.og.localeAlternate)}" />`
  )

  if (meta.jsonLd) {
    lines.push(`<script type="application/ld+json">${escapeJsonLd(meta.jsonLd)}</script>`)
  }

  return lines.join('\n    ')
}

// The template already carries the tags of the home page. Everything this
// step manages is taken out again, so no route ships two titles or a
// canonical it does not own. og:type and the twitter card stay, they are
// the same on every page.
const MANAGED_HEAD = [
  /<title>[\s\S]*?<\/title>\s*/g,
  /<meta name="description"[^>]*>\s*/g,
  /<meta name="robots"[^>]*>\s*/g,
  /<link rel="canonical"[^>]*>\s*/g,
  /<link rel="alternate"[^>]*>\s*/g,
  /<meta property="og:[^"]*"[^>]*>\s*/g,
  /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g
]

function prepareTemplate(html) {
  let out = html
  for (const pattern of MANAGED_HEAD) out = out.replace(pattern, '')

  if (!out.includes('</head>')) {
    throw new Error('The page template has no closing </head> tag.')
  }
  if (!out.includes('<div id="root"></div>')) {
    throw new Error('The page template has no empty <div id="root"></div> to fill in.')
  }

  return out.replace(/<html lang="[^"]*"/, '<html lang="__LANG__"')
}

function buildPage(template, meta, body, preloads = []) {
  const head = [headTags(meta), ...preloads].join('\n    ')
  return template
    .replace('<html lang="__LANG__"', `<html lang="${meta.lang}"`)
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

// React 19 emits <link rel="preload"> tags for the images it loads with a
// priority hint. On a server it can only drop them at the start of the
// output, which would leave link tags inside #root for hydration to trip
// over, because the browser build hoists the very same tags into the head.
// They are moved into the head here: the browser still preloads the files
// before the body is parsed, and #root starts with the real page.
function extractPreloads(html) {
  const preloads = [...html.matchAll(/<link rel="preload"[^>]*\/?>/g)].map((match) => match[0])
  return { preloads, body: html.replace(/<link rel="preload"[^>]*\/?>/g, '') }
}

function writeFile(filePath, contents) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, contents, 'utf8')
}

// Every asset URL the markup points at must exist in the client build,
// otherwise hydration would swap one file for another in the browser. The
// SSR build writes its own copy into client/dist-ssr, which is why the
// check runs against client/dist/assets.
function checkAssets(html) {
  const refs = [...html.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)].map((match) => match[1])
  const missing = refs
    .map((ref) => (ref.startsWith(base) ? ref.slice(base.length) : ref.replace(/^\//, '')))
    .filter((path) => !existsSync(join(distDir, path)))

  if (missing.length > 0) {
    throw new Error(
      `The prerendered markup points at files the client build did not write: ${missing.join(', ')}`
    )
  }
}

// ---------------------------------------------------------------------------
// Render every page.
// ---------------------------------------------------------------------------

const template = prepareTemplate(readFileSync(TEMPLATE_PATH, 'utf8'))
const { renderRoute } = await import(pathToFileURL(join(ssrDir, SSR_ENTRY)).href)

let written = 0

for (const page of localisedPages()) {
  const { html, meta } = renderRoute(page.path, base)
  if (!meta) throw new Error(`No page meta was produced for ${page.path}`)
  if ((html.match(/<h1[ >]/g) || []).length !== 1) {
    throw new Error(`The prerendered markup for ${page.path} does not have exactly one h1.`)
  }
  checkAssets(html)

  const { preloads, body } = extractPreloads(html)
  const target =
    page.path === '/'
      ? join(distDir, 'index.html')
      : join(distDir, page.path.slice(1), 'index.html')

  writeFile(target, buildPage(template, meta, body, preloads))
  written++
  console.log(`${relative(root, target)} <- ${page.path} (${page.locale})`)
}

// GitHub Pages serves 404.html for any URL with no file behind it. The
// root stays empty on purpose: the URL is unknown here, so the single
// page app renders the right 404 page in the browser, in the language of
// the URL, instead of the wrong one being frozen into the HTML.
const notFoundMeta = {
  lang: 'it',
  title: 'Pagina non trovata | Elfa Bakery',
  description:
    'La pagina che cerchi non esiste. Torna alla home di Elfa Bakery, bakery in Via Sardegna 40, Milano.',
  robots: 'noindex, nofollow',
  canonical: null,
  alternates: [],
  jsonLd: null,
  og: {
    title: 'Pagina non trovata | Elfa Bakery',
    description:
      'La pagina che cerchi non esiste. Torna alla home di Elfa Bakery, bakery in Via Sardegna 40, Milano.',
    url: null,
    image: `${site.origin}${ogPhoto.src}`,
    imageAlt: ogPhoto.alt,
    locale: 'it_IT',
    localeAlternate: 'en_US'
  }
}

writeFile(join(distDir, '404.html'), buildPage(template, notFoundMeta, ''))

console.log(`\nPrerendered ${written} pages plus 404.html in client/dist.`)
