import { Link } from 'react-router-dom'

import SiteNav from './SiteNav.jsx'
import { site } from '../lib/site.js'
import logoUrl from '../assets/logo.png'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="site-logo">
          <img
            className="site-logo-mark"
            src={logoUrl}
            alt="Logo di Elfa Bakery"
            width="256"
            height="256" />
          {site.name}
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}
