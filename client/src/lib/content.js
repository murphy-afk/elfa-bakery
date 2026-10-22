// Reads the content the site shows: the menu, the allergen list, and the
// opening hours.
// Every loader asks the Express API first, because that is where the
// owner edits the data, and falls back to the static module generated at
// build time when the API does not answer. GitHub Pages serves files
// only, so there is no /api there and the pages still show the real
// content instead of a load error. The same fallback keeps the site working
// if the API process is down while a host runs both.

import { getJSON } from './api.js'
import { menuCategories, allergens } from './menuSnapshot.js'
import { confirmedHours } from './hours.js'

export async function loadMenu() {
  try {
    return await getJSON('/menu')
  } catch {
    return menuCategories
  }
}

export async function loadAllergens() {
  try {
    return await getJSON('/allergens')
  } catch {
    return allergens
  }
}

// A database seeded before the schedule was confirmed on 2026-10-20
// answers Sunday 00:00 to 15:00 with the note "Orario da confermare".
// Rows like that must never override the schedule the owner confirmed,
// so the answer is rejected and the static list is rendered instead.
function isConfirmedSchedule(rows) {
  if (!Array.isArray(rows) || rows.length !== 7) return false

  const days = new Set()
  for (const row of rows) {
    if (!Number.isInteger(row.day_index) || row.day_index < 0 || row.day_index > 6) return false
    if (days.has(row.day_index)) return false
    days.add(row.day_index)
    if (typeof row.note === 'string' && /confermare/i.test(row.note)) return false
  }

  return true
}

export async function loadHours() {
  try {
    const rows = await getJSON('/hours')
    return isConfirmedSchedule(rows) ? rows : confirmedHours
  } catch {
    return confirmedHours
  }
}
