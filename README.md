# Elfa Bakery Website

Website for Elfa Bakery, Via Sardegna 40, 20146 Milano. Bakery, caffetteria, pasticceria e gastronomia, open late, halal options.

Simple, clean, modern. React frontend, Express backend, MySQL database, custom CSS, strong local SEO.

Read AGENTS.md for the working rules and ROADMAP.md for the plan and the shop research.

## Stack

- client: React with Vite, React Router, custom CSS.
- server: Express REST API.
- db: MySQL, built by hand in MySQL Workbench.

## Database, MySQL Workbench

The database is built directly in MySQL Workbench. No ORM, no migration tool.

1. Open db/schema.sql in Workbench and run it. It creates the elfa_bakery database and the tables.
2. Open db/seed.sql in Workbench and run it. It fills the categories, allergens, menu items, hours, and settings.
3. Prices are left NULL on purpose. The real prices were not public. Fill them in Workbench.

Both scripts are safe to run again. schema.sql rebuilds the structure, seed.sql resets and refills the content.

## Setup

```bash
npm install
cp server/.env.example server/.env
```

Edit server/.env and set the MySQL user and password.

## Run

```bash
npm run dev
```

This starts the client on http://localhost:5173 and the API on http://localhost:4000.

## Build and preview host

```bash
npm run build
```

The build runs six steps in order:

1. build:images (scripts/build-images.mjs): resizes the 26 shop photographs out of docs/references/instagram into 480, 720, and 1080 px files in avif, webp, and jpeg, crops the 1200x630 Open Graph image from the shop front, and writes client/src/lib/photoVariants.js. It stops the build if a photograph in client/src/lib/photos.js has no source, if a file it should have written is missing, or if a file appears that the inventory does not ask for.
2. build:menu (scripts/build-menu-data.mjs): parses db/seed.sql into client/src/lib/menuSnapshot.js, so the menu shows before an API answers.
3. vite build: the client bundle into client/dist.
4. build:ssr: a second bundle of client/src/prerender-entry.jsx into client/dist-ssr.
5. prerender (scripts/prerender.mjs): renders each route with renderToString and writes the head tags, the title, description, canonical, hreflang, Open Graph, and JSON-LD, into per route index.html files, plus a 404.html for unknown paths.
6. build:sitemap (scripts/build-sitemap.mjs): writes sitemap.xml with both languages of every page and robots.txt pointing at it.

The photographs are build artifacts and are not committed. client/public/photos is in .gitignore, and both npm run dev and npm run build run the image step first. A photograph whose source and settings have not changed is not encoded again; run npm run build:images --force to rebuild everything. sharp is a dev dependency.

### Preview on GitHub Pages

The site is deployed to GitHub Pages while the client reviews it, at /elfa-bakery/. .github/workflows/deploy-pages.yml runs npm run build with VITE_BASE=/elfa-bakery/ and uploads client/dist. That subfolder is what the base path is for: it reaches the Vite asset URLs, the router basename, the picture sources, and the head URLs, so the same build works at the root of elfabakery.it when the final host is chosen. Canonical URLs, the sitemap, and the Open Graph URLs stay on https://www.elfabakery.it either way, because the preview is not the site of record.

GitHub Pages serves no /api, so every content loader keeps its static fallback, and every route has its own folder with an index.html, so no rewrite rule is needed. 404.html carries an empty #root and a noindex tag, which is what makes an unknown path boot the app and show the NotFound page there.

### Analytics

Plausible, behind VITE_PLAUSIBLE_DOMAIN in client/src/lib/analytics.js. The script loads only when the variable is set and only on that domain, so a preview deploy and a local build send nothing. There are no cookies, so there is no cookie banner; the Cookies page says so. Set the repository variable PLAUSIBLE_DOMAIN in GitHub Actions to turn it on for the preview.

## Checks

```bash
npm run lint
npm test
npm run check:rules
npm run check:render
```

- lint: ESLint for the client and the server.
- test: the API tests in server/tests with the Node test runner. They stub the MySQL pool, so no database is needed.
- check:rules: enforces the mandatory writing rules, no em dashes, no emojis, no lines that only contain > or />.
- check:render: renders every route with react-dom/server and checks there is exactly one h1 per page.

## Project layout

- client: React app.
- server: Express API.
- db: schema.sql and seed.sql for MySQL Workbench.
- docs/references: shop photos for internal design study only.
- scripts: build steps and checks, the image pipeline, the menu snapshot, the prerender, the sitemap, the rule checker, and the route render smoke test.

Generated files, do not edit by hand:

- client/public/photos: every photograph the site ships, written by scripts/build-images.mjs.
- client/src/lib/photoVariants.js: the sizes and formats of those photographs, written by the same step.
- client/src/lib/menuSnapshot.js: the menu parsed out of db/seed.sql by scripts/build-menu-data.mjs.
- client/dist: the built site, one index.html per route.
