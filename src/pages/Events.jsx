import { useEffect, useState } from 'react'

const ARTIST = 'Kids Table'
const APP_ID = import.meta.env.VITE_BANDS_IN_TOWN_API || ''

export default function Events() {
  const [events, setEvents] = useState(null) // null = loading, [] = empty, [...] = loaded
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function fetchEvents() {
      if (!APP_ID) {
        setError('Bandsintown app ID not configured yet.')
        setEvents([])
        return
      }
      try {
        const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(ARTIST)}/events?app_id=${encodeURIComponent(APP_ID)}&date=upcoming`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Bandsintown request failed')
        const data = await res.json()
        if (!cancelled) setEvents(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!cancelled) {
          setError('Could not load shows right now.')
          setEvents([])
        }
      }
    }
    fetchEvents()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
      <header className="mb-10 md:mb-14 flex flex-wrap justify-between items-end gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-rust">Live</p>
          <h1 className="mt-3 font-display font-black text-5xl md:text-7xl tracking-tightest leading-[0.95]">
            Shows
          </h1>
        </div>
        <a
          href="https://www.bandsintown.com/a/15570878-kids-table"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-rust"
        >
          View on Bandsintown ↗
        </a>
      </header>

      {events === null ? (
        <LoadingState />
      ) : events.length === 0 ? (
        <EmptyState error={error} />
      ) : (
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </ul>
      )}

      <p className="mt-10 text-sm text-ink/50">
        Can't make a show? New dates are posted on{' '}
        <a className="underline underline-offset-4 hover:text-rust" href="https://instagram.com/kidstabletheband" target="_blank" rel="noreferrer">
          Instagram
        </a>
        {' '}first.
      </p>
    </section>
  )
}

function LoadingState() {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {[0, 1, 2].map((i) => (
        <div key={i} className="py-6 flex gap-5 items-center animate-pulse">
          <div className="w-16 h-16 bg-ink/5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-ink/5 w-1/3" />
            <div className="h-3 bg-ink/5 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ error }) {
  return (
    <div className="border border-ink/10 bg-cream px-6 py-10 md:py-14 text-center rounded-sm">
      <p className="font-display text-3xl md:text-4xl tracking-tightest">
        No shows on the books right now.
      </p>
      <p className="mt-3 text-ink/60 max-w-md mx-auto">
        We're writing, recording, and resting our vocal cords. Follow us for the next
        drop — we usually announce dates on Instagram first.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="https://instagram.com/kidstabletheband"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-sm uppercase tracking-wider hover:bg-rust transition-colors"
        >
          Follow on Instagram →
        </a>
      </div>
      {error && (
        <p className="mt-6 text-xs text-ink/40 font-mono">{error}</p>
      )}
    </div>
  )
}

function EventRow({ event }) {
  const dt = event.datetime ? new Date(event.datetime) : null
  const month = dt ? dt.toLocaleString('en-US', { month: 'short' }).toUpperCase() : ''
  const day = dt ? dt.getDate() : ''
  const year = dt ? dt.getFullYear() : ''
  const time = dt
    ? dt.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : ''

  const venue = event.venue || {}
  const location = [venue.city, venue.region, venue.country].filter(Boolean).join(', ')
  const tickets = event.offers?.find((o) => o.type === 'Tickets') || event.offers?.[0]
  const poster = event.artist?.image_url || event.image_url

  return (
    <li className="py-6 md:py-8">
      <div className="flex gap-5 md:gap-8 items-start">
        <div className="flex-shrink-0 w-16 md:w-20 text-center">
          <div className="font-mono text-xs tracking-widest text-rust">{month}</div>
          <div className="font-display font-black text-3xl md:text-4xl leading-none mt-1">{day}</div>
          <div className="font-mono text-[10px] text-ink/40 mt-1">{year}</div>
        </div>

        {poster && (
          <div className="hidden sm:block flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-ink/5 overflow-hidden">
            <img src={poster} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-xl md:text-2xl tracking-tight leading-tight">
            {venue.name || 'TBA'}
          </p>
          <p className="mt-1 text-ink/60 text-sm">
            {location}
            {time && <> · {time}</>}
          </p>
          {event.lineup?.length > 1 && (
            <p className="mt-2 text-xs text-ink/50 font-mono">
              w/ {event.lineup.filter((n) => n !== 'Kids Table').join(', ')}
            </p>
          )}
        </div>

        {tickets?.url && (
          <a
            href={tickets.url}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-ink text-paper px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-rust transition-colors self-center"
          >
            Tickets →
          </a>
        )}
      </div>
      {tickets?.url && (
        <a
          href={tickets.url}
          target="_blank"
          rel="noreferrer"
          className="sm:hidden mt-4 inline-flex items-center gap-2 bg-ink text-paper px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-rust transition-colors"
        >
          Tickets →
        </a>
      )}
    </li>
  )
}
