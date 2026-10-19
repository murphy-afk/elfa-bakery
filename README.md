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

## Checks

```bash
npm run lint
npm run check:rules
npm run format:check
```

check:rules enforces the mandatory writing rules: no em dashes, no emojis, no lines that only contain > or />.

## Project layout

- client: React app.
- server: Express API.
- db: schema.sql and seed.sql for MySQL Workbench.
- docs/references: shop photos for internal design study only.
- scripts: rule checker.
