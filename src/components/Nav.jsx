import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'About' },
  { to: '/news', label: 'News' },
  { to: '/shows', label: 'Shows' },
  { to: '/socials', label: 'Socials' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="font-display font-black text-xl md:text-2xl tracking-tightest leading-none"
          >
            Kids Table
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative font-medium text-sm tracking-wide uppercase transition-colors hover:text-rust ${
                    isActive ? 'text-rust' : 'text-ink/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-rust" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 -mr-2 touch-manipulation"
          >
            <span
              className={`block w-6 h-[2px] bg-ink transition-transform duration-200 ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-ink mt-[4px] transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-ink mt-[4px] transition-transform duration-200 ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu — rendered as sibling to header, not child, to avoid iOS sticky+fixed stacking quirks */}
      {open && (
        <div
          className="md:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-paper animate-fade-in overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <nav className="flex flex-col px-6 py-6">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-4xl font-black tracking-tightest py-5 border-b border-ink/10 last:border-b-0 ${
                    isActive ? 'text-rust italic font-light' : 'text-ink'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
