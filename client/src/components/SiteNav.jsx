import { Link, NavLink, useLocation } from 'react-router-dom'

import { site } from '../lib/site.js'
import { useLocale, localisedPath, basePathFromPath, htmlLang } from '../lib/i18n.js'

// The switch shows the name of the language it switches to, in that
// language, and the links point at the same page in the other locale.
const NAV_COPY = {
  it: {
    aria: 'Navigazione principale',
    cta: 'Chiama lo shop',
    switchLabel: 'English',
    switchLang: 'en',
    links: [
      { to: '/', label: 'Home', end: true },
      { to: '/chi-siamo', label: 'Chi siamo', end: false },
      { to: '/menu', label: 'Menu', end: false },
      { to: '/galleria', label: 'Galleria', end: false },
      { to: '/contatti', label: 'Contatti', end: false }
    ]
  },
  en: {
    aria: 'Main navigation',
    cta: 'Call the shop',
    switchLabel: 'Italiano',
    switchLang: 'it',
    links: [
      { to: '/', label: 'Home', end: true },
      { to: '/chi-siamo', label: 'About us', end: false },
      { to: '/menu', label: 'Menu', end: false },
      { to: '/galleria', label: 'Gallery', end: false },
      { to: '/contatti', label: 'Contact', end: false }
    ]
  }
}

export default function SiteNav() {
  const locale = useLocale()
  const { pathname } = useLocation()
  const copy = NAV_COPY[locale] ?? NAV_COPY.it
  const switchPath = localisedPath(basePathFromPath(pathname), copy.switchLang)

  return (
    <nav className="site-nav" aria-label={copy.aria}>
      <ul className="site-nav-list">
        {copy.links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={localisedPath(link.to, locale)}
              end={link.end}
              className="site-nav-link">
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <a className="site-nav-cta" href={`tel:${site.phonePrimaryHref}`}>
            {copy.cta}
          </a>
        </li>
        <li>
          <Link
            className="site-nav-lang"
            to={switchPath}
            lang={htmlLang(copy.switchLang)}
            hrefLang={htmlLang(copy.switchLang)}>
            {copy.switchLabel}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
