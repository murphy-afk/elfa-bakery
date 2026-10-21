import { useLocale } from '../lib/i18n.js'

const DEFAULT_COPY = {
  it: 'Non riusciamo a caricare i contenuti. Riprova tra poco.',
  en: 'We could not load the content. Try again in a moment.'
}

export default function LoadErrorNote({ children }) {
  const locale = useLocale()

  return (
    <p className="status-note status-note-error" role="alert">
      {children || DEFAULT_COPY[locale] || DEFAULT_COPY.it}
    </p>
  )
}
