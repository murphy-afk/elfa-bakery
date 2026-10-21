// Keeps the per page SEO tags in sync while the site is a single page
// app. Session 6 adds the prerender step so crawlers get the same tags
// in the initial HTML.

import { useEffect } from 'react'

import { site } from './site.js'
import { ogPhoto } from './photos.js'
import { useLocale, localisedPath, htmlLang, ogLocale } from './i18n.js'

const DEFAULT_TITLES = {
  it: 'Elfa Bakery | Bakery e Pasticceria a Milano',
  en: 'Elfa Bakery | Bakery and Coffee Shop in Milan'
}
const TITLE_SUFFIX = ' | Elfa Bakery'
const JSON_LD_ID = 'page-jsonld'

// One share image for the whole site for now. Session 6 can add a
// dedicated 1200x630 crop per page once there is a photo worth it.
const OG_IMAGE_URL = `${site.origin}${ogPhoto.src}`

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

// Every indexed page announces both language versions of itself and
// points x-default at Italian, the main language of the shop. The links
// are cleared first so a route change cannot leave stale pairs behind.
function setAlternates(italianUrl, englishUrl) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((link) => link.remove())

  if (!italianUrl) return

  const alternates = [
    { hreflang: 'it', href: italianUrl },
    { hreflang: 'en', href: englishUrl },
    { hreflang: 'x-default', href: italianUrl }
  ]

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

// usePageMeta({ title, description, path, jsonLd, noindex })
// - title: short page title, the suffix and the default come from here.
// - path: the route path in its Italian form, '/menu' on both languages.
//   The hook adds the /en prefix when the current locale is English and
//   builds the canonical URL, the og:url, and the hreflang pair from it.
// - jsonLd: structured data object, removed again on unmount.
// - noindex: set on the 404 page, drops the canonical and the alternates.
export default function usePageMeta({ title, description, path, jsonLd, noindex } = {}) {
  const locale = useLocale()
  const fullTitle = title
    ? `${title}${TITLE_SUFFIX}`
    : DEFAULT_TITLES[locale] ?? DEFAULT_TITLES.it
  const pageUrl = path ? `${site.origin}${localisedPath(path, locale)}` : null
  const italianUrl = path ? `${site.origin}${path}` : null
  const englishUrl = path ? `${site.origin}${localisedPath(path, 'en')}` : null
  const ogAlt = locale === 'en' ? ogPhoto.alt_en || ogPhoto.alt : ogPhoto.alt

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale)
    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', pageUrl)
    setMeta('property', 'og:image', OG_IMAGE_URL)
    setMeta('property', 'og:image:alt', ogAlt)
    setMeta('property', 'og:locale', ogLocale(locale))
    setMeta('property', 'og:locale:alternate', ogLocale(locale === 'en' ? 'it' : 'en'))

    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow')
      setCanonical(null)
      setAlternates(null, null)
    } else {
      removeMeta('name', 'robots')
      setCanonical(pageUrl)
      setAlternates(italianUrl, englishUrl)
    }

    setJsonLd(jsonLd)

    return () => {
      setJsonLd(null)
    }
  }, [fullTitle, description, pageUrl, italianUrl, englishUrl, ogAlt, locale, jsonLd, noindex])
}
