import { useEffect, useState } from 'react'

import { loadMenu, loadAllergens } from '../lib/content.js'
import { menuCategories, allergens as allergenList } from '../lib/menuSnapshot.js'
import usePageMeta from '../lib/usePageMeta.js'
import { useLocale } from '../lib/i18n.js'
import MenuCategoryNav from '../components/MenuCategoryNav.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'

const COPY = {
  it: {
    title: 'Il menu',
    description:
      'Il menu di Elfa Bakery: pizza al trancio, bagel, panini, piadine, kebab, focacce e pasticceria in Via Sardegna 40, Milano. Piatti e allergeni.',
    heading: 'Il menu di Elfa Bakery',
    lede: 'Pizza al trancio, bagel, panini, piadine, kebab, focacce e pasticceria. Il listino è ancora in fase di conferma con il titolare, quindi i prezzi non sono ancora in linea.',
    count: (count) => `${count} proposte`,
    countEmpty: 'In aggiornamento',
    empty: 'I piatti di questa sezione arrivano a breve. Chiedi al banco per la disponibilità di oggi.',
    allergens: 'Allergeni',
    allergensText:
      "Elenchiamo i 14 allergeni previsti dalla normativa europea. Per l'elenco completo piatto per piatto chiedi al banco."
  },
  en: {
    title: 'The menu',
    description:
      'The Elfa Bakery menu: pizza by the slice, bagels, sandwiches, piadinas, kebab, focaccia and pastries in Via Sardegna 40, Milan. Dishes and allergens.',
    heading: 'The Elfa Bakery menu',
    lede: 'Pizza by the slice, bagels, sandwiches, piadinas, kebab, focaccia and pastries. The price list is still being confirmed with the owner, so the prices are not online yet.',
    count: (count) => `${count} items`,
    countEmpty: 'Being updated',
    empty: 'The dishes in this section are coming soon. Ask at the counter for what is available today.',
    allergens: 'Allergens',
    allergensText:
      'We list the 14 allergens set by European law. For the full list dish by dish, ask at the counter.'
  }
}

export default function Menu() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it
  // The first paint shows the snapshot generated from db/seed.sql, so the
  // prerendered HTML carries the whole menu and the allergen list, and a
  // host without an API never shows a load error. The two requests below
  // upgrade the data when an API answers, see client/src/lib/content.js.
  const [categories, setCategories] = useState(menuCategories)
  const [allergens, setAllergens] = useState(allergenList)

  usePageMeta({
    title: copy.title,
    description: copy.description,
    path: '/menu'
  })

  useEffect(() => {
    let active = true

    Promise.all([loadMenu(), loadAllergens()])
      .then(([menuData, allergenData]) => {
        if (!active) return
        setCategories(menuData)
        setAllergens(allergenData)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="menu-page">
      <section className="container menu-intro">
        <h1>{copy.heading}</h1>
        <p>{copy.lede}</p>
      </section>

      <MenuCategoryNav categories={categories} />

      {categories.map((category) => {
        const titleId = `${category.slug}-title`
        const categoryName =
          locale === 'en' ? category.name_en || category.name_it : category.name_it

        return (
          <section
            className="container menu-category"
            id={category.slug}
            key={category.id}
            aria-labelledby={titleId}>
            <div className="menu-category-head">
              <h2 className="menu-category-title" id={titleId}>
                {categoryName}
              </h2>
              <span className="menu-category-count">
                {category.items.length > 0
                  ? copy.count(category.items.length)
                  : copy.countEmpty}
              </span>
            </div>

            {category.items.length === 0 ? (
              <p className="menu-empty">{copy.empty}</p>
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
        className="container menu-allergens-wrap"
        id="allergeni"
        aria-labelledby="allergeni-title">
        <div className="menu-allergens">
          <h2 className="menu-allergens-title" id="allergeni-title">
            {copy.allergens}
          </h2>
          <p className="menu-allergens-text">{copy.allergensText}</p>
          <ul className="menu-allergens-list">
            {allergens.map((allergen) => (
              <li className="menu-allergen" key={allergen.id}>
                {locale === 'en' ? allergen.name_en || allergen.name_it : allergen.name_it}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
