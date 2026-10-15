import { Link } from 'react-router-dom'

const socials = [
  { label: 'Linktree', href: 'https://linktr.ee/kidstabletheband' },
  { label: 'Instagram', href: 'https://instagram.com/kidstabletheband' },
  { label: 'TikTok', href: 'https://tiktok.com/@kidstabletheband' },
  { label: 'YouTube', href: 'https://youtube.com/@kidstabletheband' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/32kfAfuvBPUU3VIRgwS8o5' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-6 md:mt-10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <p className="font-display font-black text-3xl tracking-tightest leading-none">
              Kids Table
            </p>
            <p className="mt-3 text-ink/60 text-sm max-w-xs">
              Six-piece indie pop out of Washington, DC. New album <em>3AM Club</em> out now.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">
              Elsewhere
            </p>
            <ul className="space-y-1.5">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-ink hover:text-rust transition-colors"
                  >
                    <span>{label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">
              Get in touch
            </p>
            <a
              href="mailto:kidstabletheband@gmail.com"
              className="text-ink hover:text-rust transition-colors break-all"
            >
              kidstabletheband@gmail.com
            </a>
            <div className="mt-3">
              <Link to="/contact" className="text-sm text-ink/60 hover:text-rust transition-colors">
                Or send us a message →
              </Link>
            </div>

            <a
              href="https://linktr.us6.list-manage.com/subscribe?u=4f7ade4ad33449518a3a9f3b0&id=d10f7d4397"
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-baseline gap-2 font-display italic text-gold hover:text-rust transition-colors"
            >
              <span className="text-lg leading-tight">Sign up for our mailing list</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink/10 flex flex-col sm:flex-row justify-between gap-2 text-xs font-mono text-ink/40">
          <p>© Kids Table. All rights reserved.</p>
          <p>Built with love in Washington, DC</p>
        </div>
      </div>
    </footer>
  )
}
