import { Link } from 'react-router-dom'

import { site } from '../lib/site.js'
import { useLocale, localisedPath } from '../lib/i18n.js'
import SocialIcon from './SocialIcon.jsx'

const COPY = {
  it: {
    titles: {
      where: 'Dove siamo',
      contact: 'Contatti',
      social: 'Social',
      shop: 'Il negozio',
      legal: 'Legale'
    },
    whereItems: [site.addressLine, site.addressCity, 'zona De Angeli, Milano'],
    mapsLink: 'Apri la posizione su Google Maps',
    // The visible text is the handle only, the full profile name stays on
    // the link for screen readers through aria-label.
    social: [
      {
        network: 'instagram',
        href: site.instagram,
        handle: site.instagramHandle,
        label: 'Profilo Instagram di Elfa Bakery'
      },
      {
        network: 'facebook',
        href: site.facebook,
        handle: site.facebookHandle,
        label: 'Pagina Facebook di Elfa Bakery'
      }
    ],
    shopItems: [
      'Bakery, caffetteria, pasticceria e gastronomia',
      'Pizza al trancio, kebab, falafel e dolci',
      'Opzioni halal'
    ],
    privacy: 'Informativa sulla privacy',
    cookies: 'Cookie policy',
    note:
      'I prezzi sono ancora in fase di conferma con il titolare. Per il ' +
      'listino aggiornato chiedi direttamente al negozio.'
  },
  en: {
    titles: {
      where: 'Where we are',
      contact: 'Contact',
      social: 'Social',
      shop: 'The shop',
      legal: 'Legal'
    },
    whereItems: [site.addressLine, site.addressCity, 'De Angeli area, Milan'],
    mapsLink: 'Open the location on Google Maps',
    social: [
      {
        network: 'instagram',
        href: site.instagram,
        handle: site.instagramHandle,
        label: 'Elfa Bakery on Instagram'
      },
      {
        network: 'facebook',
        href: site.facebook,
        handle: site.facebookHandle,
        label: 'Elfa Bakery on Facebook'
      }
    ],
    shopItems: [
      'Bakery, coffee shop, pastry counter and deli',
      'Pizza by the slice, kebab, falafel and sweets',
      'Halal options'
    ],
    privacy: 'Privacy policy',
    cookies: 'Cookie policy',
    note:
      'Prices are still being confirmed with the owner. For the updated ' +
      'price list, ask the shop directly.'
  }
}

export default function SiteFooter() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-inner">
          <div>
            <h2 className="site-footer-title">{copy.titles.where}</h2>
            <ul className="info-list">
              {copy.whereItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                <a href={site.mapsUrl}>{copy.mapsLink}</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="site-footer-title">{copy.titles.contact}</h2>
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
            <h2 className="site-footer-title">{copy.titles.social}</h2>
            <ul className="info-list">
              {copy.social.map((profile) => (
                <li key={profile.network}>
                  <a
                    className="social-link"
                    href={profile.href}
                    aria-label={profile.label}>
                    <SocialIcon network={profile.network} />
                    <span className="social-handle">{profile.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer-title">{copy.titles.shop}</h2>
            <ul className="info-list">
              {copy.shopItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="site-footer-title">{copy.titles.legal}</h2>
            <ul className="info-list">
              <li>
                <Link to={localisedPath('/privacy-policy', locale)}>{copy.privacy}</Link>
              </li>
              <li>
                <Link to={localisedPath('/cookie-policy', locale)}>{copy.cookies}</Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="site-footer-note">{copy.note}</p>
      </div>
    </footer>
  )
}
