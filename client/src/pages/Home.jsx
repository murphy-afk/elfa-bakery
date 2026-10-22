import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { loadMenu } from '../lib/content.js'
import { menuCategories } from '../lib/menuSnapshot.js'
import { site } from '../lib/site.js'
import usePageMeta from '../lib/usePageMeta.js'
import { bakeryJsonLd, bakeryJsonLdEn } from '../lib/structuredData.js'
import { heroShopfront, photoForItem, photoAlt } from '../lib/photos.js'
import { PHOTO_SIZES } from '../lib/photoSizes.js'
import { useLocale, localisedPath } from '../lib/i18n.js'
import Photo from '../components/Photo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PlaceholderImage from '../components/PlaceholderImage.jsx'
import PriceTag from '../components/PriceTag.jsx'
import HoursPanel from '../components/HoursPanel.jsx'

// Italian is the default language of the site, English is the second
// one. Each page keeps both sets of strings next to the markup.
const COPY = {
  it: {
    metaDescription:
      'Elfa Bakery a Milano, in Via Sardegna 40. Bakery, caffetteria, pasticceria e gastronomia. Bagel, pizza, piadine, kebab e dolci. Aperti H24 dal lunedì al sabato.',
    tagline:
      'Bakery, caffetteria, pasticceria e gastronomia in Via Sardegna 40, Milano. Pizza al trancio, bagel, kebab e dolci, dal mattino a notte fonda.',
    seeMenu: 'Vedi tutto il menu',
    call: 'Chiama',
    featured: {
      eyebrow: 'I più amati',
      title: 'Cosa consigliano i nostri clienti',
      lede: 'Piatti e dolci che tornano sempre nelle recensioni. I prezzi arrivano appena il titolare conferma il listino.'
    },
    featuredEmpty: 'I piatti in evidenza arrivano a breve. Intanto guarda tutto il menu.',
    photoLabel: 'Foto in arrivo',
    photoAlt: (name) => `Spazio riservato alla fotografia di ${name}`,
    highlights: [
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
    ],
    shop: {
      eyebrow: 'Il negozio',
      title: 'Bakery, caffetteria e gastronomia sotto lo stesso tetto'
    },
    visit: {
      eyebrow: 'Vieni a trovarci',
      title: 'Via Sardegna 40, Milano',
      lede: 'Nella zona De Angeli, vicino alla chiesa greco ortodossa. Posti seduti dentro e fuori, servizio al banco e asporto.'
    },
    hoursTitle: 'Orari di apertura',
    contactTitle: 'Contatti',
    mapsLink: 'Apri la posizione su Google Maps',
    menuLink: 'Guarda il menu'
  },
  en: {
    metaDescription:
      'Elfa Bakery in Milan, at Via Sardegna 40. Bakery, coffee shop, pastry counter and deli. Bagels, pizza, piadinas, kebab and sweets. Open 24 hours Monday to Saturday.',
    tagline:
      'Bakery, coffee shop, pastry counter and deli in Via Sardegna 40, Milan. Pizza by the slice, bagels, kebab and sweets, from morning until late at night.',
    seeMenu: 'See the whole menu',
    call: 'Call',
    featured: {
      eyebrow: 'Customer favourites',
      title: 'What our customers keep recommending',
      lede: 'The dishes and sweets that keep coming back in the reviews. Prices go online as soon as the owner confirms the price list.'
    },
    featuredEmpty: 'The featured dishes are coming soon. In the meantime, look at the whole menu.',
    photoLabel: 'Photo on its way',
    photoAlt: (name) => `Space reserved for the photograph of ${name}`,
    highlights: [
      {
        title: 'Open around the clock',
        text: 'Open 24 hours from Monday to Saturday, and from 5:30 to 21:00 on Sunday.'
      },
      {
        title: 'Halal options',
        text: 'Kebab, falafel and dishes prepared with halal options. Ask at the counter.'
      },
      {
        title: 'The pastry counter',
        text: 'Brioches, croissants, biscuits and cakes every day, next to the focaccia.'
      },
      {
        title: 'Hot deli dishes',
        text: 'Lasagne, omelettes and ready dishes prepared in the morning for a quick lunch.'
      }
    ],
    shop: {
      eyebrow: 'The shop',
      title: 'Bakery, coffee shop and deli under one roof'
    },
    visit: {
      eyebrow: 'Come and see us',
      title: 'Via Sardegna 40, Milan',
      lede: 'In the De Angeli area, right by the Greek Orthodox church. Seats inside and outside, counter service and takeaway.'
    },
    hoursTitle: 'Opening hours',
    contactTitle: 'Contact us',
    mapsLink: 'Open the location on Google Maps',
    menuLink: 'Look at the menu'
  }
}

