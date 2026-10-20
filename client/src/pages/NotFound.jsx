import { Link } from 'react-router-dom'

import usePageMeta from '../lib/usePageMeta.js'

export default function NotFound() {
  usePageMeta({
    title: 'Pagina non trovata',
    description: 'La pagina che cerchi su elfabakery.it non esiste.',
    noindex: true
  })

  return (
    <section className="container not-found">
      <h1>Pagina non trovata</h1>
      <p className="measure">
        La pagina che cerchi non esiste o è stata spostata. Torna alla pagina
        principale o guarda il menu.
      </p>
      <div className="btn-row not-found-actions">
        <Link className="btn btn-primary" to="/">
          Torna alla home
        </Link>
        <Link className="btn btn-secondary" to="/menu">
          Vedi il menu
        </Link>
      </div>
    </section>
  )
}
