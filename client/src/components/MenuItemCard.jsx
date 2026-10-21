import { useLocale } from '../lib/i18n.js'
import PriceTag from './PriceTag.jsx'

const BADGE_COPY = {
  it: 'Consigliato',
  en: 'Recommended'
}

export default function MenuItemCard({ item }) {
  const locale = useLocale()
  const name = locale === 'en' ? item.name_en || item.name_it : item.name_it
  const description =
    locale === 'en' ? item.description_en || item.description_it : item.description_it

  return (
    <li className="menu-item">
      <div className="menu-item-main">
        <h3 className="menu-item-name">{name}</h3>
        {description ? <p className="menu-item-desc">{description}</p> : null}
      </div>
      <div className="menu-item-aside">
        <PriceTag price={item.price} />
        {item.is_featured ? (
          <span className="menu-item-badge">{BADGE_COPY[locale] ?? BADGE_COPY.it}</span>
        ) : null}
      </div>
    </li>
  )
}
