// Keeps the per page SEO tags in sync while the site is a single page
// app. Session 6 adds the prerender step so crawlers get the same tags
// in the initial HTML.

import { useEffect } from 'react'

import { site } from './site.js'
import { ogPhoto } from './photos.js'

const DEFAULT_TITLE = 'Elfa Bakery | Bakery e Pasticceria a Milano'
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
// - path: route path, used for the canonical URL and og:url.
// - jsonLd: structured data object, removed again on unmount.
// - noindex: set on the 404 page, drops the canonical tag.
export default function usePageMeta({ title, description, path, jsonLd, noindex } = {}) {
  const fullTitle = title ? `${title}${TITLE_SUFFIX}` : DEFAULT_TITLE
  const pageUrl = path ? `${site.origin}${path}` : null

  useEffect(() => {
    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', pageUrl)
    setMeta('property', 'og:image', OG_IMAGE_URL)
    setMeta('property', 'og:image:alt', ogPhoto.alt)

    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow')
      setCanonical(null)
    } else {
      removeMeta('name', 'robots')
      setCanonical(pageUrl)
    }

    setJsonLd(jsonLd)

    return () => {
      setJsonLd(null)
    }
  }, [fullTitle, description, pageUrl, jsonLd, noindex])
}
