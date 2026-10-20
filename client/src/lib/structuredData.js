// JSON-LD structured data for the bakery.
// Every value mirrors a row in db/seed.sql, nothing is guessed here.

import { site } from './site.js'

// TODO: confirm the Sunday schedule and the winter schedule with the
// owner, then mirror the fix in db/seed.sql and here.
const OPEN_ALL_DAY = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '00:00',
  closes: '23:59'
}

const SUNDAY = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: 'Sunday',
  opens: '00:00',
  closes: '15:00'
}

// TODO: add aggregateRating only after the owner picks which rating to
// publish, and only when the same number is visible on the page.
export const bakeryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: site.name,
  url: `${site.origin}/`,
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
