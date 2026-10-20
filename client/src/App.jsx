import { Routes, Route } from 'react-router-dom'

import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#contenuto">
        Salta al contenuto
      </a>
      <SiteHeader />
      <main className="site-main" id="contenuto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
