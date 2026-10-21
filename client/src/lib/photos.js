// The shop's own photographs, exported from the Instagram account and
// resized into client/public/photos. Rows use the same keys as the
// gallery table (id, image_url, alt_it) so the page can swap between the
// API and this list without changing the markup. Every row also carries
// alt_en, the English alt text the English pages render, so the
// description matches the language of the page. The gallery table in
// db/schema.sql still holds alt_it only: add an alt_en column to the
// table and to db/seed.sql before the gallery page reads GET /api/gallery.

// The gallery table in MySQL holds the same list once db/seed.sql runs.
// The gallery page reads this module and not GET /api/gallery, so it
// works before the database is seeded and without the API process.

// Photos the owner has not cleared for the site stay out of this list:
// interior-halloween-01 (seasonal decoration), exterior-fashionweek-01
// (a person in the shot), poster-fashionweek-01 (a graphic, not a photo).
// See docs/references/instagram/README.md for the full inventory.

// Shown in the home hero. Source file: counter-panini-01.jpg.
export const heroPhoto = {
  src: '/photos/hero-banco.jpg',
  alt: 'Una fila di panini appena preparati sul banco, con il logo di Elfa Bakery sulla parete',
  alt_en: 'A row of freshly made sandwiches on the counter, with the Elfa Bakery logo on the wall',
  width: 1025,
  height: 1025
}

// Used for the Open Graph tags on every page.
export const ogPhoto = {
  src: '/photos/og-elfa-bakery.jpg',
  alt: 'La vetrina di Elfa Bakery di sera, con il nome stampato sul vetro',
  alt_en: 'The Elfa Bakery shop window at night, with the name printed on the glass'
}

