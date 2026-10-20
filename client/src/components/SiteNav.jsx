import { NavLink } from 'react-router-dom'

import { site } from '../lib/site.js'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/chi-siamo', label: 'Chi siamo', end: false },
  { to: '/menu', label: 'Menu', end: false },
  { to: '/galleria', label: 'Galleria', end: false },
  { to: '/contatti', label: 'Contatti', end: false }
]

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Navigazione principale">
      <ul className="site-nav-list">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} end={link.end} className="site-nav-link">
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <a className="site-nav-cta" href={`tel:${site.phonePrimaryHref}`}>
            Chiama lo shop
          </a>
        </li>
      </ul>
    </nav>
  )
}
