import { useEffect, useState } from 'react'

// Edit this list to add/remove images from the hero rotation.
// `pos` tunes `object-position` when the natural crop doesn't center well.
const images = [
  { src: '/images/band-hero.jpg',       alt: 'Kids Table band portrait',  pos: 'center' },
  { src: '/images/crowd.jpg',           alt: 'Crowd at a Kids Table show',  pos: 'center' },
  { src: '/images/band-live-crowd.jpg', alt: 'Kids Table live with crowd',  pos: 'center' },
  { src: '/images/band-studio-2.jpg',   alt: 'Kids Table in the studio',    pos: 'center' },
  { src: '/images/band-portrait.jpg',   alt: 'Kids Table band portrait',  pos: 'center' },
]

const INTERVAL_MS = 5000

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function HeroCarousel() {
  // Random starting image so repeat visits feel fresh.
  const [start] = useState(() => Math.floor(Math.random() * images.length))
  const [idx, setIdx] = useState(start)
  // The slides are stacked in the same spot, so the browser treats every one
  // as on-screen and loading="lazy" can't defer them; all five used to
  // download at once, which made the visible one slow on phones. Instead a
  // slide only gets rendered (and downloaded) once it's wanted: the first one
  // immediately, then each next one after the current one has loaded.
  const [wanted, setWanted] = useState(() => new Set([start]))
  const [loaded, setLoaded] = useState(() => new Set())
  const next = (idx + 1) % images.length

  useEffect(() => {
    if (images.length < 2 || prefersReducedMotion() || !loaded.has(idx)) return
    setWanted((w) => (w.has(next) ? w : new Set(w).add(next)))
    // Never fade to a slide that hasn't finished downloading.
    if (!loaded.has(next)) return
    const timer = window.setTimeout(() => setIdx(next), INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [idx, next, loaded])

  return (
    <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-ink/5">
      {images.map((img, i) =>
        wanted.has(i) ? (
          <img
            key={img.src}
            src={img.src}
            alt={i === idx ? img.alt : ''}
            aria-hidden={i !== idx}
            className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: i === idx ? 1 : 0,
              transitionDuration: '1200ms',
              objectPosition: img.pos || 'center',
            }}
            fetchpriority={i === start ? 'high' : 'low'}
            onLoad={() => setLoaded((l) => (l.has(i) ? l : new Set(l).add(i)))}
            draggable={false}
          />
        ) : null
      )}
    </div>
  )
}
