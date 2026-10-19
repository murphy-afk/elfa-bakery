import { Routes, Route } from 'react-router-dom'

import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <div className="site">
      <SiteHeader />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
