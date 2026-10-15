import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-rust">404</p>
      <h1 className="mt-3 font-display font-black text-6xl md:text-8xl tracking-tightest leading-[0.9]">
        Not here.
      </h1>
      <p className="mt-5 text-lg text-ink/70">
        That page is as elusive as finishing a song at a reasonable hour.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-sm uppercase tracking-wider hover:bg-rust transition-colors"
      >
        Back home →
      </Link>
    </section>
  )
}