export const galleryPhotos = [
  {
    id: 1,
    image_url: '/photos/exterior-vetrina-01.jpg',
    alt_it: 'La vetrina di Elfa Bakery di sera, con il nome stampato sul vetro',
    alt_en: 'The Elfa Bakery shop window at night, with the name printed on the glass'
  },
  {
    id: 2,
    image_url: '/photos/counter-panini-01.jpg',
    alt_it: 'Una fila di panini appena preparati sul banco, con il logo di Elfa Bakery sulla parete',
    alt_en: 'A row of freshly made sandwiches on the counter, with the Elfa Bakery logo on the wall'
  },
  {
    id: 3,
    image_url: '/photos/counter-barista-01.jpg',
    alt_it: 'Il barista prepara un cappuccino alla macchina del caffè',
    alt_en: 'The barista makes a cappuccino at the espresso machine'
  },
  {
    id: 4,
    image_url: '/photos/counter-confezione-01.jpg',
    alt_it: 'Una confezione di pane con il logo EB su un tagliere di legno',
    alt_en: 'A pack of bread with the EB logo on a wooden board'
  },
  {
    id: 5,
    image_url: '/photos/interior-counter-01.jpg',
    alt_it: 'L’interno di Elfa Bakery con il banco, le sedie e le luci a soffitto',
    alt_en: 'Inside Elfa Bakery, with the counter, the chairs and the ceiling lights'
  },
  {
    id: 6,
    image_url: '/photos/food-pizza-02.jpg',
    alt_it: 'Pizza con prosciutto crudo e rucola appena servita',
    alt_en: 'Pizza with cured ham and rocket, served fresh'
  },
  {
    id: 7,
    image_url: '/photos/food-pizza-01.jpg',
    alt_it: 'Pizza al trancio, croissant, kebab e caffè',
    alt_en: 'Pizza by the slice, a croissant, kebab and coffee'
  },
  {
    id: 8,
    image_url: '/photos/food-bagel-01.jpg',
    alt_it: 'Due bagel aperti con salmone, avocado, cetrioli e pomodorini',
    alt_en: 'Two open bagels with salmon, avocado, cucumber and cherry tomatoes'
  },
  {
    id: 9,
    image_url: '/photos/food-bagel-03.jpg',
    alt_it: 'Bagel con salmone affumicato su un tagliere di legno',
    alt_en: 'Bagel with smoked salmon on a wooden board'
  },
  {
    id: 10,
    image_url: '/photos/food-bruschetta-01.jpg',
    alt_it: 'Bagel e bruschetta con salmone affumicato',
    alt_en: 'Bagel and bruschetta with smoked salmon'
  },
  {
    id: 11,
    image_url: '/photos/food-panini-01.jpg',
    alt_it: 'Piadina e panini con prosciutto, formaggio e insalata',
    alt_en: 'Piadina and sandwiches with ham, cheese and salad'
  },
  {
    id: 12,
    image_url: '/photos/food-panini-02.jpg',
    alt_it: 'Due panini farciti con prosciutto e formaggio, tagliati a metà',
    alt_en: 'Two sandwiches filled with ham and cheese, cut in half'
  },
  {
    id: 13,
    image_url: '/photos/food-burger-01.jpg',
    alt_it: 'Hamburger con bacon e patatine fritte davanti allo scaffale del pane',
    alt_en: 'Burger with bacon and fries in front of the bread shelf'
  },
  {
    id: 14,
    image_url: '/photos/food-falafel-01.jpg',
    alt_it: 'Piatto di falafel con insalata, patatine e salse',
    alt_en: 'Plate of falafel with salad, fries and sauces'
  },
  {
    id: 15,
    image_url: '/photos/food-gastronomia-01.jpg',
    alt_it: 'Selezione di salumi affettati e riso allo zafferano',
    alt_en: 'A selection of sliced cold cuts and saffron rice'
  },
  {
    id: 16,
    image_url: '/photos/food-lasagne-01.jpg',
    alt_it: 'Insalata con mozzarella e pomodorini e una porzione di lasagne',
    alt_en: 'Salad with mozzarella and cherry tomatoes and a portion of lasagne'
  },
  {
    id: 17,
    image_url: '/photos/food-insalata-01.jpg',
    alt_it: 'Insalata con salmone e un cestino di pane sul tavolo',
    alt_en: 'Salad with salmon and a basket of bread on the table'
  },
  {
    id: 18,
    image_url: '/photos/food-insalata-02.jpg',
    alt_it: 'Insalata con mozzarella, uova sode e crostini di pane',
    alt_en: 'Salad with mozzarella, boiled eggs and croutons'
  },
  {
    id: 19,
    image_url: '/photos/pastry-collage-01.jpg',
    alt_it: 'Torta al cioccolato, red velvet, baklava e tiramisù al banco dei dolci',
    alt_en: 'Chocolate cake, red velvet, baklava and tiramisu at the cake counter'
  },
  {
    id: 20,
    image_url: '/photos/pastry-collage-02.jpg',
    alt_it: 'Caffè al banco con crostata di fragole, pasta al pistacchio e dessert al cioccolato',
    alt_en: 'Coffee at the counter with a strawberry tart, pistachio pastry and chocolate desserts'
  },
  {
    id: 21,
    image_url: '/photos/pastry-crostata-01.jpg',
    alt_it: 'Crostata di fragole con crema e un bagel con salmone',
    alt_en: 'Strawberry tart with cream and a bagel with salmon'
  },
  {
    id: 22,
    image_url: '/photos/dessert-tiramisu-01.jpg',
    alt_it: 'Tiramisù al cucchiaio con panna montata',
    alt_en: 'Tiramisu with whipped cream'
  },
  {
    id: 23,
    image_url: '/photos/dessert-cucchiaio-01.jpg',
    alt_it: 'Dessert al pistacchio al cucchiaio e il banco della pasticceria',
    alt_en: 'Pistachio spoon dessert and the pastry counter'
  },
  {
    id: 24,
    image_url: '/photos/drinks-caffe-01.jpg',
    alt_it: 'Cappuccino con disegno nel latte, crostata di fragole e cornetto',
    alt_en: 'Cappuccino with latte art, a strawberry tart and a croissant'
  },
  {
    id: 25,
    image_url: '/photos/drinks-caffe-02.jpg',
    alt_it: 'Cappuccino, crostata di fragole e pasticcino al pistacchio',
    alt_en: 'Cappuccino, a strawberry tart and a pistachio pastry'
  },
  {
    id: 26,
    image_url: '/photos/drinks-cappuccino-01.jpg',
    alt_it: 'Cappuccino illy con cornetto appena sfornato',
    alt_en: 'Illy cappuccino with a freshly baked croissant'
  }
]

// Photographs for the "I più amati" cards on the home page. The three
// rows are the items flagged is_featured = 1 in db/seed.sql, and the
// value is the id of the gallery photo above that shows the same dish.
// Matched by hand against the shop exports on 2026-10-21.
// A featured item with no entry here falls back to the placeholder card,
// so a new featured row in the seed never breaks the section.
export const featuredPhotoIds = {
  22: 9, // Bagel Salmone, Formaggio e Uovo, food-bagel-03.jpg
  25: 12, // Panino Sfogliato, food-panini-02.jpg
  26: 16 // Lasagna, food-lasagne-01.jpg
}

// Look up the gallery photograph for a menu item id, or null when the
// item has no matching photo yet.
export function photoForItem(itemId) {
  const photoId = featuredPhotoIds[itemId]
  if (!photoId) return null

  return galleryPhotos.find((photo) => photo.id === photoId) ?? null
}

// Alt text of a photo in the language of the page. English falls back to
// the Italian text while an entry is still missing.
export function photoAlt(photo, locale) {
  if (locale !== 'en') return photo.alt_it
  return photo.alt_en || photo.alt_it
}
