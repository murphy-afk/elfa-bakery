# AGENTS.md

Instructions for AI agents and humans working on the Elfa Bakery website.

## Project context

- New website for Elfa Bakery, Via Sardegna 40, Milan. Bakery, caffetteria, pasticceria, gastronomia, halal options, open late.
- Goal: simple, clean, modern site that matches the warm, cozy, family run vibe of the real shop.
- Stack: React frontend, Express backend, MySQL database, custom CSS. SEO matters a lot, this is a small local business.
- Full shop data and design direction live in ROADMAP.md. Read it before making design or content decisions.

## Mandatory writing rules

These rules apply to every file you write: code, comments, docs, and UI copy.

1. No em dashes. Never use the em dash character. Use a comma, a colon, a period, or parentheses instead. Hyphens in compound words and list bullets are fine.
2. No emojis. Never use emoji characters anywhere, including UI copy, docs, and commit messages.
3. No lines that only contain > or />. Do not write a line with nothing but a greater than sign or a self closing bracket. Keep JSX tags closed on the same line as their attributes or content. Do not use bare blockquote markers.

## Code conventions

- React with Vite in client/, Express in server/, SQL in db/.
- Custom CSS only. No Tailwind, no Bootstrap, no component libraries.
- Use semantic HTML elements, one h1 per page, correct heading order.
- Images need meaningful alt text in the page language.
- Keep components small and focused, one component per file.
- File names in kebab case for CSS and docs, PascalCase for React components.
- No inline styles in JSX, use CSS classes.
- No hard coded colors in components, use CSS custom properties from the design tokens.

## Content conventions

- Italian is the default language, English is the second language.
- Keep copy short, warm, and concrete, in the voice of the shop: welcoming, informal, proud of quality.
- Prices in euro with the Italian format, for example 6,50 euro.
- Never invent menu items, prices, hours, or contact details. If data is missing, ask the owner or leave a TODO comment in the seed file.
- Allergen info is a legal requirement, keep the allergen list on the menu page.

## Database conventions

- The database is built directly in MySQL Workbench, run by hand. Never add an ORM or a migration tool.
- Scripts live in db/: db/schema.sql creates the database and the tables, db/seed.sql inserts the content. Both must run cleanly in MySQL Workbench.
- Seed scripts must be safe to re run: delete or replace existing rows before inserting.
- Use utf8mb4 collation so Italian characters render correctly.
- IDs are integers, foreign keys enforced, timestamps on rows that change.

## API conventions

- REST endpoints only, JSON responses.
- Validate and sanitize inputs, return proper HTTP status codes.
- Do not expose DB credentials or internal errors in responses.

## SEO conventions

- Unique title and meta description for every page.
- JSON-LD structured data for the bakery with real address, geo, and hours.
- Canonical URLs, sitemap.xml, robots.txt.
- Every page needs an Open Graph title, description, and image.
- Descriptive anchor text, no "click here" links.

## Design conventions

- Warm palette: amber yellow, tomato red, cream, espresso charcoal, wood tan. Defined once as CSS custom properties in a tokens file.
- Big food photography, generous whitespace, rounded shapes, clear hierarchy.
- Mobile first, test at 360px and at 1440px.
- Respect reduced motion preferences.

## Git conventions

- Small, focused commits, imperative subject line, no emojis in commit messages.

## Before you finish

- Check your output against the mandatory writing rules: no em dashes, no emojis, no lines that only contain > or />.
- Check that no data was invented.
- Keep ROADMAP.md updated when a session completes.
