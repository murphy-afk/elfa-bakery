// Writes sitemap.xml and robots.txt into client/dist after the prerender
// step, so both list exactly the pages that exist as HTML.
// Every page appears twice in the sitemap, once for the Italian URL and
// once for the English one under /en, and both entries carry the same
// hreflang alternates that client/src/lib/usePageMeta.js puts in the head
// of each page. The two sources are the page list in
// client/src/lib/routes.js.
// Run with: npm run build:sitemap

import { existsSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { localisedPages, EN_PREFIX } from '../client/src/lib/routes.js'
import { site } from '../client/src/lib/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'client', 'dist')

if (!existsSync(distDir)) {
  console.error('client/dist is missing. Run the client build first.')
  process.exit(1)
}

function pageUrl(path) {
  return `${site.origin}${path}`
}

function italianPath(path) {
  if (path === EN_PREFIX) return '/'
  return path.startsWith(`${EN_PREFIX}/`) ? path.slice(EN_PREFIX.length) : path
}

function englishPath(path) {
  if (path.startsWith(EN_PREFIX)) return path
  return path === '/' ? EN_PREFIX : `${EN_PREFIX}${path}`
}

// One <url> per language version of a page. Both entries of the same page
// carry the same three alternates, which is what search engines expect.
function urlEntry(path) {
  return [
    '  <url>',
    `    <loc>${pageUrl(path)}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="it" href="${pageUrl(italianPath(path))}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${pageUrl(englishPath(path))}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(italianPath(path))}" />`,
    '  </url>'
  ].join('\n')
}

// The 404 page is not in the sitemap, and neither is any page that has no
// prerendered HTML behind it.
const pages = localisedPages()
const missing = pages.filter((page) => {
  const file =
    page.path === '/'
      ? join(distDir, 'index.html')
      : join(distDir, page.path.slice(1), 'index.html')
  return !existsSync(file)
})

if (missing.length > 0) {
  console.error(
    `No prerendered HTML for: ${missing.map((page) => page.path).join(', ')}. Run npm run prerender first.`
  )
  process.exit(1)
}

const entries = pages.map((page) => urlEntry(page.path)).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(distDir, 'robots.txt'), robots, 'utf8')

console.log(
  `Wrote ${relative(root, join(distDir, 'sitemap.xml'))} with ${pages.length} URLs, and ${relative(root, join(distDir, 'robots.txt'))}.`
)
