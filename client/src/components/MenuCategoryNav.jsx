import { useCallback, useEffect, useRef, useState } from 'react'

import { useLocale } from '../lib/i18n.js'

const ARIA_LABEL = {
  it: 'Categorie del menu',
  en: 'Menu categories'
}

const CONTROL_COPY = {
  it: {
    previous: 'Categorie precedenti',
    next: 'Categorie successive'
  },
  en: {
    previous: 'Previous categories',
    next: 'Next categories'
  }
}

export default function MenuCategoryNav({ categories }) {
  const locale = useLocale()
  const copy = CONTROL_COPY[locale] ?? CONTROL_COPY.it
  const listRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = useCallback(() => {
    const list = listRef.current
    if (!list) return

    setCanScrollLeft(list.scrollLeft > 0)
    setCanScrollRight(list.scrollLeft + list.clientWidth < list.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    updateScrollButtons()
    window.addEventListener('resize', updateScrollButtons)

    const resizeObserver = new ResizeObserver(updateScrollButtons)
    resizeObserver.observe(list)

    return () => {
      window.removeEventListener('resize', updateScrollButtons)
      resizeObserver.disconnect()
    }
  }, [categories, updateScrollButtons])

  const scrollCategories = (direction) => {
    const list = listRef.current
    if (!list) return

    list.scrollBy({
      left: direction * list.clientWidth * 0.75,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    })
  }

  if (categories.length === 0) return null

  return (
    <nav className="menu-tabs" aria-label={ARIA_LABEL[locale] ?? ARIA_LABEL.it}>
      <div className="container menu-tabs-inner">
        <button
          className="menu-tabs-control"
          type="button"
          aria-label={copy.previous}
          disabled={!canScrollLeft}
          onClick={() => scrollCategories(-1)}>
          <span className="menu-tabs-arrow menu-tabs-arrow-left" aria-hidden="true" />
        </button>
        <ul className="menu-tabs-list" ref={listRef} onScroll={updateScrollButtons}>
          {categories.map((category) => (
            <li key={category.id}>
              <a className="menu-tab" href={`#${category.slug}`}>
                {locale === 'en' ? category.name_en || category.name_it : category.name_it}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="menu-tabs-control"
          type="button"
          aria-label={copy.next}
          disabled={!canScrollRight}
          onClick={() => scrollCategories(1)}>
          <span className="menu-tabs-arrow menu-tabs-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
