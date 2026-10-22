import { Link } from 'react-router-dom'

import SiteNav from './SiteNav.jsx'
import { site } from '../lib/site.js'
import { useLocale, localisedPath } from '../lib/i18n.js'
import logoUrl from '../assets/logo.png'

const LOGO_ALT = { it: 'Logo di Elfa Bakery', en: 'Elfa Bakery logo' }

export default function SiteHeader() {
  const locale = useLocale()

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to={localisedPath('/', locale)} className="site-logo">
          <img
            className="site-logo-mark"
            src={logoUrl}
            alt={LOGO_ALT[locale] ?? LOGO_ALT.it}
            width="256"
            height="256" />
          <span className="site-logo-name">{site.name}</span>
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}
