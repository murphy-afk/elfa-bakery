import { Fragment } from 'react'

import usePageMeta from '../lib/usePageMeta.js'
import { useLocale } from '../lib/i18n.js'

// Draft policy. The analytics tools are chosen in Session 6, and the
// cookie banner decision depends on that choice, see docs/owner-intake.md.

const COPY = {
  it: {
    title: 'Cookie policy',
    description:
      'Cookie policy del sito elfabakery.it: cookie tecnici, link ai siti terzi e strumenti di analisi.',
    heading: 'Cookie policy',
    lede: 'Questa pagina spiega quali cookie usa il sito elfabakery.it e come puoi gestirli dal tuo browser.',
    warning:
      'Bozza da completare: la scelta degli strumenti di analisi e i dettagli del provider di hosting arrivano nelle prossime sessioni.',
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
        text: 'Nessuno strumento di analisi è attivo oggi. Se ne verrà attivato uno, questa pagina verrà aggiornata e, se serve, verrà mostrato un banner per raccogliere il tuo consenso prima dell’attivazione.'
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
      'Draft to complete: the choice of analytics tools and the details of the hosting provider are coming in the next sessions.',
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
        text: 'No analytics tool is active today. If one is switched on, this page will be updated and, where needed, a banner will ask for your consent before it is turned on.'
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
