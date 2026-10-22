import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { site } from '../lib/site.js'
import { useLocale, localisedPath, basePathFromPath, htmlLang } from '../lib/i18n.js'
import flagGb from '../assets/flag-gb.svg'
import flagIt from '../assets/flag-it.svg'

// The switch carries the flag of the language it switches to, and the
// name of that language lives on the accessible label of the link. The
// links point at the same page in the other locale.
const NAV_COPY = {
  it: {
    aria: 'Navigazione principale',
    cta: 'Chiama lo shop',
    switchLang: 'en',
    switchAria: 'Passa alla versione inglese',
    toggleOpen: 'Apri il menu',
    toggleClose: 'Chiudi il menu',
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
    switchLang: 'it',
    switchAria: 'Switch to the Italian version',
    toggleOpen: 'Open the menu',
    toggleClose: 'Close the menu',
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
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const copy = NAV_COPY[locale] ?? NAV_COPY.it
  const switchPath = localisedPath(basePathFromPath(pathname), copy.switchLang)
  const flagUrl = copy.switchLang === 'en' ? flagGb : flagIt

  // The panel closes on navigation, so following a link never leaves the
  // menu hanging open over the page that comes next.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Escape closes the panel and hands the focus back to the toggle, so
  // the keyboard user is never dropped into a hidden list of links.
  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <nav className="site-nav" aria-label={copy.aria}>
      {/* The list comes first in the source so the tab order on a desktop
          runs links first and the flag last, the way they are laid out.
          On a phone the list drops down and only the flag and the toggle
          stay in the bar, hugging the right edge with the flag to the
          left of the toggle. */}
      <ul className={open ? 'site-nav-list is-open' : 'site-nav-list'} id="site-nav-list">
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
      </ul>

      <Link
        className="site-nav-lang"
        to={switchPath}
        lang={htmlLang(copy.switchLang)}
        hrefLang={htmlLang(copy.switchLang)}
        aria-label={copy.switchAria}
        title={copy.switchAria}>
        <img className="site-nav-flag" src={flagUrl} alt="" width="24" height="16" />
      </Link>

      <button
        type="button"
        className="site-nav-toggle"
        ref={toggleRef}
        aria-expanded={open}
        aria-controls="site-nav-list"
        onClick={() => setOpen((value) => !value)}>
        <svg
          className="site-nav-toggle-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round" />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round" />
          )}
        </svg>
        <span className="visually-hidden">{open ? copy.toggleClose : copy.toggleOpen}</span>
      </button>
    </nav>
  )
}
