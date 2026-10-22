// Opening hours, the single confirmed schedule the site shows.
// Every value mirrors a row in db/seed.sql, nothing is guessed here.
// Confirmed by the owner on 2026-10-20, read from the opening hours
// highlight on the shop Instagram account: Sunday 05:30 to 21:00,
// Monday to Saturday open 24 hours. The owner confirmed the same
// schedule again on 2026-10-22 for Session 6.
// The panel renders this list in its first paint, then asks
// GET /api/hours for a newer answer through client/src/lib/content.js,
// which throws that answer away when it is missing or still carries the
// note "Orario da confermare". A database seeded before 2026-10-20 must
// never override a schedule the owner has already confirmed.

export const confirmedHours = [
  {
    day_index: 0,
    day_name_it: 'Domenica',
    opens: '05:30:00',
    closes: '21:00:00',
    is_open_all_day: 0,
    is_closed: 0,
    note: null
  },
  { day_index: 1, day_name_it: 'Lunedì', is_open_all_day: 1, is_closed: 0 },
  { day_index: 2, day_name_it: 'Martedì', is_open_all_day: 1, is_closed: 0 },
  { day_index: 3, day_name_it: 'Mercoledì', is_open_all_day: 1, is_closed: 0 },
  { day_index: 4, day_name_it: 'Giovedì', is_open_all_day: 1, is_closed: 0 },
  { day_index: 5, day_name_it: 'Venerdì', is_open_all_day: 1, is_closed: 0 },
  { day_index: 6, day_name_it: 'Sabato', is_open_all_day: 1, is_closed: 0 }
]

// MySQL TIME arrives as HH:MM:SS, we only show HH:MM.
function formatTime(value) {
  if (!value) return ''
  const raw = String(value).split('.')[0].split('T')[0]
  const [hours, minutes] = raw.split(':')
  return `${hours}:${minutes}`
}

// The week list is Italian first, English is the second language.
const DAY_NAMES = {
  it: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

const CLOSED = { it: 'Chiuso', en: 'Closed' }
const OPEN_ALL_DAY = { it: 'Aperto 24 ore', en: 'Open 24 hours' }

function dayName(dayIndex, locale) {
  return DAY_NAMES[locale]?.[dayIndex] ?? DAY_NAMES.it[dayIndex]
}

function formatSlot(row, locale) {
  if (row.is_closed) return CLOSED[locale] ?? CLOSED.it
  if (row.is_open_all_day) return OPEN_ALL_DAY[locale] ?? OPEN_ALL_DAY.it
  return `${formatTime(row.opens)} - ${formatTime(row.closes)}`
}

function slotKey(row) {
  return [row.is_closed, row.is_open_all_day, row.opens, row.closes].join('|')
}

// day_index follows JavaScript: 0 is Sunday. The week order starts Monday.
function weekOrder(dayIndex) {
  return dayIndex === 0 ? 6 : dayIndex - 1
}

// Days that share the same schedule collapse into one line, so a week of
// identical rows does not repeat itself seven times on the page. The day
// we are in is flagged, the panel marks it with a chip.
// options.today picks the day to flag and defaults to the day of the
// machine. Pass null while rendering on a server: the prerendered HTML
// must not depend on the day it was built, or it would not hydrate
// tomorrow. The panel fills it in after mount instead.
export function groupHours(rows, locale = 'it', options = {}) {
  const { today = new Date().getDay() } = options
  const sorted = [...rows].sort(
    (a, b) => weekOrder(a.day_index) - weekOrder(b.day_index)
  )

  const groups = []
  for (const row of sorted) {
    const previous = groups[groups.length - 1]
    const consecutive =
      previous && weekOrder(row.day_index) === previous.lastOrder + 1

    if (consecutive && slotKey(row) === previous.slotKey) {
      previous.rows.push(row)
      previous.lastOrder = weekOrder(row.day_index)
      continue
    }

    groups.push({
      rows: [row],
      lastOrder: weekOrder(row.day_index),
      slotKey: slotKey(row)
    })
  }

  return groups.map((group) => {
    const first = group.rows[0]
    const last = group.rows[group.rows.length - 1]
    const firstDay = dayName(first.day_index, locale)
    const lastDay = dayName(last.day_index, locale)
    const label = group.rows.length > 1 ? `${firstDay} - ${lastDay}` : firstDay

    return {
      key: `${first.day_index}-${last.day_index}`,
      label,
      value: formatSlot(first, locale),
      note: first.note || null,
      isToday: today !== null && group.rows.some((row) => row.day_index === today)
    }
  })
}
