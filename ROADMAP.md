# Elfa Bakery Website Roadmap

Project to design and build a new website for Elfa Bakery, a bakery, coffee shop, pastry shop, and deli in Milan, Italy.

Status: API tests are in, sessions 0 to 4 are complete apart from the owner run of the SQL scripts. Session 5 leftovers: English copy, prerender. Instagram is the source for the logo, the photos, and the opening hours. All three are in: the logo is in the header, the 26 photos feed the gallery and the home hero, and the Open Graph image is set.
Last updated: 2026-10-20.

## 1. Project goals

- Simple, clean, and modern website that matches the real vibe of the shop.
- Stack: React (frontend), Express (backend), MySQL (database).
- Custom CSS only, no UI frameworks.
- Strong SEO so the shop appears in local search in Milan.
- Mobile first, fast, accessible.
- Bilingual content: Italian first, English second.

## 2. Shop profile (research)

All public data gathered on 2026-10-19 from Google Maps, Facebook, Instagram, the digital menu catalog, Tripadvisor, Restaurant Guru, and Halalfoodle.

### Identity

- Name: Elfa Bakery.
- Type: bakery, caffetteria, pasticceria, gastronomia. Also listed as deli, bar, dessert spot, pizza place, and halal restaurant.
- Positioning: family run neighborhood shop that mixes Italian bakery classics with international items such as bagels and kebab, plus halal options.
- Tone: warm, welcoming, generous, informal, proud of quality and friendly service.

### Contact and location

- Address: Via Sardegna 40, 20146 Milan, Italy.
- Zone: De Angeli, Zone 7, next to the Greek Orthodox Church of Milan.
- Phone: +39 327 371 8769, listed on Facebook and Instagram.
- Second phone: +39 02 3659 8767, listed on review sites.
- Website: www.elfabakery.it, the current site, it does not load reliably.
- Instagram: @elfa_bakery_milan.
- Facebook: facebook.com/elfabakery, about 700 followers.

### Opening hours

- Confirmed by the owner on 2026-10-20, read from the opening hours highlight on @elfa_bakery_milan.
- Sunday 05:30 to 21:00.
- Monday to Saturday open 24 hours, the shop does not close.
- Older public sources disagree and are now out of date: Google and review sites said 24 hours Monday to Saturday, Sunday was listed as 06:00 to 14:30, 00:00 to 15:00, or all day, and posts from before the August 2026 reopening said Aperti H24 every day.
- Written into db/seed.sql, the JSON-LD in client/src/lib/structuredData.js, and the page copy on Home, Chi siamo, and Contatti.
- The highlight cannot be read anonymously, highlight stories need a logged in session, so the owner reads the hours in the app and pastes them here.

### Ratings

- Google via Halalfoodle: 4.89 out of 5, 349 reviews.
- Google via Restaurant Guru: 4.3 out of 5, 422 votes.
- Tripadvisor: 4.7 out of 5, 3 reviews. Rank 373 of 606 dessert spots in Milan, rank 441 of 2980 coffeehouses.
- Note: values differ per source. Use conservative numbers on the site or link to the Google listing.

### Menu structure

The Qromo in-shop catalog currently returns "Unavailable". The categories below were captured during Session 0. The shop Glovo listing filled the gap with prices and more categories, see docs/menu-price-research.md.

From the digital catalog on Qromo, the categories are:

- Classic Pizzas
- Bagels
- Salads
- Sandwiches and piadinas, piadinas cost 1 euro extra
- First and second courses
- Side dishes
- Kebab
- Allergen list with the 14 EU allergens

Dishes named in reviews and social posts:

- Salmon, cheese, and egg bagel, called the best bagel by one reviewer.
- Pizza kebab, funghi e prosciutto pizza, diavola pizza, four cheese style pizza.
- Lasagna, omelette.
- Focaccia with olives, focaccia with tomato and basil.
- Gourmet sandwich with turkey, cheese, and pickles on a wooden board.
- Panino Sfogliato, new item announced in September 2025.
- Brioches, croissants, biscuits, and cakes from the pastry counter.
- Coffee: espresso, cappuccino, latte macchiato, latte in a glass, iced drinks with mint.
- Kebab, falafel, and shawarma style plates.

