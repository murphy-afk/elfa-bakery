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

## Before these images go on the site

- Written permission from the owner to use them on the website, tracked in docs/owner-intake.md.
- A caption and alt text for each file in the page language.
- Resize and compress in the Session 6 image pipeline, do not ship the raw export.