export default function Home() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it
  // The first paint shows the snapshot generated from db/seed.sql, so the
  // prerendered HTML carries the real cards and a host without an API
  // never shows an empty section. GET /api/menu upgrades it when it
  // answers, see client/src/lib/content.js.
  const [categories, setCategories] = useState(menuCategories)

  usePageMeta({
    description: copy.metaDescription,
    path: '/',
    jsonLd: locale === 'en' ? bakeryJsonLdEn : bakeryJsonLd
  })

  useEffect(() => {
    let active = true

    loadMenu()
      .then((data) => {
        if (active) setCategories(data)
      })
      .catch(() => {})

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
      <section className="home-hero" aria-labelledby="titolo-pagina">
        <Photo
          photo={heroShopfront}
          alt={photoAlt(heroShopfront, locale)}
          sizes={PHOTO_SIZES.hero}
          className="home-hero-bg"
          loading="eager"
          fetchPriority="high" />

        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <span className="home-hero-kicker">{site.addressFull}</span>
            <h1 id="titolo-pagina">{site.name}</h1>
            <p className="home-tagline">{copy.tagline}</p>
            <div className="btn-row home-hero-actions">
              <Link className="btn btn-primary" to={localisedPath('/menu', locale)}>
                {copy.seeMenu}
              </Link>
              <a className="btn btn-on-dark" href={`tel:${site.phonePrimaryHref}`}>
                {copy.call} {site.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-featured" aria-labelledby="titolo-scelti">
        <div className="container">
          <SectionHeading
            id="titolo-scelti"
            eyebrow={copy.featured.eyebrow}
            title={copy.featured.title}
            lede={copy.featured.lede} />

          {featured.length === 0 ? <p className="status-note">{copy.featuredEmpty}</p> : null}

          {featured.length > 0 ? (
            <div className="card-grid card-grid-3">
              {featured.map(({ item, category }) => {
                const photo = photoForItem(item.id)
                const name =
                  locale === 'en' ? item.name_en || item.name_it : item.name_it
                const categoryName =
                  locale === 'en'
                    ? category.name_en || category.name_it
                    : category.name_it
                const description =
                  locale === 'en'
                    ? item.description_en || item.description_it
                    : item.description_it

                return (
                  <article className="card" key={item.id}>
                    {photo ? (
                      <Photo
                        photo={photo}
                        alt={photoAlt(photo, locale)}
                        className="card-photo" />
                    ) : (
                      <PlaceholderImage
                        label={copy.photoLabel}
                        alt={copy.photoAlt(name)} />
                    )}
                    <div className="card-body">
                      <h3 className="card-title">{name}</h3>
                      {description ? <p className="card-text">{description}</p> : null}
                      <div className="card-footer">
                        <span className="card-text">{categoryName}</span>
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
            eyebrow={copy.shop.eyebrow}
            title={copy.shop.title} />
          <ul className="highlight-list">
            {copy.highlights.map((highlight) => (
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
            eyebrow={copy.visit.eyebrow}
            title={copy.visit.title}
            lede={copy.visit.lede} />

          <div className="home-visit">
            <div className="home-visit-panel">
              <h3 className="home-visit-title">{copy.hoursTitle}</h3>
              <HoursPanel />
            </div>

            <div className="home-visit-panel">
              <h3 className="home-visit-title">{copy.contactTitle}</h3>
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
                  {copy.mapsLink}
                </a>
                <Link className="btn btn-secondary" to={localisedPath('/menu', locale)}>
                  {copy.menuLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
