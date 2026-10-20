export default function MenuCategoryNav({ categories }) {
  if (categories.length === 0) return null

  return (
    <nav className="menu-tabs" aria-label="Categorie del menu">
      <div className="container">
        <ul className="menu-tabs-list">
          {categories.map((category) => (
            <li key={category.id}>
              <a className="menu-tab" href={`#${category.slug}`}>
                {category.name_it}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
