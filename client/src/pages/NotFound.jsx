import { Link } from 'react-router-dom'

import usePageMeta from '../lib/usePageMeta.js'
import { useLocale, localisedPath } from '../lib/i18n.js'

const COPY = {
  it: {
    title: 'Pagina non trovata',
    description: 'La pagina che cerchi su elfabakery.it non esiste.',
    heading: 'Pagina non trovata',
    lede: 'La pagina che cerchi non esiste o è stata spostata. Torna alla pagina principale o guarda il menu.',
    homeLink: 'Torna alla home',
    menuLink: 'Vedi il menu'
  },
  en: {
    title: 'Page not found',
    description: 'The page you are looking for on elfabakery.it does not exist.',
    heading: 'Page not found',
    lede: 'The page you are looking for does not exist or has moved. Go back to the home page or look at the menu.',
    homeLink: 'Back to the home page',
    menuLink: 'See the menu'
  }
}

export default function NotFound() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  usePageMeta({
    title: copy.title,
    description: copy.description,
    noindex: true
  })

  return (
    <section className="container not-found">
      <h1>{copy.heading}</h1>
      <p className="measure">{copy.lede}</p>
      <div className="btn-row not-found-actions">
        <Link className="btn btn-primary" to={localisedPath('/', locale)}>
          {copy.homeLink}
        </Link>
        <Link className="btn btn-secondary" to={localisedPath('/menu', locale)}>
          {copy.menuLink}
        </Link>
      </div>
    </section>
  )
}
