// Generates client/src/lib/menuSnapshot.js out of db/seed.sql.
//
// The site is temporarily deployed on GitHub Pages, which serves files
// only, so there is no Express process and no GET /api/menu there. The
// menu page and the featured cards on the home page would show a load
// error, so the build turns the seed script into a static module and the
// pages use it whenever the API does not answer.
//
// db/seed.sql stays the single source of truth: it is what the owner runs
// in MySQL Workbench, and the snapshot is regenerated from it on every
// build. Never hand edit the output.
//
// Run with: npm run build:menu

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const seedPath = path.join(root, 'db', 'seed.sql')
const outPath = path.join(root, 'client', 'src', 'lib', 'menuSnapshot.js')

// ---------------------------------------------------------------------------
// A small reader for the INSERT statements in the seed script. It walks the
// file character by character so a semicolon or a dash inside a string
// cannot end a statement early.
// ---------------------------------------------------------------------------

function skipTrivia(sql, index) {
  let i = index
  while (i < sql.length) {
    const char = sql[i]
    if (/\s/.test(char)) {
      i++
      continue
    }
    if ((char === '-' && sql[i + 1] === '-') || char === '#') {
      while (i < sql.length && sql[i] !== '\n') i++
      continue
    }
    break
  }
  return i
}

function readTuple(sql, start) {
  let i = start + 1
  let depth = 1
  let inString = false
  let partStart = i
  const parts = []

  while (i < sql.length) {
    const char = sql[i]

    if (inString) {
      if (char === '\\') {
        i += 2
        continue
      }
      if (char === "'") {
        if (sql[i + 1] === "'") {
          i += 2
          continue
        }
        inString = false
      }
      i++
      continue
    }

    if (char === "'") {
      inString = true
      i++
      continue
    }
    if (char === '(') {
      depth++
      i++
      continue
    }
    if (char === ')') {
      depth--
      if (depth === 0) {
        parts.push(sql.slice(partStart, i))
        return { parts, end: i + 1 }
      }
      i++
      continue
    }
    if (char === ',' && depth === 1) {
      parts.push(sql.slice(partStart, i))
      partStart = i + 1
    }
    i++
  }

  throw new Error('Unterminated tuple in db/seed.sql')
}

function parseValue(raw) {
  const token = raw.trim()
  if (/^NULL$/i.test(token)) return null
  if (token.startsWith("'") && token.endsWith("'")) {
    return token
      .slice(1, -1)
      .replace(/\\'/g, "'")
      .replace(/''/g, "'")
      .replace(/\\\\/g, '\\')
  }
  if (/^-?\d+(?:\.\d+)?$/.test(token)) return Number(token)
  return token
}

function readInserts(sql) {
  const inserts = []
  const header = /INSERT\s+INTO\s+`?(\w+)`?\s*\(([^)]*)\)\s*VALUES/gi
  let i = 0

  while (i < sql.length) {
    i = skipTrivia(sql, i)
    if (i >= sql.length) break

    header.lastIndex = i
    const match = header.exec(sql)
    if (!match || match.index !== i) {
      i++
      continue
    }

    const table = match[1]
    const columns = match[2]
      .split(',')
      .map((name) => name.trim().replace(/`/g, ''))
    i += match[0].length

    const rows = []
    let reading = true
    while (reading) {
      const next = skipTrivia(sql, i)
      i = next
      if (sql[i] === ';') {
        i++
        reading = false
        continue
      }
      if (sql[i] === ',') {
        i++
        continue
      }
      if (sql[i] !== '(') {
        throw new Error(`Unexpected SQL at offset ${i} in db/seed.sql`)
      }
      const tuple = readTuple(sql, i)
      const row = {}
      tuple.parts.forEach((part, position) => {
        const column = columns[position]
        if (!column) return
        row[column] = parseValue(part)
      })
      rows.push(row)
      i = tuple.end
    }

    inserts.push({ table, rows })
  }

  return inserts
}

// ---------------------------------------------------------------------------
// Build the same shape GET /api/menu and GET /api/allergens return.
// ---------------------------------------------------------------------------

const inserts = readInserts(readFileSync(seedPath, 'utf8'))
const tableRows = (name) => inserts.find((entry) => entry.table === name)?.rows ?? []

const categories = tableRows('categories')
const items = tableRows('items')
const allergens = tableRows('allergens')

if (categories.length === 0 || items.length === 0 || allergens.length === 0) {
  console.error('db/seed.sql produced no categories, items, or allergens.')
  process.exit(1)
}

const byPosition = (a, b) => (a.position ?? 0) - (b.position ?? 0)
const knownCategories = new Set(categories.map((category) => category.id))
let dropped = 0

const menuCategories = [...categories]
  .sort(byPosition)
  .map((category) => ({
    id: category.id,
    name_it: category.name_it,
    name_en: category.name_en,
    slug: category.slug,
    position: category.position,
    items: items
      .filter((item) => item.category_id === category.id)
      .sort(byPosition)
      .map((item) => ({
        id: item.id,
        category_id: item.category_id,
        name_it: item.name_it,
        name_en: item.name_en,
        description_it: item.description_it,
        description_en: item.description_en,
        price: item.price,
        image_url: item.image_url,
        is_featured: item.is_featured,
        position: item.position
      }))
  }))

for (const item of items) {
  if (!knownCategories.has(item.category_id)) {
    dropped++
    console.error(`Item ${item.id} points at unknown category ${item.category_id}.`)
  }
}
if (dropped > 0) process.exit(1)

const allergenList = [...allergens]
  .sort((a, b) => a.code - b.code)
  .map((allergen) => ({
    id: allergen.id,
    code: allergen.code,
    name_it: allergen.name_it,
    name_en: allergen.name_en
  }))

const itemCount = menuCategories.reduce((total, category) => total + category.items.length, 0)
const banner = `// Generated by scripts/build-menu-data.mjs from db/seed.sql.
// Do not edit by hand: run npm run build:menu after changing the seed,
// and npm run build regenerates it before every build.

// ${menuCategories.length} categories, ${itemCount} items, ${allergenList.length} allergens.

`

const output = `${banner}export const menuCategories = ${JSON.stringify(menuCategories, null, 2)}

export const allergens = ${JSON.stringify(allergenList, null, 2)}
`

writeFileSync(outPath, output, 'utf8')
console.log(`Wrote ${path.relative(root, outPath)}: ${menuCategories.length} categories, ${itemCount} items, ${allergenList.length} allergens.`)
