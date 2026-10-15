import { useEffect } from 'react'

export default function Socials() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
      <header className="mb-10 md:mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-rust">Socials :)</p>
        <h1 className="mt-3 font-display font-black text-5xl md:text-7xl tracking-tightest leading-[0.95]">
          Find us
          <br />
          <span className="italic font-light">on the internet.</span>
        </h1>
        <p className="mt-5 text-lg text-ink/70 max-w-xl">
          We post more than we probably should. Pick your poison —
          we're <span className="font-mono text-ink">@kidstabletheband</span> everywhere.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <SocialCard
          platform="Instagram"
          handle="@kidstabletheband"
          href="https://instagram.com/kidstabletheband"
          color="from-plum to-rust"
          description="Photos from the studio, shows, and the occasional unflattering candid."
        />
        <SocialCard
          platform="TikTok"
          handle="@kidstabletheband"
          href="https://tiktok.com/@kidstabletheband"
          color="from-dusk to-plum"
          description="Short-form chaos. The 'Come On Eileen' street performance lives here."
        />
      </div>

      {/* TikTok embed */}
      <div className="mt-14 md:mt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-5">
          Latest from TikTok
        </p>
        <div className="relative rounded border border-ink/10 bg-cream p-5 md:p-8 min-h-[520px]">
          {/* Loading state — sits behind the TikTok iframe. Once TikTok replaces
              the blockquote with its iframe, the solid iframe covers this. */}
          <div
            className="pointer-events-none absolute inset-0 rounded overflow-hidden"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-br from-plum/20 via-rust/15 to-dusk/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-[3px] border-rust/70 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/50">
                  Loading posts from TikTok
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <TikTokEmbed username="kidstabletheband" />
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24 border-t border-ink/10 pt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-5">
          Also streaming us
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
          <li>
            <a
              className="underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              href="https://music.apple.com/us/artist/kids-table/1777719657"
              target="_blank"
              rel="noreferrer"
            >
              Apple Music ↗
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              href="https://open.spotify.com/search/kids%20table"
              target="_blank"
              rel="noreferrer"
            >
              Spotify ↗
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              href="https://youtube.com/@kidstabletheband"
              target="_blank"
              rel="noreferrer"
            >
              YouTube ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

function SocialCard({ platform, handle, href, color, description }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative block overflow-hidden rounded-sm border border-ink/10 bg-gradient-to-br ${color} text-paper p-6 md:p-8 min-h-[200px] md:min-h-[240px]`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-70">{platform}</p>
          <p className="mt-2 font-display font-black text-3xl md:text-4xl tracking-tightest">
            {handle}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <p className="text-sm max-w-xs opacity-85 leading-snug">{description}</p>
          <span className="font-display text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            ↗
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </a>
  )
}

function TikTokEmbed({ username }) {
  // TikTok's embed.js looks for `.tiktok-embed` blockquotes and converts them to iframes.
  // In a React SPA, the script only runs once — so on client-side navigation we need
  // to remove and re-inject it to force reprocessing after the blockquote mounts.
  useEffect(() => {
    const scriptId = 'tiktok-embed-script'
    document.getElementById(scriptId)?.remove()
    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [username])

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/@${username}`}
      data-unique-id={username}
      data-embed-type="creator"
      style={{ maxWidth: 780, minWidth: 288, margin: '0 auto' }}
    >
      <section>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.tiktok.com/@${username}?refer=creator_embed`}
        >
          @{username}
        </a>
      </section>
    </blockquote>
  )
}
