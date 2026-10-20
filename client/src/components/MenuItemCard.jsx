import PriceTag from './PriceTag.jsx'

export default function MenuItemCard({ item }) {
  return (
    <li className="menu-item">
      <div className="menu-item-main">
        <h3 className="menu-item-name">{item.name_it}</h3>
        {item.description_it ? (
          <p className="menu-item-desc">{item.description_it}</p>
        ) : null}
      </div>
      <div className="menu-item-aside">
        <PriceTag price={item.price} />
        {item.is_featured ? <span className="menu-item-badge">Consigliato</span> : null}
      </div>
    </li>
  )
}
