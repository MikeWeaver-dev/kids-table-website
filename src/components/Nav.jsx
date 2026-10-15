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
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display font-black text-xl md:text-2xl tracking-tightest leading-none">
            Kids Table
          </span>
          <span className="hidden md:inline text-ink/40 font-mono text-xs mt-1">— DC</span>
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

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden -mr-2 p-2 relative z-50"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <div className="w-6 h-5 relative">
            <span
              className={`absolute left-0 right-0 h-0.5 bg-ink transition-all duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-ink transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-0.5 bg-ink transition-all duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-14 bottom-0 bg-paper z-40 flex flex-col overflow-y-auto transition-all duration-300 ease-out ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-6 pt-4 pb-10">
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group flex items-baseline justify-between py-4 border-b border-ink/10 last:border-b-0 transition-colors ${
                  isActive ? 'text-rust' : 'text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`font-display font-black tracking-tightest leading-none text-[2.25rem] ${
                      isActive ? 'italic font-light' : ''
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-[0.2em] ${
                      isActive ? 'text-rust' : 'text-ink/30'
                    }`}
                  >
                    0{i + 1}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
