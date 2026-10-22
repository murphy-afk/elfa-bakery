// The pages of the site, one entry per Italian route path. This list is
// the single source of truth for every step that has to cover the whole
// site: App.jsx builds the React Router routes from it, the prerender
// step writes one HTML file per entry, and the sitemap lists every entry
// in Italian and in English.

// Adding a page means adding its path here and its component to
// COMPONENT_BY_PATH in client/src/App.jsx. App.jsx throws when the two
// disagree, so a path in this list can never ship without a page.

import { EN_PREFIX } from './i18n.js'

// Italian at the root of the site, English under /en. The prefix is
// re-exported from client/src/lib/i18n.js so the page list and the
// language module can never disagree about it.
export { EN_PREFIX }

export const pagePaths = [
  '/',
  '/menu',
  '/chi-siamo',
  '/galleria',
  '/contatti',
  '/privacy-policy',
  '/cookie-policy'
]

// Every page in both languages: the Italian route as it is, and the
// English route under /en. Italian at the root stays the x-default of
// each pair, see client/src/lib/usePageMeta.js.
export function localisedPages() {
  return pagePaths.flatMap((path) => [
    { path, locale: 'it' },
    { path: path === '/' ? EN_PREFIX : `${EN_PREFIX}${path}`, locale: 'en' }
  ])
}
