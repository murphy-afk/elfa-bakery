import { confirmedHours, groupHours } from '../lib/hours.js'

// Renders the confirmed schedule in client/src/lib/hours.js. See the
// comment there for why the panel does not read GET /api/hours yet.
export default function HoursPanel() {
  const groups = groupHours(confirmedHours)

  return (
    <dl className="hours-list">
      {groups.map((group) => (
        <div
          className={group.isToday ? 'hours-row is-today' : 'hours-row'}
          key={group.key}>
          <dt className="hours-day">
            {group.label}
            {group.isToday ? <span className="hours-today">oggi</span> : null}
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
