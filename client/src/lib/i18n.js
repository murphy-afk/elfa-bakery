// Two locales: Italian at the root of the site, English under /en.
// The locale is read from the path, so the header, the footer, and every
// page agree on the language without prop drilling. Pages and components
// call useLocale() and pick the string from their own copy object.

import { useLocation } from 'react-router-dom'

const EN_PREFIX = '/en'

const HTML_LANG = { it: 'it', en: 'en' }
const OG_LOCALE = { it: 'it_IT', en: 'en_US' }

// '/en' and '/en/menu' are English, everything else is Italian.
export function localeFromPath(pathname) {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
    ? 'en'
    : 'it'
}

export function useLocale() {
  const { pathname } = useLocation()
  return localeFromPath(pathname)
}

// The route a page lives on in the target locale. Page components pass
// their Italian route ('/menu'), English gets the prefix added.
export function localisedPath(path, locale) {
  if (locale !== 'en') return path
  return path === '/' ? EN_PREFIX : `${EN_PREFIX}${path}`
}

// The current path stripped of the English prefix, so it can be rebuilt
// in the other locale by the language switch in the header.
export function basePathFromPath(pathname) {
  if (localeFromPath(pathname) !== 'en') return pathname
  return pathname.slice(EN_PREFIX.length) || '/'
}

export function htmlLang(locale) {
  return HTML_LANG[locale] ?? HTML_LANG.it
}

export function ogLocale(locale) {
  return OG_LOCALE[locale] ?? OG_LOCALE.it
}
