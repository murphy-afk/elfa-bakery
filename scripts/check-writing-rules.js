// Enforces the mandatory writing rules from AGENTS.md:
// 1. No em dashes.
// 2. No emojis.
// 3. No lines that only contain > or />.
// Run with: npm run check:rules

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOT = process.cwd()
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.vite'])
const EXTENSIONS = new Set([
  '.md',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.css',
  '.sql',
  '.json',
  '.html',
  '.txt',
  '.yml',
  '.yaml'
])

const EM_DASH = '\u2014'
const EMOJI =
  /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}\u{200D}\u{20E3}]/u
const BARE_BRACKET = /^[>\/\s]+$/

function collect(dir, out) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stats = statSync(full)
    if (stats.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) {
        collect(full, out)
      }
    } else if (EXTENSIONS.has(extname(entry).toLowerCase())) {
      out.push(full)
    }
  }
}

const files = []
collect(ROOT, files)

let violations = 0

for (const file of files) {
  const rel = file.slice(ROOT.length + 1)
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)

  lines.forEach((line, index) => {
    const row = index + 1

    if (line.includes(EM_DASH)) {
      console.log(`${rel}:${row} em dash found`)
      violations++
    }

    if (EMOJI.test(line)) {
      console.log(`${rel}:${row} emoji found`)
      violations++
    }

    if (line.trim().length > 0 && BARE_BRACKET.test(line)) {
      console.log(`${rel}:${row} line contains only > or />`)
      violations++
    }
  })
}

if (violations === 0) {
  console.log('All writing rules passed.')
} else {
  console.log(`\n${violations} violation(s) found.`)
  process.exitCode = 1
}
