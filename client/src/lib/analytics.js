// Plausible, loaded only where it was configured.
// Set VITE_PLAUSIBLE_DOMAIN when building (it is the repo variable
// PLAUSIBLE_DOMAIN in .github/workflows/deploy-pages.yml) and the site
// loads the Plausible script on every page. Without it the build ships
// no analytics at all, which is the default for the preview deployment.
// Plausible counts visits with no cookies and no personal data, so no
// cookie banner is needed for it. The client/src/pages/Cookies.jsx page
// says the same thing.
// The script only loads on the domain it was configured for, so traffic
// on the GitHub Pages preview or on localhost never reaches the account.

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || ''

function hostMatches(hostname, domain) {
  if (!domain) return false
  return hostname === domain || hostname === `www.${domain}` || hostname === domain.replace(/^www\./, '')
}

export function initAnalytics() {
  if (!DOMAIN || typeof document === 'undefined') return
  if (!hostMatches(window.location.hostname, DOMAIN)) return

  const script = document.createElement('script')
  script.defer = true
  script.setAttribute('data-domain', DOMAIN)
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}
