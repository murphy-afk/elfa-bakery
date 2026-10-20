import { Link } from 'react-router-dom'

import usePageMeta from '../lib/usePageMeta.js'
import SectionHeading from '../components/SectionHeading.jsx'

const shopPoints = [
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

const reviewPoints = [
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

export default function About() {
  usePageMeta({
    title: 'Chi siamo',
    description:
      'Elfa Bakery è un negozio di famiglia in Via Sardegna 40, Milano: bakery, caffetteria, pasticceria e gastronomia con opzioni halal, aperti 24 ore.',
    path: '/chi-siamo'
  })

  return (
    <>
      <section className="container page-intro">
        <h1>Chi siamo</h1>
        <p>
          Elfa Bakery è un negozio di quartiere in Via Sardegna 40, nella zona
          De Angeli di Milano. Sotto lo stesso tetto trovi bakery, caffetteria,
          pasticceria e gastronomia: dolci al mattino, pizza e panini a pranzo,
          kebab e piatti caldi fino a notte fonda.
        </p>
      </section>

      <section className="section" aria-labelledby="titolo-negozio">
        <div className="container">
          <SectionHeading
            id="titolo-negozio"
            eyebrow="Il negozio"
            title="Cosa trovi da Elfa Bakery"
            lede="Un bancone solo, quattro modi di mangiare. Tutto si compra nello stesso posto, dal caffè del mattino alla cena tardiva." />

          <ul className="highlight-list">
            {shopPoints.map((point) => (
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
            eyebrow="Le voci dei clienti"
            title="Cosa raccontano quelli che passano di qui"
            lede="Riassunto delle recensioni pubbliche lasciate sui principali siti di ricerca di Milano." />

          <ul className="highlight-list">
            {reviewPoints.map((point) => (
              <li className="highlight-item" key={point.title}>
                <h3 className="highlight-title">{point.title}</h3>
                <p className="highlight-text">{point.text}</p>
              </li>
            ))}
          </ul>

          <div className="btn-row about-actions">
            <Link className="btn btn-primary" to="/menu">
              Guarda il menu
            </Link>
            <Link className="btn btn-secondary" to="/contatti">
              Vieni a trovarci
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
