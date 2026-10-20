import { Link } from 'react-router-dom'

import { site } from '../lib/site.js'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-inner">
          <div>
            <h2 className="site-footer-title">Dove siamo</h2>
            <ul className="info-list">
              <li>{site.addressLine}</li>
              <li>{site.addressCity}</li>
              <li>zona De Angeli, Milano</li>
              <li>
                <a href={site.mapsUrl}>Apri la posizione su Google Maps</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="site-footer-title">Contatti</h2>
            <ul className="info-list">
              <li>
                <a href={`tel:${site.phonePrimaryHref}`}>{site.phonePrimary}</a>
              </li>
              <li>
                <a href={`tel:${site.phoneSecondaryHref}`}>{site.phoneSecondary}</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="site-footer-title">Social</h2>
            <ul className="info-list">
              <li>
                <a href={site.instagram}>Profilo Instagram di Elfa Bakery</a>
              </li>
              <li>
                <a href={site.facebook}>Pagina Facebook di Elfa Bakery</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="site-footer-title">Il negozio</h2>
            <ul className="info-list">
              <li>Bakery, caffetteria, pasticceria e gastronomia</li>
              <li>Pizza al trancio, kebab, falafel e dolci</li>
              <li>Opzioni halal</li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer-title">Legale</h2>
            <ul className="info-list">
              <li>
                <Link to="/privacy-policy">Informativa sulla privacy</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="site-footer-note">
          Prezzi e orari sono ancora in fase di conferma con il titolare. Chiama
          prima di venire se hai bisogno di un orario preciso.
        </p>
      </div>
    </footer>
  )
}
