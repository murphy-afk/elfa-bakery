import { useLocale } from '../lib/i18n.js'
import { confirmedHours, groupHours } from '../lib/hours.js'

const TODAY_CHIP = { it: 'oggi', en: 'today' }

// Renders the confirmed schedule in client/src/lib/hours.js. See the
// comment there for why the panel does not read GET /api/hours yet.
export default function HoursPanel() {
  const locale = useLocale()
  const chip = TODAY_CHIP[locale] ?? TODAY_CHIP.it
  const groups = groupHours(confirmedHours, locale)

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
