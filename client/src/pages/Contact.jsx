import usePageMeta from '../lib/usePageMeta.js'
import { site } from '../lib/site.js'
import HoursPanel from '../components/HoursPanel.jsx'

// TODO: add the contact form once POST /api/contact actually delivers the
// message. For now every route to the shop goes through the phone numbers
// and the social profiles below.
export default function Contact() {
  usePageMeta({
    title: 'Contatti',
    description:
      'Indirizzo, orari, telefoni e social di Elfa Bakery, Via Sardegna 40, 20146 Milano. Aperti 24 ore dal lunedì al sabato, domenica dalle 5:30 alle 21.',
    path: '/contatti'
  })

  return (
    <>
      <section className="container page-intro">
        <h1>Contatti</h1>
        <p>
          Siamo in Via Sardegna 40, nella zona De Angeli di Milano, vicino alla
          chiesa greco ortodossa. Puoi chiamarci, scriverci sui social o
          passare direttamente al negozio.
        </p>
      </section>

      <section className="container section-tight" aria-label="Recapiti di Elfa Bakery">
        <div className="contact-grid">
          <div className="contact-panel">
            <h2 className="contact-panel-title">Dove siamo</h2>
            <ul className="info-list">
              <li>{site.addressLine}</li>
              <li>{site.addressCity}</li>
              <li>zona De Angeli, Milano</li>
            </ul>
            <div className="btn-row contact-actions">
              <a className="btn btn-primary" href={site.mapsUrl}>
                Apri la posizione su Google Maps
              </a>
            </div>
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-title">Orari di apertura</h2>
            <HoursPanel />
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-title">Telefono</h2>
            <ul className="info-list">
              <li>
                <a href={`tel:${site.phonePrimaryHref}`}>{site.phonePrimary}</a>
              </li>
              <li>
                <a href={`tel:${site.phoneSecondaryHref}`}>{site.phoneSecondary}</a>
              </li>
            </ul>
            {/* TODO: drop or rewrite this note once the owner confirms
                which of the two numbers is the public one. */}
            <p className="contact-note">
              In caso di dubbi prova con il secondo numero.
            </p>
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-title">Social</h2>
            <ul className="info-list">
              <li>
                <a href={site.instagram}>Profilo Instagram di Elfa Bakery</a>
              </li>
              <li>
                <a href={site.facebook}>Pagina Facebook di Elfa Bakery</a>
              </li>
            </ul>
            <p className="contact-note">
              Su Instagram e Facebook trovi le novità del negozio e i piatti del
              giorno.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
