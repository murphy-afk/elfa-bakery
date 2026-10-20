// Static contact details used while the settings API is not wired in yet.
// Every value here must match db/seed.sql. Replace this module with a
// fetch of /api/settings once the owner confirms the final details.

export const site = {
  name: 'Elfa Bakery',
  origin: 'https://www.elfabakery.it',
  addressLine: 'Via Sardegna 40',
  addressCity: '20146 Milano',
  addressFull: 'Via Sardegna 40, 20146 Milano',
  addressLocality: 'Milano',
  addressPostalCode: '20146',
  addressCountry: 'IT',
  geo: { latitude: 45.461527, longitude: 9.1502783 },
  phonePrimary: '+39 327 371 8769',
  phonePrimaryHref: '+393273718769',
  phoneSecondary: '+39 02 3659 8767',
  phoneSecondaryHref: '+390236598767',
  instagram: 'https://www.instagram.com/elfa_bakery_milan',
  facebook: 'https://www.facebook.com/elfabakery',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Elfa+Bakery+Via+Sardegna+40+Milano'
}
