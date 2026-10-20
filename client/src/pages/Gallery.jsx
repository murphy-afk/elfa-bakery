import { useEffect, useState } from 'react'

import { getJSON } from '../lib/api.js'
import usePageMeta from '../lib/usePageMeta.js'
import PlaceholderImage from '../components/PlaceholderImage.jsx'
import LoadingNote from '../components/LoadingNote.jsx'
import LoadErrorNote from '../components/LoadErrorNote.jsx'

// Stand in for the gallery table until the owner sends real photos.
// TODO: replace the slots with the rows returned by GET /api/gallery.
const slots = [
  { label: 'Il banco', alt: 'Spazio riservato alla fotografia del banco di Elfa Bakery' },
  { label: 'Pizza al trancio', alt: 'Spazio riservato alla fotografia della pizza al trancio' },
  { label: 'Pasticceria', alt: 'Spazio riservato alla fotografia della pasticceria' },
  { label: 'Bagel e panini', alt: 'Spazio riservato alla fotografia dei bagel e dei panini' },
  { label: 'Gli interni', alt: 'Spazio riservato alla fotografia degli interni del negozio' },
  { label: 'La strada', alt: 'Spazio riservato alla fotografia dell’esterno in Via Sardegna' }
]

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  usePageMeta({
    title: 'Galleria',
    description:
      'Foto del banco, dei piatti e del negozio di Elfa Bakery in Via Sardegna 40, Milano.',
    path: '/galleria'
  })

  useEffect(() => {
    let active = true

    getJSON('/gallery')
      .then((data) => {
        if (active) setImages(data)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <section className="container page-intro">
        <h1>Galleria</h1>
        <p>
          Il banco, i piatti e il negozio. Le foto ufficiali arrivano dal
          titolare: finché non arrivano, ogni riquadro indica che cosa ci andrà.
        </p>
      </section>

      <section className="container section-tight" aria-label="Fotografie di Elfa Bakery">
        {loading ? <LoadingNote /> : null}
        {error ? (
          <LoadErrorNote>Non riusciamo a caricare le fotografie.</LoadErrorNote>
        ) : null}

        {!loading && !error && images.length > 0 ? (
          <ul className="gallery-grid">
            {images.map((image) => (
              <li className="gallery-item" key={image.id}>
                <img
                  src={image.image_url}
                  alt={image.alt_it}
                  loading="lazy"
                  className="gallery-photo" />
              </li>
            ))}
          </ul>
        ) : null}

        {!loading && !error && images.length === 0 ? (
          <>
            <ul className="gallery-grid">
              {slots.map((slot) => (
                <li className="gallery-item" key={slot.label}>
                  <PlaceholderImage label="Foto in arrivo" alt={slot.alt} />
                </li>
              ))}
            </ul>
            <p className="status-note gallery-note">
              Le fotografie ufficiali non sono ancora arrivate. Intanto guarda
              il menu o vieni a trovarci in Via Sardegna 40.
            </p>
          </>
        ) : null}
      </section>
    </>
  )
}
