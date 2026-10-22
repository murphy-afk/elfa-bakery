# Instagram assets from @elfa_bakery_milan

Drop zone for the real photos and the logo exported from the shop Instagram account, https://www.instagram.com/elfa_bakery_milan/.

Anonymous access to Instagram is blocked: post embeds redirect to a login wall, the profile API answers `require_login: true`, and every public mirror sits behind Cloudflare. The files must be exported by hand from the app by someone logged in.

## What to put here

- logo.svg: the header already uses the logo, see below. Send a vector original only if one exists, it would replace the raster version.
- Photos, exported at the largest size the app offers, at least 1600 px wide for anything that will be a hero or a full width band.
- Originals only. No screenshots, no stickers, no text overlays, no filters added on top.

Suggested file names, kebab case with a two digit counter:

- logo.svg
- exterior-01.jpg, exterior-02.jpg (street view, shop front, sidewalk tables)
- counter-01.jpg, counter-02.jpg (deli counter, pizza slices, pastry display)
- food-pizza-01.jpg, food-bagel-01.jpg, food-pastry-01.jpg, food-coffee-01.jpg
- interior-01.jpg (room, shelves, tables)
- staff-01.jpg (only with written consent from the people shown)

## What is already here

- elfa-bakery-logo.jpg: the logo exported from the account, 1080x1080 square JPEG. Two tone mark: a croissant drawn as a circle outline around an EB monogram, with Espresso Bar set along the lower right. Sampled colors: ground near #1e1a12, line art near #f2e3c4. This file is the source for the site logo.
- profile-picture-100.jpg: the profile picture as served by the Instagram CDN, 100x100. Same mark, smaller crop. The CDN signs the image transform, so any larger size is refused with a 403. Reference only, too small to ship.

## The logo on the site

- client/src/assets/logo.png is derived from elfa-bakery-logo.jpg: scaled to 256x256, corners rounded, everything outside the rounded square made transparent. 35 KB.
- It is rendered in the header by client/src/components/SiteHeader.jsx at 48 CSS px, so 256 px covers any screen density.
- The JPEG has no alpha channel, so the rounded corners cannot come from CSS alone on a coloured background. Regenerate the PNG whenever the mark changes and keep this file as the only source.

## Photos exported here

29 photographs exported by hand, original Instagram file names replaced with kebab case names. Every file keeps its exported resolution.

In use on the site, 26 of them:

- exterior-vetrina-01 (1080x1080): the shop front at night, name printed on the glass. Also the source of the home hero and of the Open Graph image.
- counter-panini-01 (1025x1025): a row of panini on the counter with the logo on the wall.
- counter-barista-01, counter-confezione-01 (1080x1080): the barista at the espresso machine, a bread bag with the EB logo.
- interior-counter-01 (1600x900): the room wide, counter, seats, ceiling lights.
- food-pizza-01, food-pizza-02, food-bagel-01, food-bagel-03, food-bruschetta-01, food-panini-01, food-panini-02, food-burger-01, food-falafel-01, food-gastronomia-01, food-lasagne-01, food-insalata-01, food-insalata-02: the food set, 1080 to 1440 px squares.
- pastry-collage-01, pastry-collage-02, pastry-crostata-01, dessert-tiramisu-01, dessert-cucchiaio-01: the sweet counter.
- drinks-caffe-01, drinks-caffe-02, drinks-cappuccino-01: coffee.

Left out of the site, 3 of them:

- interior-halloween-01 (1440x1800): seasonal decoration, a reaper figure with a pumpkin. Wrong for a site that has to look right all year.
- exterior-fashionweek-01 (1448x1931): a person in the shot. Needs written consent from them, not only from the shop.
- poster-fashionweek-01 (1419x1843): a designed poster, not a photograph. Kept as reference for the "open 24/7, halal" wording.

## What ships on the site

- client/public/photos/: 235 files, written by scripts/build-images.mjs and not committed. For each of the 26 photographs the pipeline writes 480, 720, and 1080 px in avif, webp, and jpeg, plus og-elfa-bakery.jpg, the 1200x630 crop of exterior-vetrina-01. A source narrower than 720 px is refused, so counter-panini-01 tops out at 1025 px. Total 17 MB across every format, largest single file 260 KB, which no browser downloads twice: it takes one format at one width.
- client/src/lib/photoVariants.js: the generated module listing what the pipeline wrote, keyed by the image_url in photos.js. client/src/components/Photo.jsx turns it into a <picture>.
- client/src/lib/photos.js: the single list the site reads, and the inventory the pipeline checks itself against. Every row carries image_url, alt_it in Italian, and alt_en in English, the same keys the gallery table uses. The home hero and the Open Graph image are exported from it too.
- db/seed.sql: the same 26 rows in the gallery table, with alt_it and alt_en. Checked row by row against photos.js on 2026-10-22, so the API and the static list do not disagree.
- The header logo comes from client/src/assets/logo.png, see below.

The gallery page reads the static list and not GET /api/gallery. It has to work before the database is seeded, and it has to work on a static host that has no API at all. db/seed.sql already holds the same 26 rows for when the site runs behind the API.

## Before these images go on the site

- Written permission from the owner to use them on the website, tracked in docs/owner-intake.md.
- A caption and alt text for each file in the page language. Done for all 26 in photos.js and seed.sql.
- Resize and compress through the image pipeline, do not ship the raw export. Done on 2026-10-22: scripts/build-images.mjs resizes the exports into client/public/photos and generates client/src/lib/photoVariants.js, and it stops the build if its output drifts from the list in client/src/lib/photos.js. A new photograph goes in here, then gets a row in photos.js and a run of npm run build:images.
