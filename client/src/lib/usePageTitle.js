import { useEffect } from 'react'

const DEFAULT_TITLE = 'Elfa Bakery | Bakery e Pasticceria a Milano'
const TITLE_SUFFIX = ' | Elfa Bakery'

// Keeps document.title in sync for each route. Per page meta tags and
// structured data are added in Session 5.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title}${TITLE_SUFFIX}` : DEFAULT_TITLE
  }, [title])
}
