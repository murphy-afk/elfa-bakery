import { useEffect, useState } from 'react'

import { getJSON } from '../lib/api.js'
import LoadingNote from './LoadingNote.jsx'
import LoadErrorNote from './LoadErrorNote.jsx'

// MySQL TIME arrives as HH:MM:SS, we only show HH:MM.
function formatTime(value) {
  if (!value) return ''
  const raw = String(value).split('.')[0].split('T')[0]
  const [hours, minutes] = raw.split(':')
  return `${hours}:${minutes}`
}

function formatSlot(row) {
  if (row.is_closed) return 'Chiuso'
  if (row.is_open_all_day) return 'Aperto tutto il giorno'
  return `${formatTime(row.opens)} - ${formatTime(row.closes)}`
}

export default function HoursPanel() {
  const [hours, setHours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getJSON('/hours')
      .then((data) => {
        if (active) setHours(data)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) return <LoadingNote />
  if (error) return <LoadErrorNote>Non riusciamo a caricare gli orari.</LoadErrorNote>

  return (
    <dl className="hours-list">
      {hours.map((row) => (
        <div className="hours-row" key={row.day_index}>
          <dt className="hours-day">{row.day_name_it}</dt>
          <dd className="hours-slot">
            {formatSlot(row)}
            {row.note ? <span className="hours-note">{row.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
