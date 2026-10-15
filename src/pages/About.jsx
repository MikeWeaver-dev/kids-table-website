import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel.jsx'

const members = [
  { name: 'Amy Smith', role: 'Vocals' },
  { name: 'Mike Weaver', role: 'Guitar' },
  { name: 'Max Wooten', role: 'Bass' },
  { name: 'Andy King', role: 'Drums' },
  { name: 'Bryan Truong', role: 'Keys' },
  { name: 'Ryan Thomas', role: 'Trumpet' },
]

const pullQuotes = [
  {
    quote: 'Quintessential light indie rock, jazz, and pop with sophisticated playfulness.',
    source: 'Off the Record Press',
  },
  {
    quote: 'Nails the oddly specific experiences and anxieties of love. Hard-hitting, relatable.',
    source: 'DC Music Review',
  },
  {
    quote: 'Bright brass and pulsing guitar, the late-night world of overthinking and uneasy glances.',
    source: 'Dork',
  },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-8 md:pb-14">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="md:col-span-5 order-2 md:order-1">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-4 md:mb-6">
                Washington, DC · Est. 2023
              </p>
              <h1 className="font-display font-black leading-[0.9] tracking-tightest text-[14vw] md:text-[9vw] lg:text-[8rem]">
                Kids
                <br />
                <span className="italic font-light">Table</span>
              </h1>
              <p className="mt-6 md:mt-8 text-lg md:text-xl text-ink/80 max-w-xl text-balance leading-relaxed">
                Six people. One table. A lot of staying up to 3 a.m., set to brass,
                swung drums, and jazz chords that shouldn't work but somehow do.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 font-medium text-sm uppercase tracking-wider hover:bg-rust transition-colors"
                >
                  <span>New album: 3AM Club</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/shows"
                  className="inline-flex items-center gap-2 border border-ink/20 px-5 py-3 font-medium text-sm uppercase tracking-wider hover:border-ink transition-colors"
                >
                  Upcoming shows
                </Link>
              </div>
            </div>

            <div className="md:col-span-7 order-1 md:order-2">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <section className="border-y border-ink/10 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center gap-8 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Washington DC</span>
          <span className="text-ink/20">·</span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Indie Pop &amp; Indie Rock</span>
          <span className="text-ink/20">·</span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Six-piece</span>
          <span className="text-ink/20">·</span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Trumpet included</span>
        </div>
      </section>

      {/* Bio */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-rust">The story so far</p>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-tightest leading-[0.95] text-balance">
              Six best friends who bonded over music.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 text-ink/85 text-lg leading-relaxed space-y-5">
            <p>
              <span className="font-semibold text-ink">The Short Version:</span> All six members went to UNC Chapel Hill
              but didn't start playing music together until they met up in DC.
            </p>
            <p>
              It started with Amy, Max, and Mike who played covers. As they added
              Andy, BT, and Ryan, they began expanding their catalogue and writing
              energetic crowd pleasers.
            </p>
            <p>
              Now they've toured the east coast, released an album, and played a lot of
              great music <span aria-hidden>:)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="mb-10 md:mb-14">
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tightest leading-none">
              The six.
            </h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-14">
            {members.map(({ name, role }) => (
              <li key={name} className="flex flex-col">
                <span className="font-display font-bold text-2xl md:text-3xl tracking-tightest leading-tight">
                  {name}
                </span>
                <span className="mt-1 text-paper/60 text-sm uppercase tracking-wider">
                  {role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Press quotes */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-rust mb-10">What they're saying</p>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {pullQuotes.map(({ quote, source }) => (
            <figure key={source} className="relative">
              <span
                className="absolute -top-6 -left-2 font-display text-7xl text-rust/30 leading-none select-none"
                aria-hidden
              >
                "
              </span>
              <blockquote className="font-display text-xl md:text-2xl leading-snug text-ink text-pretty">
                {quote}
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/50">
                {source}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Listen CTA */}
      <section className="relative overflow-hidden border-t border-ink/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="aspect-square overflow-hidden bg-ink/5 max-w-sm">
              <img
                src="/images/3am-club.jpg"
                alt="3AM Club album cover"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">New album · September 2026</p>
            <h2 className="mt-3 font-display font-black text-5xl md:text-7xl tracking-tightest leading-[0.9]">
              3AM Club
            </h2>
            <p className="mt-5 text-lg text-ink/80 max-w-lg leading-relaxed">
              Nine tracks for the hours when nothing feels decidable and everything feels urgent.
              Our debut record is out everywhere now.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="https://music.apple.com/us/artist/kids-table/1777719657"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              >
                Apple Music
              </a>
              <a
                href="https://open.spotify.com/search/kids%20table"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              >
                Spotify
              </a>
              <a
                href="https://youtube.com/@kidstabletheband"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
