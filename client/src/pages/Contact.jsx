import usePageMeta from '../lib/usePageMeta.js'
import { site } from '../lib/site.js'
import { useLocale } from '../lib/i18n.js'
import HoursPanel from '../components/HoursPanel.jsx'
import SocialIcon from '../components/SocialIcon.jsx'

const COPY = {
  it: {
    title: 'Contatti',
    description:
      'Indirizzo, orari, telefoni e social di Elfa Bakery, Via Sardegna 40, 20146 Milano. Aperti 24 ore dal lunedì al sabato, domenica dalle 5:30 alle 21.',
    heading: 'Contatti',
    lede: 'Siamo in Via Sardegna 40, nella zona De Angeli di Milano, vicino alla chiesa greco ortodossa. Puoi chiamarci, scriverci sui social o passare direttamente al negozio.',
    sectionLabel: 'Recapiti di Elfa Bakery',
    where: 'Dove siamo',
    hours: 'Orari di apertura',
    phone: 'Telefono',
    social: 'Social',
    mapsLink: 'Apri la posizione su Google Maps',
    phoneNote: 'In caso di dubbi prova con il secondo numero.',
    profiles: [
      { network: 'instagram', href: site.instagram, label: 'Profilo Instagram di Elfa Bakery' },
      { network: 'facebook', href: site.facebook, label: 'Pagina Facebook di Elfa Bakery' }
    ],
    socialNote:
      'Su Instagram e Facebook trovi le novità del negozio e i piatti del giorno.'
  },
  en: {
    title: 'Contact',
    description:
      'Address, opening hours, phone numbers and social links for Elfa Bakery, Via Sardegna 40, 20146 Milan. Open 24 hours Monday to Saturday, Sunday from 5:30 to 21:00.',
    heading: 'Contact us',
    lede: 'We are in Via Sardegna 40, in the De Angeli area of Milan, close to the Greek Orthodox church. You can call us, message us on social media, or just drop by the shop.',
    sectionLabel: 'How to reach Elfa Bakery',
    where: 'Where we are',
    hours: 'Opening hours',
    phone: 'Phone',
    social: 'Social',
    mapsLink: 'Open the location on Google Maps',
    phoneNote: 'In doubt? Try the second number.',
    profiles: [
      { network: 'instagram', href: site.instagram, label: 'Elfa Bakery on Instagram' },
      { network: 'facebook', href: site.facebook, label: 'Elfa Bakery on Facebook' }
    ],
    socialNote:
      'Instagram and Facebook carry the news from the shop and the dish of the day.'
  }
}

// TODO: add the contact form once POST /api/contact actually delivers the
// message. For now every route to the shop goes through the phone numbers
// and the social profiles below.
export default function Contact() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  usePageMeta({
    title: copy.title,
    description: copy.description,
    path: '/contatti'
  })

  return (
    <>
      <section className="container page-intro">
        <h1>{copy.heading}</h1>
        <p>{copy.lede}</p>
      </section>

      <section className="container section-tight" aria-label={copy.sectionLabel}>
        <div className="contact-grid">
          <div className="contact-panel">
            <h2 className="contact-panel-title">{copy.where}</h2>
            <ul className="info-list">
              <li>{site.addressLine}</li>
              <li>{site.addressCity}</li>
              <li>
                {locale === 'en' ? 'De Angeli area, Milan' : 'zona De Angeli, Milano'}
              </li>
            </ul>
            <div className="btn-row contact-actions">
              <a className="btn btn-primary" href={site.mapsUrl}>
                {copy.mapsLink}
              </a>
            </div>
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-title">{copy.hours}</h2>
            <HoursPanel />
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-title">{copy.phone}</h2>
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
            <p className="contact-note">{copy.phoneNote}</p>
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-title">{copy.social}</h2>
            <ul className="info-list">
              {copy.profiles.map((profile) => (
                <li key={profile.network}>
                  <a className="social-link" href={profile.href}>
                    <SocialIcon network={profile.network} />
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="contact-note">{copy.socialNote}</p>
          </div>
        </div>
      </section>
    </>
  )
}
