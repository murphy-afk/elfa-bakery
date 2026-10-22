import { photoVariants } from '../lib/photoVariants.js'
import { PHOTO_SIZES } from '../lib/photoSizes.js'

// One shop photograph, rendered as a <picture> with every size and
// format the pipeline in scripts/build-images.mjs wrote: avif and webp
// for the browsers that take them, the jpeg the database points at as
// the fallback, and a srcset so a phone downloads the 480 px file
// instead of the 1080 px one.
// The files live in client/public, so Vite does not bundle them and the
// base path has to be added by hand. The site is served from the root of
// elfabakery.it and from a subfolder on the preview host, and both work.

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')

function withBase(path) {
  if (!path.startsWith('/')) return path
  return `${BASE}${path}`
}

function srcSetWithBase(srcset) {
  return srcset
    .split(', ')
    .map((candidate) => {
      const [url, width] = candidate.split(' ')
      return `${withBase(url)} ${width}`
    })
    .join(', ')
}

// The `sizes` value tells the browser how wide the picture is on screen.
// The card is the default, the hero and the gallery pass their own from
// client/src/lib/photoSizes.js.
export default function Photo({
  photo,
  alt,
  sizes = PHOTO_SIZES.card,
  className,
  loading = 'lazy',
  fetchPriority
}) {
  const variant = photoVariants[photo.image_url]

  // A photograph whose files the pipeline has not written yet falls back
  // to the one file the inventory points at, so a page never renders an
  // empty box.
  if (!variant) {
    return (
      <img
        src={withBase(photo.image_url)}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async" />
    )
  }

  return (
    <picture>
      {variant.sources.map((source) => (
        <source
          key={source.type}
          type={source.type}
          srcSet={srcSetWithBase(source.srcset)}
          sizes={sizes} />
      ))}
      <img
        src={withBase(variant.src)}
        srcSet={srcSetWithBase(variant.srcset)}
        sizes={sizes}
        width={variant.width}
        height={variant.height}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async" />
    </picture>
  )
}