Price level: cheap, about 1 to 10 euro per person.

### Service and features

- Dine in, takeaway, curbside pickup, delivery via aggregators.
- Wheelchair accessible, credit cards accepted.
- Outdoor seating with small bistro tables on the sidewalk.
- Halal food options, important for the local audience.
- Large pastry display, deli counter with pizza by the slice, focaccia, and hot dishes prepared in the morning.
- TV screens with the menu behind the counter.

### Review highlights, paraphrased

- Warm and generous owners, guests feel at home.
- The best service in Milan after days of travel, friendly and funny staff.
- Pizza with great dough, generous toppings, quality ingredients, honest prices.
- The best bagel with salmon, cheese, and egg.
- Great coffee, huge pastry selection, calm atmosphere at any hour.
- Fast quality catering, lasagna and omelette praised, good for a quick hot meal instead of a sandwich.

### Visual vibe from photos

- Warm yellow and amber walls with red accents.
- Wood paneling, dark ceiling with recessed and pendant lights, dark marble tables, red and black stools.
- Bright glass deli counter with pizza slices, focaccia, and pastries.
- Wall shelves with retail products: coffee tins, pasta, and sweets.
- Illy coffee machine and branded cups, cappuccino with latte art.
- Golden pizza, focaccia with olives and tomato, pastries and biscuits in a glass case, gourmet sandwiches on wooden boards, iced mint drinks.
- Exterior: quiet residential street, small sidewalk seating, chalkboard sign.
- Overall mood: cozy, warm, unpretentious, family run, modern counter, energy from morning to night.

### Instagram account, asset source

- Account: https://www.instagram.com/elfa_bakery_milan, 959 followers, 68 posts, profile id 61843599001.
- Bio: Bakery, caffetteria, pasticceria e gastronomia. Via Sardegna 40 Milano.
- Logo: docs/references/instagram/elfa-bakery-logo.jpg, 1080x1080 JPEG, a croissant drawn as a circle around an EB monogram with Espresso Bar along the lower right. Sampled colors, ground near #1e1a12 and line art near #f2e3c4. The owner confirmed on 2026-10-20 to use it as it is, so the site asset client/src/assets/logo.png was derived from it at 256x256 with the corners rounded and the outside made transparent, and the header shows it at 48 CSS px. A vector original would still be welcome.
- Photos: exported by hand from the app into docs/references/instagram/, file names listed in the README there.
- Anonymous access is blocked on every route tried on 2026-10-20: post embeds redirect to a login wall, the profile API answers require_login, the mirrors on imginn, picuki, sotwe, dumpor, and greatfon sit behind Cloudflare or a bot check, and the profile picture is served at 100x100 only because the CDN signs the image transform.
- Opening hours: kept in the opening hours highlight, which needs a logged in session.

## 3. Design direction

### Brand colors, proposal to validate with the owner

- Warm amber yellow: primary, taken from the walls.
- Tomato red: accent, taken from the counter and the food.
- Cream: background.
- Espresso charcoal: text and footer.
- Wood tan: secondary surfaces.
- The logo confirms two of these: its ground is a near black espresso and its line art is a warm cream a little deeper than --color-cream. Worth matching the logo cream when the header sits on the dark mark.
- The header bar is espresso and the logo ground is a darker espresso, so the rounded corners read as a subtle tile there and show fully on any light surface.

### Typography, proposal

- Headings: friendly, slightly rounded sans or a warm serif.
- Body: clean sans with high legibility.
- Final fonts to confirm with the owner, loaded with font display swap.

### UI direction

- Warm cream background, big food photography, generous whitespace, rounded cards.
- Short lines, clear prices, simple category navigation on the menu page.
- Honest, local, family tone in the copy.
- Mascot note: review sites overlay a cartoon watermark on photos. That is not the shop logo. Do not use it.

### Pages

- Home: hero photo, short intro, highlights, hours, map link.
- Menu: category tabs from MySQL, prices, allergen info.
- About: story of the shop and the family, halal positioning.
- Gallery: food, counter, interior, street.
- Contact: address, phones, hours, map, links to Instagram and Facebook.
- Legal: privacy policy and cookie policy, required in Italy.

