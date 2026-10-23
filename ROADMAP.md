# Elfa Bakery Website Roadmap

Project to design and build a new website for Elfa Bakery, a bakery, coffee shop, pastry shop, and deli in Milan, Italy.

Status: API tests are in, sessions 0 to 4 are complete apart from the owner run of the SQL scripts. Session 5 leftover: prerender. Instagram is the source for the logo, the photos, and the opening hours. All three are in: the logo is in the header, the 26 photos feed the gallery and the home hero, and the Open Graph image is set. The hours panel shows the confirmed schedule grouped by block and marks the current day, navigation scrolls back to the top, and the home hero runs on the shop front photograph as a full width background with the copy over it. The three featured cards on the home page show the gallery photo of the same dish, every link to a social profile carries the Instagram or Facebook mark with the handle next to it, the navigation collapses behind a toggle below 48 rem, and the header, the footer, and the menu rows line up with the rest of the page on a phone. Menu categories are collapsed by default and can be expanded independently, and category navigation has previous and next buttons. The site has been bilingual since 2026-10-21: Italian at the root of the site, English under /en, a language switch at the end of the navigation, and an hreflang pair with x-default on every indexed page.
Last updated: 2026-10-23.

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
- Written into db/seed.sql, the JSON-LD in client/src/lib/structuredData.js, the schedule list in client/src/lib/hours.js, and the page copy on Home, Chi siamo, and Contatti.
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
- [x] Make the SQL scripts run with safe update mode on 2026-10-21. Workbench refuses a DELETE without a key column in the WHERE clause, error 1175, so every DELETE in db/seed.sql matches on a key. db/fix-opening-hours.sql is the one-off patch for a database seeded before the hours were confirmed.
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
- [x] Write the English versions of the pages and add hreflang on 2026-10-21. Every page reads its locale from the path through client/src/lib/i18n.js and keeps both languages of copy in one file, Italian and English, so there is one implementation per page. English routes live under /en (App.jsx), the header and footer follow the locale, and the menu names, descriptions, categories, and allergens come from the name_en and description_en columns. usePageMeta.js writes the canonical URL, the og:url, and the hreflang pair (it, en, and x-default pointing at Italian) for every indexed page and drops them on the 404 page, and it sets the html lang and og:locale. The 26 gallery photos and the hero and Open Graph images gained an alt_en in client/src/lib/photos.js so alt text follows the language of the page. The static alternates for the home page are also declared in client/index.html.
- [x] Fix the opening hours panel on 2026-10-21. It now groups days that share a schedule, so the week reads Lunedì - Sabato, Aperto 24 ore and Domenica, 05:30 - 21:00, marks the current day with an "oggi" chip, and it renders the confirmed list in client/src/lib/hours.js instead of GET /api/hours, because a database seeded before 2026-10-20 still answers the placeholder Sunday 00:00 to 15:00 with the note "Orario da confermare". The day names in db/seed.sql regained their accents, Lunedì through Venerdì.
- [x] Scroll back to the top on navigation on 2026-10-21, client/src/components/ScrollToTop.jsx resets the scroll position on every path change.
- [x] Size the home hero photo against the shop name on 2026-10-21: on desktop it is capped at 28 rem wide with a 4/3 crop instead of the tall 3/4 panel, so the copy and the photo carry the same weight. Replaced again later the same day, see the background hero bullet below.
- [x] Add an Open Graph image once the owner sends real photos. Done on 2026-10-20: og-elfa-bakery.jpg, a 1200x630 crop of the night shop front, declared in client/index.html and re-declared on every route by usePageMeta.js. Same image in the bakery JSON-LD.
- [x] Render the tags in the initial HTML with a prerender step, currently they are injected on load. The prerender must cover the whole set: title, meta description, canonical, the hreflang pair, og:url, og:locale, and the JSON-LD block. Done on 2026-10-22, see Session 6: vite build renders every route through client/src/prerender-entry.jsx with renderToString, scripts/prerender.mjs writes the head tags into the HTML of the 14 routes plus a 404.html, and main.jsx hydrates the markup that is already there instead of replacing it.
- [x] Match the gallery photographs to the featured cards of the "I più amati" section on 2026-10-21. The three items flagged is_featured = 1 in db/seed.sql now show a shop photo instead of the placeholder: item 22 bagel with salmon, cheese and egg gets food-bagel-03, item 25 Panino Sfogliato gets food-panini-02, item 26 lasagna gets food-lasagne-01. The mapping lives in featuredPhotoIds in client/src/lib/photos.js, keyed by item id, and a featured item with no entry still falls back to the placeholder card.
- [x] Fix featured and gallery photo sizing on 2026-10-22. The responsive image lives inside a `<picture>`, so the picture now takes the full width of its card or gallery cell. Explicit `height: auto` overrides the generated image height attribute, letting the 4:3 crop set the rendered height.
- [x] Add the social marks to the profile links on 2026-10-21. client/src/components/SocialIcon.jsx draws the Instagram and Facebook marks as inline SVG in currentColor, and the links in the footer, in the Contatti panel, and in the gallery note carry them through the .social-link class. The full profile name sits on aria-label, so screen readers still announce it while the page shows the handle.
- [x] Show the handle next to the brand mark on 2026-10-21. The footer and the Contatti panel read @elfa_bakery_milan and @elfabakery instead of "Profilo Instagram di Elfa Bakery" and "Pagina Facebook di Elfa Bakery", the gallery note reads the same handle, and both values live in client/src/lib/site.js right next to the profile urls so they cannot drift apart. The link keeps the full profile name on aria-label.
- [x] Turn the home hero into a background photograph on 2026-10-21. exterior-vetrina-01.jpg fills the whole section edge to edge through .home-hero-bg, a dark layer at 75 percent (--overlay-hero in client/src/styles/tokens.css, drawn by the ::after of the section) sits over it, and the address chip, the shop name, the tagline, and both buttons sit above that layer. The layer is that heavy on purpose: at 68 percent the amber shop name dropped below 3 to 1 over the lit menu board at the top of the photograph, and at 75 percent every pixel of it holds 3 to 1 while the window lettering still reads through. The shop name is amber and the call button uses .btn-on-dark, because the old red heading and the old dark outline button do not hold their contrast on a dark photograph. The photo that used to sit beside the name, .home-hero-figure, and the heroPhoto row in client/src/lib/photos.js are gone, the hero reads gallery id 1 through heroShopfront.
- [x] Center the home hero copy on 2026-10-22. The shop name, tagline, address chip, and action buttons align in a centered block over the photo.
- [x] Make the navigation drop down behind a toggle on phones on 2026-10-21. Below 48 rem the links live in a panel under the header bar instead of wrapping to three rows, the tap targets are about 54 px tall, Escape closes the panel and returns the focus to the toggle, and following a link closes it. From 48 rem up the row of links shows as it did before and the toggle is hidden. client/src/components/SiteNav.jsx holds the state, client/src/styles/layout.css holds both looks.
- [x] Reorganize the drop down and put a flag on the language switch on 2026-10-21. The links are now one full width row per page lined up with the page gutter, a hairline sits between the rows, the current page carries an amber bar down its left edge, and the call button runs the full width at the bottom of the panel. The words English and Italiano are gone: the switch shows the flag of the language it goes to through client/src/assets/flag-it.svg and flag-gb.svg, the Union Jack stands for English, the name of the language sits on aria-label and on the title of the link, and the flag lives in the header bar next to the toggle on a phone and at the end of the row of links on a desktop. The list stayed first in the source so the tab order on a desktop runs links first and flag last. One real bug came out of checking the panel at a true 390 px width: the list only set padding-block, so the browser kept the 40 px it leaves on a ul element and every row started 40 px in from the left while the call button still hugged the right gutter. The inline padding is now cleared so the rows sit flush and their text lines up with the logo.
- [x] Line the shell up with the page on 2026-10-21. client/src/styles/global.css still carried an older copy of the header and footer rules, which padded the header and the footer one extra gutter away from the rest of the page, centered the footer text, and forced the footer note to the wrong size. Those copies are gone and layout.css owns the shell, the footer note keeps the bottom gap the old padding was covering, .site takes min-height: 100dvh after the 100vh fallback so a short page does not scroll under the browser tool bar on a phone, and the price of a menu row stays on the right edge when a long name wraps it onto a second line.
- [x] Keep the phone bar on one line on 2026-10-22. At a true 360 px the header wrapped: the logo, the 24 px gap, and the 104 px of controls came to 315 px against 312 px of room, so the flag and the toggle dropped onto a second line under the logo, on the left. .site-header-inner no longer wraps below 48 rem, the gap it carries is space-sm, the wordmark steps down to --text-lg on a phone and back to --text-xl from 48 rem, and the gap between the flag and the toggle is space-sm on a phone and space-md from 48 rem. The name is wrapped in .site-logo-name (client/src/components/SiteHeader.jsx), so it can only give way with an ellipsis and never pushes the controls out of the bar; the mark itself does not shrink. .site-nav carries margin-left: auto, which is what holds the controls on the right edge. From 48 rem up the bar is allowed to break into two lines again, because the row of links needs more room than a phone has, and there the logo is flex-shrink: 0 so the name is never clipped and the second line keeps the links and the flag on the right. Measured at 320, 360, 768, 832, 1024, and 1440 px with the DevTools protocol: one row with no horizontal scroll at every phone width, logo left, flag then toggle flush against the right gutter, all three on the same centre line.

