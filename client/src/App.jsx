import { Routes, Route } from 'react-router-dom'

import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { useLocale, localisedPath, EN_PREFIX } from './lib/i18n.js'
import { pagePaths } from './lib/routes.js'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Cookies from './pages/Cookies.jsx'
import NotFound from './pages/NotFound.jsx'

// One component per path in client/src/lib/routes.js. The check below
// runs when the module loads, so a page added to that list without a
// component breaks the build instead of shipping a blank route.
const COMPONENT_BY_PATH = {
  '/': Home,
  '/menu': Menu,
  '/chi-siamo': About,
  '/galleria': Gallery,
  '/contatti': Contact,
  '/privacy-policy': Privacy,
  '/cookie-policy': Cookies
}

for (const path of pagePaths) {
  if (!COMPONENT_BY_PATH[path]) {
    throw new Error(`No component registered for the route ${path}`)
  }
}

export default function App() {
  const locale = useLocale()
  const skipLabel = locale === 'en' ? 'Skip to content' : 'Salta al contenuto'

  return (
    <div className="site">
      <a className="skip-link" href="#contenuto">
        {skipLabel}
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main className="site-main" id="contenuto">
        <Routes>
          {pagePaths.flatMap((path) => {
            const Page = COMPONENT_BY_PATH[path]
            return [
              <Route key={path} path={path} element={<Page />} />,
              <Route
                key={`${EN_PREFIX}${path}`}
                path={localisedPath(path, 'en')}
                element={<Page />} />
            ]
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
