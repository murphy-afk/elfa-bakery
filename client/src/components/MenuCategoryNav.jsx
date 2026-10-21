import { useLocale } from '../lib/i18n.js'

const ARIA_LABEL = {
  it: 'Categorie del menu',
  en: 'Menu categories'
}

export default function MenuCategoryNav({ categories }) {
  const locale = useLocale()

  if (categories.length === 0) return null

  return (
    <nav className="menu-tabs" aria-label={ARIA_LABEL[locale] ?? ARIA_LABEL.it}>
      <div className="container">
        <ul className="menu-tabs-list">
          {categories.map((category) => (
            <li key={category.id}>
              <a className="menu-tab" href={`#${category.slug}`}>
                {locale === 'en' ? category.name_en || category.name_it : category.name_it}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
