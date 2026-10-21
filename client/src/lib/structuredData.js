// JSON-LD structured data for the bakery.
// Every value mirrors a row in db/seed.sql, nothing is guessed here.

import { site } from './site.js'
import { ogPhoto } from './photos.js'

// Hours mirror db/seed.sql, confirmed by the owner on 2026-10-20.
// Sunday 05:30 to 21:00, Monday to Saturday open all day.
const OPEN_ALL_DAY = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '00:00',
  closes: '23:59'
}

const SUNDAY = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: 'Sunday',
  opens: '05:30',
  closes: '21:00'
}

// TODO: add aggregateRating only after the owner picks which rating to
// publish, and only when the same number is visible on the page.
export const bakeryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: site.name,
  url: `${site.origin}/`,
  image: `${site.origin}${ogPhoto.src}`,
  telephone: site.phonePrimary,
  priceRange: '€',
  servesCuisine: ['Pasticceria', 'Panetteria', 'Caffetteria', 'Gastronomia'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.addressLine,
    addressLocality: site.addressLocality,
    postalCode: site.addressPostalCode,
    addressCountry: site.addressCountry
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.latitude,
    longitude: site.geo.longitude
  },
  openingHoursSpecification: [OPEN_ALL_DAY, SUNDAY],
  sameAs: [site.instagram, site.facebook]
}
