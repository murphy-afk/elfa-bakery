import { Link } from 'react-router-dom'

import SiteNav from './SiteNav.jsx'
import { site } from '../lib/site.js'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="site-logo">
          <span className="site-logo-mark" aria-hidden="true" />
          {site.name}
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}
