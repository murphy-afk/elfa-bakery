// Prices are NULL in the database until the owner confirms them.
// Until then the card says so instead of showing a number.

const euro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR'
})

export default function PriceTag({ price }) {
  const hasPrice = price !== null && price !== undefined && price !== ''

  if (!hasPrice) {
    return <span className="price-pending">Prezzo da confermare</span>
  }

  return <span className="price">{euro.format(Number(price))}</span>
}
