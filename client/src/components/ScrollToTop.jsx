import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps the scroll position on a route change, so a click on
// a navbar item lands in the middle of the next page. Reset it on every
// path change. Hash links are untouched because only the path is watched.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
