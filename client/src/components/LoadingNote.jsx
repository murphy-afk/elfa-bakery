import { useLocale } from '../lib/i18n.js'

const COPY = {
  it: 'Caricamento in corso...',
  en: 'Loading...'
}

export default function LoadingNote() {
  const locale = useLocale()

  return (
    <p className="status-note" role="status">
      {COPY[locale] ?? COPY.it}
    </p>
  )
}
