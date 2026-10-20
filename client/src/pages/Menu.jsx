import { useEffect, useState } from 'react'

import { getJSON } from '../lib/api.js'
import usePageMeta from '../lib/usePageMeta.js'
import MenuCategoryNav from '../components/MenuCategoryNav.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import LoadingNote from '../components/LoadingNote.jsx'
import LoadErrorNote from '../components/LoadErrorNote.jsx'

function countLabel(count) {
  return count > 0 ? `${count} proposte` : 'In aggiornamento'
}

export default function Menu() {
  const [categories, setCategories] = useState([])
  const [allergens, setAllergens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  usePageMeta({
    title: 'Il menu',
    description:
      'Il menu di Elfa Bakery: pizza al trancio, bagel, panini, piadine, kebab, focacce e pasticceria in Via Sardegna 40, Milano. Piatti e allergeni.',
    path: '/menu'
  })

  useEffect(() => {
    let active = true

    Promise.all([getJSON('/menu'), getJSON('/allergens')])
      .then(([menuData, allergenData]) => {
        if (!active) return
        setCategories(menuData)
        setAllergens(allergenData)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="menu-page">
      <section className="container menu-intro">
        <h1>Il menu di Elfa Bakery</h1>
        <p>
          Pizza al trancio, bagel, panini, piadine, kebab, focacce e pasticceria.
          Il listino è ancora in fase di conferma con il titolare, quindi i
          prezzi non sono ancora in linea.
        </p>
      </section>

      {loading ? <LoadingNote /> : null}
      {error ? (
        <LoadErrorNote>Non riusciamo a caricare il menu in questo momento.</LoadErrorNote>
      ) : null}

      {!loading && !error ? (
        <>
          <MenuCategoryNav categories={categories} />

          {categories.map((category) => {
            const titleId = `${category.slug}-title`

            return (
              <section
                className="container menu-category"
                id={category.slug}
                key={category.id}
                aria-labelledby={titleId}>
                <div className="menu-category-head">
                  <h2 className="menu-category-title" id={titleId}>
                    {category.name_it}
                  </h2>
                  <span className="menu-category-count">
                    {countLabel(category.items.length)}
                  </span>
                </div>

                {category.items.length === 0 ? (
                  <p className="menu-empty">
                    I piatti di questa sezione arrivano a breve. Chiedi al banco
                    per la disponibilità di oggi.
                  </p>
                ) : (
                  <ul className="menu-list">
                    {category.items.map((item) => (
                      <MenuItemCard item={item} key={item.id} />
                    ))}
                  </ul>
                )}
              </section>
            )
          })}

          <section
            className="container menu-allergens"
            id="allergeni"
            aria-labelledby="allergeni-title">
            <h2 className="menu-allergens-title" id="allergeni-title">
              Allergeni
            </h2>
            <p className="menu-allergens-text">
              Elenchiamo i 14 allergeni previsti dalla normativa europea. Per
              l&apos;elenco completo piatto per piatto chiedi al banco.
            </p>
            <ul className="menu-allergens-list">
              {allergens.map((allergen) => (
                <li className="menu-allergen" key={allergen.id}>
                  {allergen.name_it}
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </div>
  )
}
