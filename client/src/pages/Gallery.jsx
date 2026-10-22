import usePageMeta from '../lib/usePageMeta.js'
import { site } from '../lib/site.js'
import { galleryPhotos, photoAlt } from '../lib/photos.js'
import { PHOTO_SIZES } from '../lib/photoSizes.js'
import { useLocale } from '../lib/i18n.js'
import Photo from '../components/Photo.jsx'
import SocialIcon from '../components/SocialIcon.jsx'

// The photographs come from client/src/lib/photos.js, a static list of
// the images exported from the shop Instagram account. The same rows are
// in the gallery table in db/seed.sql, and GET /api/gallery returns them
// too. The page reads the list and not the API, so the gallery works
// before the database is seeded and on a host with no API process.
// Each photograph renders through the Photo component, which picks the
// size and the format the browser needs out of the files
// scripts/build-images.mjs wrote.

const COPY = {
  it: {
    title: 'Galleria',
    description:
      'Foto del banco, dei piatti e del negozio di Elfa Bakery in Via Sardegna 40, Milano.',
    heading: 'Galleria',
    lede: 'Il banco, i piatti e il negozio. Le fotografie sono quelle pubblicate sul profilo ufficiale di Elfa Bakery.',
    sectionLabel: 'Fotografie di Elfa Bakery',
    note: 'Ce ne sono altre sul nostro profilo',
    noteTail: ', e altre ancora in negozio. Vieni a trovarci in Via Sardegna 40.',
    instagram: 'Instagram di Elfa Bakery'
  },
  en: {
    title: 'Gallery',
    description:
      'Photos of the counter, the dishes and the shop at Elfa Bakery in Via Sardegna 40, Milan.',
    heading: 'Gallery',
    lede: 'The counter, the dishes and the shop. The photographs are the ones published on the official Elfa Bakery profile.',
    sectionLabel: 'Photographs of Elfa Bakery',
    note: 'You can see more on our',
    noteTail: ', and more again in the shop. Come and find us in Via Sardegna 40.',
    instagram: 'Elfa Bakery Instagram profile'
  }
}

export default function Gallery() {
  const locale = useLocale()
  const copy = COPY[locale] ?? COPY.it

  usePageMeta({
    title: copy.title,
    description: copy.description,
    path: '/galleria'
  })

  return (
    <>
      <section className="container page-intro">
        <h1>{copy.heading}</h1>
        <p>{copy.lede}</p>
      </section>

      <section className="container section-tight" aria-label={copy.sectionLabel}>
        <ul className="gallery-grid">
          {galleryPhotos.map((photo) => (
            <li className="gallery-item" key={photo.id}>
              <Photo
                photo={photo}
                alt={photoAlt(photo, locale)}
                sizes={PHOTO_SIZES.gallery}
                className="gallery-photo" />
            </li>
          ))}
        </ul>

        <p className="status-note gallery-note">
          {copy.note}{' '}
          <a className="social-link" href={site.instagram} aria-label={copy.instagram}>
            <SocialIcon network="instagram" />
            <span className="social-handle">{site.instagramHandle}</span>
          </a>
          {copy.noteTail}
        </p>
      </section>
    </>
  )
}
