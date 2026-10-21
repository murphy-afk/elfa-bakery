import { Fragment } from 'react'

import usePageMeta from '../lib/usePageMeta.js'
import { useLocale } from '../lib/i18n.js'

// Draft policy. Every value wrapped in MissingTag must come from the
// owner, see docs/owner-intake.md, section 5. Nothing here is invented.
// Placeholders are written as [brackets] in the copy and rendered by
// withMissing below, so both languages keep the same structure.
function MissingTag({ children }) {
  return <span className="legal-missing">[{children}]</span>
}

function withMissing(text) {
  return text.split(/(\[[^\]]+\])/).map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return <MissingTag key={index}>{part.slice(1, -1)}</MissingTag>
    }
    return part
  })
}

const COPY = {
  it: {
    title: 'Informativa sulla privacy',
    description:
      'Informativa sulla privacy del sito elfabakery.it ai sensi del GDPR. Come vengono trattati i dati personali di chi visita il sito.',
    heading: 'Informativa sulla privacy',
    lede: 'Questa informativa spiega come vengono trattati i dati personali di chi visita il sito elfabakery.it, secondo gli articoli 13 e 14 del Regolamento UE 2016/679 (GDPR).',
    warning:
      'Bozza da completare prima della pubblicazione: i dati societari del titolare e il provider di hosting vanno inseriti dal titolare del negozio.',
    sections: [
      {
        heading: 'Chi tratta i dati',
        blocks: [
          {
            type: 'p',
            text: 'Titolare del trattamento: [ragione sociale, forma giuridica, numero di P. IVA e indirizzo della sede]. Per contattare il titolare puoi usare i recapiti della pagina Contatti.'
          }
        ]
      },
      {
        heading: 'Quali dati raccogliamo',
        blocks: [
          {
            type: 'list',
            items: [
              'Dati di navigazione: il sito è servito da un provider di hosting [nome del provider], che registra i dati tecnici usuali, come indirizzo IP, data, ora e pagina richiesta.',
              'Dati di contatto: se chiami o scrivi ai recapiti del negozio, gestiamo i dati che ci mandi, come nome, recapito e contenuto del messaggio.',
              'Il sito non ha moduli di registrazione e non raccoglie dati per profilare i visitatori.'
            ]
          }
        ]
      },
      {
        heading: 'A cosa servono',
        blocks: [
          {
            type: 'p',
            text: 'I dati servono a far funzionare il sito, a rispondere a chi chiede informazioni e ad adempiere agli obblighi di legge.'
          }
        ]
      },
      {
        heading: 'Base giuridica',
        blocks: [
          {
            type: 'p',
            text: 'Il trattamento si basa sulla richiesta dell’interessato quando ci contatti, sul legittimo interesse a mantenere il sito attivo e sugli obblighi previsti dalla legge.'
          }
        ]
      },
      {
        heading: 'Quanto li conserviamo',
        blocks: [
          {
            type: 'p',
            text: 'I messaggi di contatto sono conservati solo per il tempo necessario a rispondere. [tempi di conservazione previsti]'
          }
        ]
      },
      {
        heading: 'Condivisione e vendita',
        blocks: [
          {
            type: 'p',
            text: 'Non vendiamo dati personali. Possono trattarli i fornitori tecnici del titolare, come il provider di hosting, che agiscono per suo conto. [fornitori coinvolti]'
          }
        ]
      },
      {
        heading: 'I tuoi diritti',
        blocks: [
          {
            type: 'p',
            text: 'Puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati scrivendo al titolare. Hai inoltre diritto di reclamare al Garante per la protezione dei dati personali su garanteprivacy.it.'
          }
        ]
      },
      {
        heading: 'Aggiornamenti',
        blocks: [
          {
            type: 'p',
            text: 'Questa informativa può essere aggiornata quando cambiano il sito o la normativa. Ultimo aggiornamento: ottobre 2026.'
          }
        ]
      }
    ]
  },
  en: {
    title: 'Privacy policy',
    description:
      'The privacy policy of elfabakery.it under the GDPR, on how the personal data of visitors to the site are handled.',
    heading: 'Privacy policy',
    lede: 'This notice explains how the personal data of anyone visiting elfabakery.it is handled, under articles 13 and 14 of EU regulation 2016/679 (GDPR).',
    warning:
      'Draft to complete before publishing: the company details of the owner and the hosting provider must be added by the shop owner.',
    sections: [
      {
        heading: 'Who handles your data',
        blocks: [
          {
            type: 'p',
            text: 'Data controller: [company name, legal form, VAT number and registered address]. To reach the controller you can use the contact details on the Contact page.'
          }
        ]
      },
      {
        heading: 'What data we collect',
        blocks: [
          {
            type: 'list',
            items: [
              'Browsing data: the site is served by a hosting provider [provider name], which records the usual technical data, such as IP address, date, time and requested page.',
              'Contact data: if you call or write to the shop contact details, we handle the data you send us, such as name, contact details and the content of the message.',
              'The site has no registration forms and collects no data to profile its visitors.'
            ]
          }
        ]
      },
      {
        heading: 'What it is used for',
        blocks: [
          {
            type: 'p',
            text: 'The data keeps the site running, answers the people who ask for information, and meets legal obligations.'
          }
        ]
      },
      {
        heading: 'Legal basis',
        blocks: [
          {
            type: 'p',
            text: 'The processing rests on the request of the person concerned when you contact us, on the legitimate interest in keeping the site running, and on the obligations set by law.'
          }
        ]
      },
      {
        heading: 'How long we keep it',
        blocks: [
          {
            type: 'p',
            text: 'Contact messages are kept only for as long as it takes to reply. [retention periods]'
          }
        ]
      },
      {
        heading: 'Sharing and selling',
        blocks: [
          {
            type: 'p',
            text: 'We do not sell personal data. They may be handled by the technical providers of the owner, such as the hosting provider, acting on their behalf. [providers involved]'
          }
        ]
      },
      {
        heading: 'Your rights',
        blocks: [
          {
            type: 'p',
            text: 'You can ask for access, rectification, deletion, restriction, objection and portability of your data by writing to the controller. You also have the right to complain to the Italian data protection authority, the Garante, at garanteprivacy.it.'
          }
        ]
      },
      {
        heading: 'Updates',
        blocks: [
          {
            type: 'p',
            text: 'This notice may be updated when the site or the rules change. Last updated: October 2026.'
          }
        ]
      }
    ]
  }
}

export default function Privacy() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  usePageMeta({
    title: copy.title,
    description: copy.description,
    path: '/privacy-policy'
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
            {section.blocks.map((block, index) =>
              block.type === 'list' ? (
                <ul key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{withMissing(item)}</li>
                  ))}
                </ul>
              ) : (
                <p key={index}>{withMissing(block.text)}</p>
              )
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
