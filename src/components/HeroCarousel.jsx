import { useEffect, useRef, useState } from 'react'

// Edit this list to add/remove images from the hero rotation.
// `pos` tunes `object-position` when the natural crop doesn't center well.
const images = [
  { src: '/images/band-hero.jpg',       alt: 'Kids Table — band portrait',  pos: 'center' },
  { src: '/images/crowd.jpg',           alt: 'Crowd at a Kids Table show',  pos: 'center' },
  { src: '/images/band-live-crowd.jpg', alt: 'Kids Table live with crowd',  pos: 'center' },
  { src: '/images/band-studio-2.jpg',   alt: 'Kids Table in the studio',    pos: 'center' },
  { src: '/images/band-portrait.jpg',   alt: 'Kids Table — band portrait',  pos: 'center' },
]

const INTERVAL_MS = 5000

export default function HeroCarousel() {
  // Random starting image so repeat visits feel fresh.
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * images.length))
  const timerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || images.length < 2) return

    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, INTERVAL_MS)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-ink/5">
      {images.map((img, i) => (
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
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchpriority={i === 0 ? 'high' : 'auto'}
          draggable={false}
        />
      ))}
    </div>
  )
}