## 4. Tech stack and architecture

### Frontend

- React with Vite inside client/.
- React Router for pages.
- Custom CSS in plain files or CSS modules. No UI framework.
- Mobile first responsive design.
- Data fetched from the Express API at build time or at runtime.

### Backend

- Express inside server/.
- REST endpoints:
  - GET /api/menu
  - GET /api/menu/:category
  - GET /api/settings
  - GET /api/gallery
  - GET /api/hours
  - GET /api/contact
- Environment variables for DB credentials and ports.
- Helmet for security headers, CORS locked to the site origin, rate limiting on the contact endpoint.

### Database

- MySQL, built directly in MySQL Workbench. The owner runs the SQL scripts by hand in Workbench. No ORM, no migration tool.
- Scripts live in db/: db/schema.sql creates the database and the tables, db/seed.sql inserts the content.
- Workflow: open schema.sql in Workbench, run it once to create the structure, then open seed.sql and run it to fill the data. Re running seed.sql should reset and refill the content safely.
- Core tables:
  - categories
  - items
  - allergens
  - item_allergens
  - opening_hours
  - settings
  - gallery
  - reviews, optional

### SEO

- Render HTML for crawlers. Options to evaluate:
  - Server side rendering with Express and React DOM server.
  - Static generation at build time with a prerender step.
- Per page title, meta description, canonical URL, Open Graph tags.
- JSON-LD schema for the bakery with address, geo, hours, price range, and ratings.
- sitemap.xml and robots.txt generated at build.
- Semantic HTML: one h1 per page, alt text on every image, descriptive links.
- Image optimization: WebP or AVIF, responsive sizes, lazy loading below the fold.
- Core Web Vitals targets: LCP under 2.5s, CLS under 0.1.
- Italian as default language with hreflang for the English version.

## 5. Project sessions

### Session 0. Planning

- [x] Gather public data about the shop.
- [x] Write the roadmap.
- [x] Write the agents file.
- [x] Delete the prompt file.

### Session 1. Setup

- [x] Initialize git, Node, and the client and server folders.
- [x] Add linting and formatting with the rules from AGENTS.md.
- [x] Write db/schema.sql and db/seed.sql for MySQL Workbench.
- [ ] Owner runs schema.sql then seed.sql in Workbench and fills in the real prices. Moved to Session 2, the prices are still NULL.

### Session 2. Content and data, in progress

- [x] Collect public menu data. The in-shop Qromo catalog returns "Unavailable", so the shop Glovo listing was used instead. Full list with prices in docs/menu-price-research.md.
- [x] Rewrite db/seed.sql with the real menu: 12 categories, 69 items, sourced names and descriptions, every price still NULL.
- [x] Fix the guessed items that Session 1 had put in the seed. Bagel Classico, Insalata Mista, and Insalata con Salmone were not in any source and are gone. Salad and side dish categories are now empty with a TODO instead of holding invented rows.
- [x] Write docs/owner-intake.md, the single checklist to send to the owner.
- [x] Take the logo from the shop Instagram account into docs/references/instagram/. The owner confirmed on 2026-10-20 to use it as it is, only with rounded corners, so client/src/assets/logo.png was derived from the export and the header now shows it.
- [x] Export the Instagram photos into docs/references/instagram/ and use them for the gallery, the home hero, and the Open Graph image. Done on 2026-10-20: 29 exports renamed to kebab case, 26 of them shipped, the full inventory and the reasons for the 3 left out are in the README there.
- [x] Paste the opening hours from the Instagram highlight, then write them into db/seed.sql. Done on 2026-10-20: Sunday 05:30 to 21:00, Monday to Saturday open 24 hours.
- [ ] Collect from the owner: exact prices, correct hours, official phone number, legal company data for the privacy policy.
- [ ] Fill in prices in Workbench once the owner confirms them.
- [ ] Complete the allergen matrix, it is a legal requirement and only 5 items have rows today.
- [ ] Owner runs schema.sql then seed.sql in Workbench against the real database.

Blocked items are tracked in docs/owner-intake.md.

### Session 3. API

