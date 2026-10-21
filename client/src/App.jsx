import { Routes, Route } from 'react-router-dom'

import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Cookies from './pages/Cookies.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#contenuto">
        Salta al contenuto
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main className="site-main" id="contenuto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/chi-siamo" element={<About />} />
          <Route path="/galleria" element={<Gallery />} />
          <Route path="/contatti" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
