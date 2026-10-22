// The `sizes` values the site passes to the Photo component. Each one
// tells the browser how wide a picture actually is on screen, so it
// picks the smallest file that still looks sharp. Without it a phone
// would download the 1080 px file for a thumbnail.
// The numbers come from the layout, not from taste:
// - the hero fills the viewport, so it is 100vw.
// - a card and a gallery cell are one column on a phone, two from 40rem
//   and three from 64rem. Both grids live inside the 72rem container
//   with a 1.5rem gutter on each side and a 1.5rem gap, so the widest a
//   cell ever gets is 22rem, and 33vw below that.

export const PHOTO_SIZES = {
  hero: '100vw',
  card: '(min-width: 64rem) min(33vw, 22rem), (min-width: 40rem) 50vw, 100vw',
  gallery: '(min-width: 64rem) min(33vw, 22rem), (min-width: 40rem) 50vw, 100vw'
}