- [x] Build the Express endpoints on top of the MySQL schema.
- [x] Add input validation and error handling on every route.
- [x] Add tests for the endpoints. 27 tests in server/tests/, run with npm test. The MySQL pool is stubbed, so the suite needs no database.

### Session 4. Design system

- [x] Global CSS tokens: colors, spacing, type scale, radii, shadows.
- [x] Components: header, footer, hero, menu card, category tabs, gallery grid, contact block, map link.
- [x] Real logo in the header: client/src/assets/logo.png, rounded corners baked into the file, 48 CSS px, alt text in Italian. scripts/smoke-render.mjs needed image loaders for the asset import.

### Session 5. Pages and content

- [x] Build every page in React with Italian copy: Home, Menu, Chi siamo, Galleria, Contatti, Privacy policy, Cookie policy, and the 404 page.
- [x] Add per page title, meta description, canonical URL, Open Graph tags, and JSON-LD through client/src/lib/usePageMeta.js.
- [x] Add the bakery JSON-LD block with address, geo, hours, and social profiles in client/src/lib/structuredData.js.
- [ ] Write the English versions of the pages and add hreflang. Italian only for now.
- [x] Add an Open Graph image once the owner sends real photos. Done on 2026-10-20: og-elfa-bakery.jpg, a 1200x630 crop of the night shop front, declared in client/index.html and re-declared on every route by usePageMeta.js. Same image in the bakery JSON-LD.
- [ ] Render the tags in the initial HTML with a prerender step, currently they are injected on load.

### Session 6. SEO and performance

- Sitemap, robots, redirects if the old site had URLs, analytics.
- Image pipeline, caching headers, compression, lazy loading. The 26 photos in client/public/photos/ were resized by hand as a stop gap: 720 px long edge at JPEG quality 74, hero 1025 px, Open Graph 1200x630. This session replaces them with a real build step: responsive sizes, WebP or AVIF, and a check that the output matches the inventory in client/src/lib/photos.js.

### Session 7. QA and launch

- Test on real devices, check contrast and keyboard navigation.
- Run Lighthouse on mobile, fix issues.
- Deploy, connect the domain elfabakery.it, set up SSL.

## 6. Open questions for the owner

1. Official logo file and brand colors. Answered on 2026-10-20: use the exported 1080x1080 JPEG as it is, only with rounded corners, and it is live in the header. A vector original and the exact brand colors are still welcome.
2. Real photos of the shop, food, and staff, with permission to use. Answered on 2026-10-20: 26 photos exported from @elfa_bakery_milan are live in the gallery and the home hero. Three were left out and need a decision: interior-halloween-01 as seasonal, exterior-fashionweek-01 because it shows a person who needs their own consent, and poster-fashionweek-01 because it is a graphic. Staff photos are still not collected.
3. Exact opening hours, especially Sunday. Answered on 2026-10-20: Sunday 05:30 to 21:00, Monday to Saturday open 24 hours.
4. Which phone number is public.
5. Final menu with prices for each category.
6. Is the halal claim official and can it be stated on the site.
7. Do you want online orders or delivery links on the site.
8. Legal data needed for the Italian privacy policy, such as VAT number and company legal form.

## 7. References

- docs/menu-price-research.md: every public menu item and price found, with the source for each block. Research only, no price from it is allowed in db/seed.sql until the owner confirms it.
- docs/owner-intake.md: the checklist of everything only the owner can answer. Send this, then paste the answers back.
- docs/references/ holds photos downloaded from public listings for internal design study only. These images are watermarked by third party sites and must not ship in the final website.
- docs/references/instagram/ holds the logo and the photo exports from the shop Instagram account, with the README listing what is still missing.
- Digital menu catalog: https://elfabakerymenu.qromo.it/ (returns "Unavailable" as of 2026-10-19)
- Glovo store page: https://glovoapp.com/it/it/milano/stores/elfa-bakery-mil
- Sluurpy listing: https://www.sluurpy.it/milano/ristorante/10301158/elfa-bakery
- Facebook page: https://www.facebook.com/elfabakery
- Instagram profile: https://www.instagram.com/elfa_bakery_milan
- Review pages: the Halalfoodle, Restaurant Guru, and Tripadvisor listings for Elfa Bakery.
