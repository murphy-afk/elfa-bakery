import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getJSON } from '../lib/api.js'
import { site } from '../lib/site.js'
import usePageMeta from '../lib/usePageMeta.js'
import { bakeryJsonLd } from '../lib/structuredData.js'
import { heroPhoto, photoForItem } from '../lib/photos.js'
import SectionHeading from '../components/SectionHeading.jsx'
import PlaceholderImage from '../components/PlaceholderImage.jsx'
import PriceTag from '../components/PriceTag.jsx'
import HoursPanel from '../components/HoursPanel.jsx'
import LoadingNote from '../components/LoadingNote.jsx'
import LoadErrorNote from '../components/LoadErrorNote.jsx'

const highlights = [
  {
    title: 'Sempre aperti',
    text: 'Aperti 24 ore dal lunedì al sabato. Di domenica dalle 5:30 alle 21.'
  },
  {
    title: 'Opzioni halal',
    text: 'Kebab, falafel e piatti preparati con opzioni halal. Chiedi al banco.'
  },
  {
    title: 'Banco di pasticceria',
    text: 'Brioches, croissant, biscotti e torte ogni giorno, insieme alle focacce.'
  },
  {
    title: 'Gastronomia calda',
    text: 'Lasagne, omelette e piatti pronti preparati al mattino per un pranzo veloce.'
  }
]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  usePageMeta({
    description:
      'Elfa Bakery a Milano, in Via Sardegna 40. Bakery, caffetteria, pasticceria e gastronomia. Bagel, pizza, piadine, kebab e dolci. Aperti H24 dal lunedì al sabato.',
    path: '/',
    jsonLd: bakeryJsonLd
  })

  useEffect(() => {
    let active = true

    getJSON('/menu')
      .then((data) => {
        if (active) setCategories(data)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const featured = categories
    .flatMap((category) =>
      category.items
        .filter((item) => item.is_featured)
        .map((item) => ({ item, category }))
    )
    .slice(0, 3)

  return (
    <>
      <section className="container home-hero" aria-labelledby="titolo-pagina">
        <div className="home-hero-copy">
          <span className="home-hero-kicker">{site.addressFull}</span>
          <h1 id="titolo-pagina">{site.name}</h1>
          <p className="home-tagline">
            Bakery, caffetteria, pasticceria e gastronomia in Via Sardegna 40,
            Milano. Pizza al trancio, bagel, kebab e dolci, dal mattino a notte
            fonda.
          </p>
          <div className="btn-row home-hero-actions">
            <Link className="btn btn-primary" to="/menu">
              Vedi tutto il menu
            </Link>
            <a className="btn btn-secondary" href={`tel:${site.phonePrimaryHref}`}>
              Chiama {site.phonePrimary}
            </a>
          </div>
        </div>

        <div className="home-hero-figure">
          <img
            className="home-hero-photo"
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            width={heroPhoto.width}
            height={heroPhoto.height}
            fetchPriority="high" />
        </div>
      </section>

      <section className="section home-featured" aria-labelledby="titolo-scelti">
        <div className="container">
          <SectionHeading
            id="titolo-scelti"
            eyebrow="I più amati"
            title="Cosa consigliano i nostri clienti"
            lede="Piatti e dolci che tornano sempre nelle recensioni. I prezzi arrivano appena il titolare conferma il listino." />

          {loading ? <LoadingNote /> : null}
          {error ? (
            <LoadErrorNote>Non riusciamo a caricare i piatti in evidenza.</LoadErrorNote>
          ) : null}

          {!loading && !error && featured.length === 0 ? (
            <p className="status-note">
              I piatti in evidenza arrivano a breve. Intanto guarda tutto il menu.
            </p>
          ) : null}

          {!loading && !error && featured.length > 0 ? (
            <div className="card-grid card-grid-3">
              {featured.map(({ item, category }) => {
                const photo = photoForItem(item.id)

                return (
                  <article className="card" key={item.id}>
                    {photo ? (
                      <img
                        className="card-photo"
                        src={photo.image_url}
                        alt={photo.alt_it}
                        loading="lazy"
                        decoding="async" />
                    ) : (
                      <PlaceholderImage
                        label="Foto in arrivo"
                        alt={`Spazio riservato alla fotografia di ${item.name_it}`} />
                    )}
                    <div className="card-body">
                      <h3 className="card-title">{item.name_it}</h3>
                      {item.description_it ? (
                        <p className="card-text">{item.description_it}</p>
                      ) : null}
                      <div className="card-footer">
                        <span className="card-text">{category.name_it}</span>
                        <PriceTag price={item.price} />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" aria-labelledby="titolo-punti">
        <div className="container">
          <SectionHeading
            id="titolo-punti"
            eyebrow="Il negozio"
            title="Bakery, caffetteria e gastronomia sotto lo stesso tetto" />
          <ul className="highlight-list">
            {highlights.map((highlight) => (
              <li className="highlight-item" key={highlight.title}>
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-text">{highlight.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="titolo-visita">
        <div className="container">
          <SectionHeading
            id="titolo-visita"
            eyebrow="Vieni a trovarci"
            title="Via Sardegna 40, Milano"
            lede="Nella zona De Angeli, vicino alla chiesa greco ortodossa. Posti seduti dentro e fuori, servizio al banco e asporto." />

          <div className="home-visit">
            <div className="home-visit-panel">
              <h3 className="home-visit-title">Orari di apertura</h3>
              <HoursPanel />
            </div>

            <div className="home-visit-panel">
              <h3 className="home-visit-title">Contatti</h3>
              <ul className="info-list">
                <li>{site.addressFull}</li>
                <li>
                  <a href={`tel:${site.phonePrimaryHref}`}>{site.phonePrimary}</a>
                </li>
                <li>
                  <a href={`tel:${site.phoneSecondaryHref}`}>{site.phoneSecondary}</a>
                </li>
              </ul>
              <div className="btn-row home-visit-actions">
                <a className="btn btn-primary" href={site.mapsUrl}>
                  Apri la posizione su Google Maps
                </a>
                <Link className="btn btn-secondary" to="/menu">
                  Guarda il menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
