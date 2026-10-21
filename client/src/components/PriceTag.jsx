// Prices are NULL in the database until the owner confirms them.
// Until then the card says so instead of showing a number.

import { useLocale } from '../lib/i18n.js'

const euro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR'
})

const PENDING_COPY = {
  it: 'Prezzo da confermare',
  en: 'Price to be confirmed'
}

export default function PriceTag({ price }) {
  const locale = useLocale()
  const hasPrice = price !== null && price !== undefined && price !== ''

  if (!hasPrice) {
    return <span className="price-pending">{PENDING_COPY[locale] ?? PENDING_COPY.it}</span>
  }

  return <span className="price">{euro.format(Number(price))}</span>
}
