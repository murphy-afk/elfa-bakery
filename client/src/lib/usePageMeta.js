// Computes the head tags of a page and keeps them in sync while the site
// runs as a single page app.
// buildPageMeta is pure, so the prerender step in scripts/prerender.mjs
// writes the very same tags into the HTML a crawler downloads first:
// title, meta description, canonical, the hreflang pair, the Open Graph
// tags, and the JSON-LD block. The hook applies them to document.head
// while the site is open in a browser.

import { useEffect, useMemo } from 'react'

import { site } from './site.js'
import { ogPhoto } from './photos.js'
import { useLocale, localisedPath, htmlLang, ogLocale } from './i18n.js'

const DEFAULT_TITLES = {
  it: 'Elfa Bakery | Bakery e Pasticceria a Milano',
  en: 'Elfa Bakery | Bakery and Coffee Shop in Milan'
}
const TITLE_SUFFIX = ' | Elfa Bakery'
const JSON_LD_ID = 'page-jsonld'

// One share image for the whole site for now. A dedicated 1200x630 crop
// per page can come later once there is a photo worth it.
const OG_IMAGE_URL = `${site.origin}${ogPhoto.src}`

// The tags of the page that rendered last, waiting for the prerender
// step to pick them up. It reads the value right after renderToString,
// so the render side effect below cannot reach a browser.
let lastMeta = null

// buildPageMeta({ title, description, path, jsonLd, noindex }, locale)
// - title: short page title, the suffix and the default come from here.
// - description: the meta description, in the language of the page.
// - path: the route path in its Italian form, '/menu' on both languages.
//   The canonical URL, the og:url, and the hreflang pair are built from it.
// - jsonLd: structured data object for the page.
// - noindex: set on the 404 page, drops the canonical and the alternates.
export function buildPageMeta({ title, description, path, jsonLd, noindex } = {}, locale) {
  const fullTitle = title
    ? `${title}${TITLE_SUFFIX}`
    : DEFAULT_TITLES[locale] ?? DEFAULT_TITLES.it
  const pageUrl = path ? `${site.origin}${localisedPath(path, locale)}` : null
  const italianUrl = path ? `${site.origin}${path}` : null
  const englishUrl = path ? `${site.origin}${localisedPath(path, 'en')}` : null

  return {
    lang: htmlLang(locale),
    title: fullTitle,
    description: description ?? null,
    robots: noindex ? 'noindex, nofollow' : null,
    canonical: noindex ? null : pageUrl,
    // Every indexed page announces both language versions of itself and
    // points x-default at Italian, the main language of the shop.
    alternates:
      noindex || !path
        ? []
        : [
            { hreflang: 'it', href: italianUrl },
            { hreflang: 'en', href: englishUrl },
            { hreflang: 'x-default', href: italianUrl }
          ],
    og: {
      title: fullTitle,
      description: description ?? null,
      url: pageUrl,
      image: OG_IMAGE_URL,
      imageAlt: locale === 'en' ? ogPhoto.alt_en || ogPhoto.alt : ogPhoto.alt,
      locale: ogLocale(locale),
      localeAlternate: ogLocale(locale === 'en' ? 'it' : 'en')
    },
    jsonLd: jsonLd ?? null
  }
}

// Handed to scripts/prerender.mjs after a route has been rendered.
export function takePageMeta() {
  const meta = lastMeta
  lastMeta = null
  return meta
}

function setMeta(attr, key, content) {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function removeMeta(attr, key) {
  const tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (tag) tag.remove()
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!href) {
    if (link) link.remove()
    return
  }
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

// The links are cleared first so a route change cannot leave stale pairs
// behind.
function setAlternates(alternates) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((link) => link.remove())

  for (const alternate of alternates) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', alternate.hreflang)
    link.setAttribute('href', alternate.href)
    document.head.appendChild(link)
  }
}

function setJsonLd(data) {
  let tag = document.getElementById(JSON_LD_ID)
  if (!data) {
    if (tag) tag.remove()
    return
  }
  if (!tag) {
    tag = document.createElement('script')
    tag.id = JSON_LD_ID
    tag.type = 'application/ld+json'
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(data)
}

export default function usePageMeta(options = {}) {
  const locale = useLocale()
  const { title, description, path, jsonLd, noindex } = options

  const meta = useMemo(
    () => buildPageMeta({ title, description, path, jsonLd, noindex }, locale),
    [title, description, path, jsonLd, noindex, locale]
  )

  lastMeta = meta

  useEffect(() => {
    document.documentElement.lang = meta.lang
    document.title = meta.title

    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.og.title)
    setMeta('property', 'og:description', meta.og.description)
    setMeta('property', 'og:url', meta.og.url)
    setMeta('property', 'og:image', meta.og.image)
    setMeta('property', 'og:image:alt', meta.og.imageAlt)
    setMeta('property', 'og:locale', meta.og.locale)
    setMeta('property', 'og:locale:alternate', meta.og.localeAlternate)

    if (meta.robots) setMeta('name', 'robots', meta.robots)
    else removeMeta('name', 'robots')

    setCanonical(meta.canonical)
    setAlternates(meta.alternates)
    setJsonLd(meta.jsonLd)

    return () => {
      setJsonLd(null)
    }
  }, [meta])
}
