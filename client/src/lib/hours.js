// Opening hours, the single confirmed list the site renders.
// Every value mirrors a row in db/seed.sql, nothing is guessed here.
// Confirmed by the owner on 2026-10-20, read from the opening hours
// highlight on the shop Instagram account: Sunday 05:30 to 21:00,
// Monday to Saturday open 24 hours.
// The panel renders this list and not GET /api/hours yet. A database
// seeded before 2026-10-20 still answers Sunday 00:00 to 15:00 with the
// note "Orario da confermare", and that must not override a schedule the
// owner has already confirmed. The fetch comes back once db/seed.sql has
// been run against the launch database.

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

function formatSlot(row) {
  if (row.is_closed) return 'Chiuso'
  if (row.is_open_all_day) return 'Aperto 24 ore'
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
// we are in is flagged, the panel marks it with an "oggi" chip.
export function groupHours(rows) {
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

  const today = new Date().getDay()

  return groups.map((group) => {
    const first = group.rows[0]
    const last = group.rows[group.rows.length - 1]
    const label =
      group.rows.length > 1
        ? `${first.day_name_it} - ${last.day_name_it}`
        : first.day_name_it

    return {
      key: `${first.day_index}-${last.day_index}`,
      label,
      value: formatSlot(first),
      note: first.note || null,
      isToday: group.rows.some((row) => row.day_index === today)
    }
  })
}
