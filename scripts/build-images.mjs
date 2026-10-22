// Builds every photograph the site ships, out of the Instagram exports in
// docs/references/instagram, and replaces the hand resized stop gap that
// sat in client/public/photos.
// For each row of client/src/lib/photos.js the pipeline writes:
//   <name>.jpg, <name>.webp, <name>.avif      at 720 px wide, the width
//                                             photo.image_url points at
//   <name>-480.<format>                       at 480 px, for phones
//   <name>-1080.<format>                      at 1080 px, for dense
//                                             screens and the home hero,
//                                             or the widest the original
//                                             has when it is smaller
// plus og-elfa-bakery.jpg, the 1200x630 share image cropped from the
// shop front photograph.
// It then writes client/src/lib/photoVariants.js, the module that tells
// client/src/components/Photo.jsx which files exist, and checks the whole
// output against the inventory in client/src/lib/photos.js: a photograph
// with no source, a file the inventory does not ask for, and a file the
// pipeline should have written but did not all stop the build.
// Outputs are build artifacts, so client/public/photos is in .gitignore.
// npm run dev and npm run build run this first, and a photo whose source
// and settings have not changed is not encoded again. Run with --force to
// rebuild everything.
// Run with: npm run build:images

import { createHash } from 'node:crypto'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

import { galleryPhotos, ogPhoto } from '../client/src/lib/photos.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'docs', 'references', 'instagram')
const outDir = join(root, 'client', 'public', 'photos')
const variantsPath = join(root, 'client', 'src', 'lib', 'photoVariants.js')
const cachePath = join(root, 'scripts', '.image-cache.json')

// The widths written for every photo. 720 is the fallback width: it is
// the file image_url points at, in every format.
const WIDTHS = [480, 720, 1080]
const FALLBACK_WIDTH = 720

// avif and webp are the formats a browser may pick, jpeg is what the
// <img> falls back to and what the gallery table in the database points
// at, so the same file has to exist with no width suffix.
const FORMATS = [
  { ext: 'avif', options: { quality: 55 } },
  { ext: 'webp', options: { quality: 72 } },
  { ext: 'jpg', options: { quality: 74, progressive: true } }
]

const OG_SIZE = { width: 1200, height: 630, quality: 80 }
const OG_SOURCE = 'exterior-vetrina-01.jpg'

const CONFIG = { WIDTHS, FALLBACK_WIDTH, FORMATS, OG_SIZE, OG_SOURCE }
const CONFIG_HASH = createHash('sha256').update(JSON.stringify(CONFIG)).digest('hex').slice(0, 16)
const force = process.argv.includes('--force')

// ---------------------------------------------------------------------------
// Names and sizes.
// ---------------------------------------------------------------------------

function stemOf(imageUrl) {
  if (!imageUrl.startsWith('/photos/') || !imageUrl.endsWith('.jpg')) {
    throw new Error(`${imageUrl} is not a /photos/<name>.jpg path in client/src/lib/photos.js`)
  }
  return imageUrl.slice('/photos/'.length, -'.jpg'.length)
}

function fileName(stem, width, ext) {
  return width === FALLBACK_WIDTH ? `${stem}.${ext}` : `${stem}-${width}.${ext}`
}

// 480, 720, and 1080 wide files, plus the widest the original can give
// when it sits between 720 and 1080, like the 1025 px export. A source
// narrower than the fallback width cannot feed image_url, so it stops the
// build instead of shipping a broken picture.
function widthsFor(stem, sourceWidth) {
  const widths = WIDTHS.filter((width) => width <= sourceWidth)
  if (!widths.includes(FALLBACK_WIDTH)) {
    throw new Error(
      `docs/references/instagram/${stem}.jpg is ${sourceWidth} px wide, the pipeline needs at least ${FALLBACK_WIDTH} px.`
    )
  }
  const widest = Math.min(sourceWidth, WIDTHS[WIDTHS.length - 1])
  if (widest > widths[widths.length - 1]) widths.push(widest)
  return widths
}

function srcSet(stem, widths, ext) {
  return widths.map((width) => `/photos/${fileName(stem, width, ext)} ${width}w`).join(', ')
}

// ---------------------------------------------------------------------------
// Cache, so a build that follows another one does not re-encode 250 files.
// ---------------------------------------------------------------------------

function readCache() {
  if (!existsSync(cachePath)) return {}
  try {
    return JSON.parse(readFileSync(cachePath, 'utf8'))
  } catch {
    return {}
  }
}

function isFresh(cacheEntry, sourcePath, outputs) {
  if (!cacheEntry || cacheEntry.config !== CONFIG_HASH) return false
  const stats = statSync(sourcePath)
  if (cacheEntry.size !== stats.size || cacheEntry.mtimeMs !== Math.round(stats.mtimeMs)) {
    return false
  }
  return outputs.every((output) => existsSync(join(outDir, output)))
}

// ---------------------------------------------------------------------------
// The work list: one entry per photograph, plus the share image.
// ---------------------------------------------------------------------------

const errors = []
const jobs = []

