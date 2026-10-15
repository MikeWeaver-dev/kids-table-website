import { Link } from 'react-router-dom'

const socials = [
  { label: 'Linktree + mailing list', href: 'https://linktr.ee/kidstabletheband' },
  { label: 'Instagram', href: 'https://instagram.com/kidstabletheband' },
  { label: 'TikTok', href: 'https://tiktok.com/@kidstabletheband' },
  { label: 'YouTube', href: 'https://youtube.com/@kidstabletheband' },
  { label: 'Apple Music', href: 'https://music.apple.com/us/artist/kids-table/1777719657' },
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