### Session 6. SEO and performance

Done on 2026-10-22, except the two items marked otherwise below.

- [x] Wire the hours panel back to GET /api/hours. Done, with a safety net rather than as a plain swap: HoursPanel renders the confirmed list in client/src/lib/hours.js first, then asks GET /api/hours and only replaces what it shows when the answer carries a schedule for all seven days and no "Orario da confermare" note. A database seeded before the owner confirmed Sunday 05:30 to 21:00 still cannot override hours that were confirmed by hand, and the panel paints in the prerendered HTML instead of starting empty.
- [x] Sitemap, robots, redirects if the old site had URLs, analytics. Done on 2026-10-22 except redirects, which are deferred to Session 7. scripts/build-sitemap.mjs writes client/dist/sitemap.xml with the 14 URLs, each carrying it, en, and x-default alternates, and client/dist/robots.txt pointing at it, and it stops the build if a route has no prerendered HTML to list. The hreflang pairs stay declared in the head of each page as well. Analytics is Plausible, loaded only when VITE_PLAUSIBLE_DOMAIN is set and only on that domain, so a preview deploy and a local build send nothing and need no cookie banner; the Cookies page explains that. Redirects cannot be written yet: GitHub Pages has no server side redirect rule, so they belong with the final host in Session 7.
- [x] Hosting rule for the single page app, moved from a rewrite to prerendered files. Every route now has its own folder with an index.html in client/dist, so GitHub Pages serves /en/menu directly and no rewrite is needed. The catch all is 404.html, which ships an empty #root and a noindex tag: an unknown path boots the app there, the router answers the NotFound page, and the tag keeps it out of the index. The preview host lives under /elfa-bakery/, so VITE_BASE carries the subfolder into the Vite base, into the router basename in main.jsx, into the picture sources, and into the head URLs.
- [x] Add an alt_en column to the gallery table. It was already in db/schema.sql and db/seed.sql with the API selecting it; what was missing was that the seed and client/src/lib/photos.js had drifted apart on 14 of the 26 English descriptions while the seed claimed they could never disagree. The seed now carries the same alt text as the module, verified row by row.
- [x] Image pipeline, caching headers, compression, lazy loading. Done on 2026-10-22: scripts/build-images.mjs reads the 26 photographs from docs/references/instagram, writes 480, 720, and 1080 px files in avif, webp, and jpeg through sharp, writes the 1200x630 Open Graph crop from the shop front, and generates client/src/lib/photoVariants.js. It checks the output against the inventory in client/src/lib/photos.js: a photograph with no source, a file the inventory does not ask for, and a file it should have written but did not all stop the build. The files are build artifacts, so client/public/photos is in .gitignore and npm run dev and npm run build run the step first, with a cache keyed on the source file and the pipeline settings so a second build encodes nothing. client/src/components/Photo.jsx renders a <picture> from the generated module, with the base path added by hand, and the gallery, the home hero, and the featured cards all go through it. The hand resized stop gap, hero-banco.jpg among it, is gone. Caching headers and compression are the host's job and belong with the final host in Session 7.
- [x] Prerender the head tags into the initial HTML, pulled in from Session 5. npm run build now runs the client build, then a second build of client/src/prerender-entry.jsx, then scripts/prerender.mjs. That script renders each of the 14 routes with renderToString, strips the tags the runtime manages out of the template, and writes the title, the meta description, the canonical, the hreflang pair, the og:url, the og:locale, and the JSON-LD block into the HTML itself, along with the html lang attribute. It also moves React's preload links from the body into the head, where they belong and where they do not upset hydration, checks that every asset URL it keeps exists in client/dist/assets, and asserts one h1 per page. main.jsx hydrates when the root already has children, so the page paints without a flash of the wrong title.

### Session 7. QA and launch

- Redirects from the old site, once the host is chosen. GitHub Pages cannot serve a redirect rule, so the old URLs are collected here rather than guessed at now.
- Caching headers and compression for /photos, which belong to the host and not to the build.
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
