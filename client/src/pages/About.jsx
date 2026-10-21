import { Link } from 'react-router-dom'

import usePageMeta from '../lib/usePageMeta.js'
import { useLocale, localisedPath } from '../lib/i18n.js'
import SectionHeading from '../components/SectionHeading.jsx'

const COPY = {
  it: {
    title: 'Chi siamo',
    description:
      'Elfa Bakery è un negozio di famiglia in Via Sardegna 40, Milano: bakery, caffetteria, pasticceria e gastronomia con opzioni halal, aperti 24 ore.',
    heading: 'Chi siamo',
    lede: 'Elfa Bakery è un negozio di quartiere in Via Sardegna 40, nella zona De Angeli di Milano. Sotto lo stesso tetto trovi bakery, caffetteria, pasticceria e gastronomia: dolci al mattino, pizza e panini a pranzo, kebab e piatti caldi fino a notte fonda.',
    shop: {
      eyebrow: 'Il negozio',
      title: 'Cosa trovi da Elfa Bakery',
      lede: 'Un bancone solo, quattro modi di mangiare. Tutto si compra nello stesso posto, dal caffè del mattino alla cena tardiva.',
      points: [
        {
          title: 'Quattro banconi in uno',
          text: 'Brioches, croissant, biscotti e torte nel banco dolce, pizza al trancio e focacce nella gastronomia, bagel e panini preparati al momento.'
        },
        {
          title: 'Italiano e internazionale',
          text: 'Le classiche pizze e le focacce convivono con bagel, kebab e falafel, per chi vuole cambiare gusto senza cambiare posto.'
        },
        {
          title: 'Opzioni halal',
          text: 'Una parte del banco propone opzioni halal. Chiedi al negozio quali piatti sono disponibili il giorno che passi.'
        },
        {
          title: 'Dal mattino a notte',
          text: 'Aperti 24 ore dal lunedì al sabato, e dalle 5:30 alle 21 di domenica.'
        }
      ]
    },
    reviews: {
      eyebrow: 'Le voci dei clienti',
      title: 'Cosa raccontano quelli che passano di qui',
      lede: 'Riassunto delle recensioni pubbliche lasciate sui principali siti di ricerca di Milano.',
      points: [
        {
          title: 'Accoglienza',
          text: 'Più di un cliente scrive che i titolari ti fanno sentire a casa dal primo minuto.'
        },
        {
          title: 'Il bagel con salmone',
          text: 'Il bagel con salmone, formaggio ed uovo è tra i piatti che tornano più spesso nelle recensioni.'
        },
        {
          title: 'Caffè e pasticceria',
          text: 'Buon caffè, molta scelta al banco dei dolci e un’atmosfera tranquilla a qualsiasi ora.'
        },
        {
          title: 'Pizza e servizio',
          text: 'Impasto curato, ingredienti generosi, prezzi onesti e personale descritto come simpatico e veloce.'
        }
      ]
    },
    menuLink: 'Guarda il menu',
    contactLink: 'Vieni a trovarci'
  },
  en: {
    title: 'About us',
    description:
      'Elfa Bakery is a family shop in Via Sardegna 40, Milan: bakery, coffee shop, pastry counter and deli with halal options, open 24 hours.',
    heading: 'About us',
    lede: 'Elfa Bakery is a neighbourhood shop in Via Sardegna 40, in the De Angeli area of Milan. Under one roof you get a bakery, a coffee shop, a pastry counter and a deli: sweets in the morning, pizza and sandwiches at lunch, kebab and hot dishes late into the night.',
    shop: {
      eyebrow: 'The shop',
      title: 'What you find at Elfa Bakery',
      lede: 'One counter, four ways to eat. Everything comes from the same place, from the morning coffee to a late dinner.',
      points: [
        {
          title: 'Four counters in one',
          text: 'Brioches, croissants, biscuits and cakes at the sweet counter, pizza by the slice and focaccia at the deli, bagels and sandwiches made to order.'
        },
        {
          title: 'Italian and international',
          text: 'Classic pizzas and focaccia sit next to bagels, kebab and falafel, for anyone who wants a different taste without changing seat.'
        },
        {
          title: 'Halal options',
          text: 'Part of the counter offers halal options. Ask in the shop which dishes are available on the day you come by.'
        },
        {
          title: 'From morning to night',
          text: 'Open 24 hours from Monday to Saturday, and from 5:30 to 21:00 on Sunday.'
        }
      ]
    },
    reviews: {
      eyebrow: 'From our customers',
      title: 'What people who stop by tell us',
      lede: 'A summary of the public reviews left on the main Milan search sites.',
      points: [
        {
          title: 'A warm welcome',
          text: 'More than one reviewer writes that the owners make you feel at home from the very first minute.'
        },
        {
          title: 'The salmon bagel',
          text: 'The bagel with salmon, cheese and egg is one of the dishes that comes back most often in the reviews.'
        },
        {
          title: 'Coffee and pastries',
          text: 'Good coffee, a wide choice at the cake counter and a calm atmosphere at any hour.'
        },
        {
          title: 'Pizza and service',
          text: 'Careful dough, generous ingredients, honest prices and staff described as friendly and quick.'
        }
      ]
    },
    menuLink: 'Look at the menu',
    contactLink: 'Come and find us'
  }
}

export default function About() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  usePageMeta({
    title: copy.title,
    description: copy.description,
    path: '/chi-siamo'
  })

  return (
    <>
      <section className="container page-intro">
        <h1>{copy.heading}</h1>
        <p>{copy.lede}</p>
      </section>

      <section className="section" aria-labelledby="titolo-negozio">
        <div className="container">
          <SectionHeading
            id="titolo-negozio"
            eyebrow={copy.shop.eyebrow}
            title={copy.shop.title}
            lede={copy.shop.lede} />

          <ul className="highlight-list">
            {copy.shop.points.map((point) => (
              <li className="highlight-item" key={point.title}>
                <h3 className="highlight-title">{point.title}</h3>
                <p className="highlight-text">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="titolo-recensioni">
        <div className="container">
          <SectionHeading
            id="titolo-recensioni"
            eyebrow={copy.reviews.eyebrow}
            title={copy.reviews.title}
            lede={copy.reviews.lede} />

          <ul className="highlight-list">
            {copy.reviews.points.map((point) => (
              <li className="highlight-item" key={point.title}>
                <h3 className="highlight-title">{point.title}</h3>
                <p className="highlight-text">{point.text}</p>
              </li>
            ))}
          </ul>

          <div className="btn-row about-actions">
            <Link className="btn btn-primary" to={localisedPath('/menu', locale)}>
              {copy.menuLink}
            </Link>
            <Link className="btn btn-secondary" to={localisedPath('/contatti', locale)}>
              {copy.contactLink}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