for (const photo of galleryPhotos) {
  const stem = stemOf(photo.image_url)
  const sourcePath = join(sourceDir, `${stem}.jpg`)

  if (!existsSync(sourcePath)) {
    errors.push(`No source photograph for ${photo.image_url}, expected docs/references/instagram/${stem}.jpg`)
    continue
  }

  const metadata = await sharp(sourcePath).metadata()
  if (!metadata.width || !metadata.height) {
    errors.push(`Cannot read the size of docs/references/instagram/${stem}.jpg`)
    continue
  }

  const widths = widthsFor(stem, metadata.width)
  const files = []
  for (const width of widths) {
    for (const format of FORMATS) files.push(fileName(stem, width, format.ext))
  }

  const largest = widths[widths.length - 1]
  jobs.push({
    kind: 'photo',
    stem,
    sourcePath,
    widths,
    files,
    variants: {
      width: largest,
      height: Math.round((largest * metadata.height) / metadata.width),
      src: `/photos/${fileName(stem, FALLBACK_WIDTH, 'jpg')}`,
      srcset: srcSet(stem, widths, 'jpg'),
      sources: FORMATS.filter((format) => format.ext !== 'jpg').map((format) => ({
        type: `image/${format.ext}`,
        srcset: srcSet(stem, widths, format.ext)
      }))
    }
  })
}

if (!errors.length) {
  jobs.push({
    kind: 'og',
    stem: stemOf(ogPhoto.src),
    sourcePath: join(sourceDir, OG_SOURCE),
    files: [ogPhoto.src.slice('/photos/'.length)]
  })
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Encode.
// ---------------------------------------------------------------------------

mkdirSync(outDir, { recursive: true })

const cache = readCache()
const written = []
const skipped = []
const variants = {}

for (const job of jobs) {
  if (!force && isFresh(cache[job.stem], job.sourcePath, job.files)) {
    skipped.push(job.stem)
  } else {
    const buffer = readFileSync(job.sourcePath)

    if (job.kind === 'og') {
      await sharp(buffer)
        .rotate()
        .resize(OG_SIZE.width, OG_SIZE.height, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: OG_SIZE.quality, progressive: true })
        .toFile(join(outDir, job.files[0]))
      written.push(job.files[0])
    } else {
      for (const width of job.widths) {
        for (const format of FORMATS) {
          const output = fileName(job.stem, width, format.ext)
          await sharp(buffer)
            .rotate()
            .resize({ width, withoutEnlargement: true })
            [format.ext === 'jpg' ? 'jpeg' : format.ext]({ ...format.options })
            .toFile(join(outDir, output))
          written.push(output)
        }
      }
    }

    const stats = statSync(job.sourcePath)
    cache[job.stem] = {
      size: stats.size,
      mtimeMs: Math.round(stats.mtimeMs),
      config: CONFIG_HASH
    }
  }

  if (job.kind === 'photo') variants[job.stem] = job.variants
}

// ---------------------------------------------------------------------------
// The inventory check, and the generated module.
// ---------------------------------------------------------------------------

const expected = new Set(jobs.flatMap((job) => job.files))
const onDisk = existsSync(outDir) ? readdirSync(outDir).filter((name) => !name.startsWith('.')) : []

const missingFiles = [...expected].filter((name) => !onDisk.includes(name))
const strayFiles = onDisk.filter((name) => !expected.has(name))

if (strayFiles.length > 0) {
  for (const name of strayFiles) rmSync(join(outDir, name))
  console.log(`Removed ${strayFiles.length} file(s) the inventory does not ask for: ${strayFiles.join(', ')}`)
}

if (missingFiles.length > 0) {
  console.error(`The pipeline did not write: ${missingFiles.join(', ')}`)
  process.exit(1)
}

const shipped = readdirSync(outDir).filter((name) => !name.startsWith('.'))

const photoVariants = Object.fromEntries(
  galleryPhotos.map((photo) => [photo.image_url, variants[stemOf(photo.image_url)]])
)

const banner = `// Generated by scripts/build-images.mjs from the photographs in
// docs/references/instagram. Do not edit by hand: run npm run build:images
// after changing client/src/lib/photos.js.
// One entry per photograph, keyed by the image_url in that file: the
// intrinsic size of the widest file, the 720 px jpeg the url points at,
// its srcset, and the sources for the formats a browser may pick.
// client/src/components/Photo.jsx turns this into a <picture>.

`

writeFileSync(
  variantsPath,
  `${banner}export const photoVariants = ${JSON.stringify(photoVariants, null, 2)}\n`,
  'utf8'
)
writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8')

const totalBytes = shipped.reduce((total, name) => total + statSync(join(outDir, name)).size, 0)
const totalMb = (totalBytes / (1024 * 1024)).toFixed(1)

console.log(
  `${jobs.length} photographs, ${written.length} file(s) written, ${skipped.length} unchanged, ` +
    `${shipped.length} files in ${relative(root, outDir)} (${totalMb} MB).`
)
console.log(`Wrote ${relative(root, variantsPath)}.`)
