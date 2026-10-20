# Owner intake checklist

Session 2 is blocked on these items. Every one of them needs the owner, not the agent.

Copy this list, send it to the owner, and paste the answers back. Anything still missing at launch time must stay as a TODO in db/seed.sql, never filled with a guess.

## 1. Menu and prices

- [ ] Full in-shop menu, category by category, with the real price for each item.
- [ ] Confirm or correct the Glovo list in docs/menu-price-research.md. Say which of the two is the in-shop price if they differ.
- [ ] Item names for the salad category.
- [ ] Item names for the side dishes category.
- [ ] The base piadina name, and confirm the 1 euro supplement rule.
- [ ] Any bagel varieties beyond the salmon, cheese and egg bagel.
- [ ] The daily "Menu del giorno" and what it includes.
- [ ] Whether Arancini, the Sluurpy drinks (virgin mojito, iced pistachio latte), and the "Pizza Fla" are permanent menu lines or were temporary.
- [ ] Whether arrosticini and crostatine stay on the menu permanently.

## 2. Allergens

Allergen data is a legal requirement in Italy. The seed only marks allergens that are certain from the listed ingredients.

- [ ] Allergen matrix for every item, all 14 EU allergens.
- [ ] Confirmation of the gluten and milk mappings already written for the pizza list.

## 3. Opening hours

The current schedule lives in the opening hours highlight on https://www.instagram.com/elfa_bakery_milan/. Anonymous access cannot reach it: highlight stories need a logged in Instagram session, and search captions mix Elfa posts with other accounts, so they cannot be trusted.

- [x] Hours pasted on 2026-10-20: Sunday 05:30 to 21:00, Monday to Saturday open 24 hours. Written into db/seed.sql, the JSON-LD block, and the page copy. Nothing left as a TODO for hours.
- [ ] Confirm whether the summer reduced schedule repeats in 2027.
- [ ] Confirm which phone number is the public one, +39 327 371 8769 or +39 02 3659 8767.

## 4. Brand assets

- [x] Logo received as docs/references/instagram/elfa-bakery-logo.jpg, exported from the Instagram account, 1080x1080 JPEG.
- [x] Owner said on 2026-10-20 to use the logo as it is, only with rounded corners. client/src/assets/logo.png was derived from the export at 256x256 with the outside made transparent, and the header shows it.
- [ ] A vector original of the logo, SVG. Only if one exists, the raster version is enough for now.
- [ ] Confirmation of the brand colors, or the real ones if the roadmap proposal is wrong.
- [ ] Real photos of the shop, the counter, the food, and the staff, with written permission to use them on the website. Export from Instagram into docs/references/instagram/, see the README there for the file names.
- [ ] Photos must be originals, not screenshots from review sites. The watermarked images in docs/references/*.jpg are study only and must not ship.

## 5. Contact and legal

- [ ] Public email address. The settings row is empty.
- [ ] Legal company data for the privacy policy: legal form, VAT number, registered address, REA if any.
- [ ] Who is the data controller for the privacy and cookie policy.
- [ ] Whether a cookie banner is needed, depends on which analytics are chosen in Session 6.

## 6. Scope

- [ ] Should the site link to Glovo for delivery, or take orders another way.
- [ ] Is the halal claim official enough to state on the site, and is there a certificate to cite.
- [ ] Any products that must not be shown on the site.
