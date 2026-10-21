import usePageMeta from '../lib/usePageMeta.js'
import { site } from '../lib/site.js'
import { galleryPhotos } from '../lib/photos.js'
import SocialIcon from '../components/SocialIcon.jsx'

// The photographs come from client/src/lib/photos.js, a static list of
// the images exported from the shop Instagram account. The same rows are
// in the gallery table in db/seed.sql. A later session swaps this list
// for a fetch of GET /api/gallery once the database is seeded and the
// API is guaranteed to be the process behind the site.

export default function Gallery() {
  usePageMeta({
    title: 'Galleria',
    description:
      'Foto del banco, dei piatti e del negozio di Elfa Bakery in Via Sardegna 40, Milano.',
    path: '/galleria'
  })

  return (
    <>
      <section className="container page-intro">
        <h1>Galleria</h1>
        <p>
          Il banco, i piatti e il negozio. Le fotografie sono quelle
          pubblicate sul profilo ufficiale di Elfa Bakery.
        </p>
      </section>

      <section className="container section-tight" aria-label="Fotografie di Elfa Bakery">
        <ul className="gallery-grid">
          {galleryPhotos.map((photo) => (
            <li className="gallery-item" key={photo.id}>
              <img
                src={photo.image_url}
                alt={photo.alt_it}
                loading="lazy"
                decoding="async"
                className="gallery-photo" />
            </li>
          ))}
        </ul>

        <p className="status-note gallery-note">
          Ce ne sono altre sul nostro profilo{' '}
          <a className="social-link" href={site.instagram}>
            <SocialIcon network="instagram" />
            Instagram di Elfa Bakery
          </a>, e altre ancora in negozio. Vieni a trovarci in Via Sardegna 40.
        </p>
      </section>
    </>
  )
}
