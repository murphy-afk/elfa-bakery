import { useEffect, useState } from 'react'

import { useLocale } from '../lib/i18n.js'
import { confirmedHours, groupHours } from '../lib/hours.js'
import { loadHours } from '../lib/content.js'

const TODAY_CHIP = { it: 'oggi', en: 'today' }

// Renders the confirmed schedule. The static list in client/src/lib/hours.js
// is what shows in the first paint and in the prerendered HTML, and the
// panel then asks GET /api/hours for a newer answer. See client/src/lib/content.js
// for the two cases where the API answer is dropped in favour of the
// static list: no API process at all, and a database seeded before the
// schedule was confirmed on 2026-10-20.
export default function HoursPanel() {
  const locale = useLocale()
  const chip = TODAY_CHIP[locale] ?? TODAY_CHIP.it
  const [rows, setRows] = useState(confirmedHours)
  // The chip marks the day of the visitor, so it only appears after the
  // first client render. A page prerendered yesterday has to hydrate
  // cleanly today, see the note in client/src/lib/hours.js.
  const [today, setToday] = useState(null)

  useEffect(() => {
    let active = true

    setToday(new Date().getDay())
    loadHours().then((next) => {
      if (active) setRows(next)
    })

    return () => {
      active = false
    }
  }, [])

  const groups = groupHours(rows, locale, { today })

  return (
    <dl className="hours-list">
      {groups.map((group) => (
        <div
          className={group.isToday ? 'hours-row is-today' : 'hours-row'}
          key={group.key}>
          <dt className="hours-day">
            {group.label}
            {group.isToday ? <span className="hours-today">{chip}</span> : null}
          </dt>
          <dd className="hours-slot">
            {group.value}
            {group.note ? <span className="hours-note">{group.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
