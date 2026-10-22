import { Fragment } from 'react'

import usePageMeta from '../lib/usePageMeta.js'
import { useLocale } from '../lib/i18n.js'

// The analytics tool is Plausible, loaded only when the build sets
// VITE_PLAUSIBLE_DOMAIN, see client/src/lib/analytics.js. It sets no
// cookie, so no consent banner is needed for it. The hosting details and
// the legal data are still open, see docs/owner-intake.md.

const COPY = {
  it: {
    title: 'Cookie policy',
    description:
      'Cookie policy del sito elfabakery.it: cookie tecnici, link ai siti terzi e strumenti di analisi.',
    heading: 'Cookie policy',
    lede: 'Questa pagina spiega quali cookie usa il sito elfabakery.it e come puoi gestirli dal tuo browser.',
    warning:
      'Bozza da completare: i dettagli del provider di hosting e i dati societari per la privacy arrivano nelle prossime sessioni.',
    sections: [
      {
        heading: 'Cosa sono i cookie',
        text: 'I cookie sono piccoli file che un sito salva sul tuo dispositivo per ricordare informazioni sulla visita. Possono essere tecnici, necessari al funzionamento, oppure di profilazione, usati per tracciare le preferenze.'
      },
      {
        heading: 'Cookie tecnici di questo sito',
        text: 'Il sito elfabakery.it in questo momento non salva cookie propri di profilazione e non usa cookie pubblicitari. Le pagine si aprono e si navigano senza alcun consenso.'
      },
      {
        heading: 'Siti terzi',
        text: 'Quando apri i link a Google Maps, Instagram e Facebook esci dal sito e sei soggetto alle condizioni di quei siti, comprese le loro cookie policy.'
      },
      {
        heading: 'Strumenti di analisi',
        text: 'Il sito usa Plausible Analytics per contare le visite in forma anonima, e solo per capire quante persone arrivano sulle pagine. Plausible non salva cookie e non raccoglie dati personali, quindi non serve alcun banner di consenso.'
      },
      {
        heading: 'Come gestire i cookie dal browser',
        text: 'Puoi vedere, bloccare o eliminare i cookie dalle impostazioni del tuo browser, nella sezione privacy. Il percorso cambia in base al browser che usi: Chrome, Firefox, Safari ed Edge hanno tutti una sezione dedicata ai cookie. Se blocchi tutti i cookie, alcune funzioni del sito potrebbero non funzionare.'
      },
      {
        heading: 'Contatti',
        text: 'Per domande su questa pagina puoi usare i recapiti della pagina Contatti.'
      }
    ]
  },
  en: {
    title: 'Cookie policy',
    description:
      'The cookie policy of elfabakery.it: technical cookies, links to third party sites and analytics tools.',
    heading: 'Cookie policy',
    lede: 'This page explains which cookies the site elfabakery.it uses and how you can manage them from your browser.',
    warning:
      'Draft to complete: the details of the hosting provider and the company data for the privacy policy are coming in the next sessions.',
    sections: [
      {
        heading: 'What cookies are',
        text: 'Cookies are small files that a site saves on your device to remember information about the visit. They can be technical, needed for the site to work, or used for profiling, to track preferences.'
      },
      {
        heading: 'Technical cookies on this site',
        text: 'The site elfabakery.it currently saves no profiling cookies of its own and uses no advertising cookies. The pages open and browse with no consent at all.'
      },
      {
        heading: 'Third party sites',
        text: 'When you open the links to Google Maps, Instagram and Facebook you leave this site, and the conditions of those sites apply to you, including their cookie policies.'
      },
      {
        heading: 'Analytics tools',
        text: 'The site uses Plausible Analytics to count visits anonymously, only to understand how many people reach each page. Plausible sets no cookie and collects no personal data, so no consent banner is needed for it.'
      },
      {
        heading: 'How to manage cookies from your browser',
        text: 'You can see, block or delete cookies from your browser settings, in the privacy section. The path depends on the browser you use: Chrome, Firefox, Safari and Edge all have a section for cookies. If you block every cookie, some features of the site may stop working.'
      },
      {
        heading: 'Contact',
        text: 'For questions about this page you can use the contact details on the Contact page.'
      }
    ]
  }
}

export default function Cookies() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  usePageMeta({
    title: copy.title,
    description: copy.description,
    path: '/cookie-policy'
  })

  return (
    <div className="container page-intro">
      <h1>{copy.heading}</h1>
      <p>{copy.lede}</p>

      <p className="status-note status-note-error legal-warning">{copy.warning}</p>

      <div className="legal-body">
        {copy.sections.map((section) => (
          <Fragment key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
