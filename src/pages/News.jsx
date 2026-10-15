import { Link } from 'react-router-dom'
import { posts } from '../data/news.js'

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export default function News() {
  const [featured, ...rest] = posts
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
      <header className="mb-10 md:mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-rust">The latest</p>
        <h1 className="mt-3 font-display font-black text-5xl md:text-7xl tracking-tightest leading-[0.95]">
          News
          <span className="italic font-light"> &amp; notes.</span>
        </h1>
      </header>

      {featured && <FeaturedPost post={featured} />}

      <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-10 md:gap-14">
        {rest.map((post) => (
          <SecondaryPost key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

function FeaturedPost({ post }) {
  return (
    <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-ink/10 pt-10 md:pt-14">
      <div className="md:col-span-5 order-1 md:order-2">
        <div className="aspect-square overflow-hidden bg-ink/5">
          <img
            src={post.image}
            alt={post.imageAlt || ''}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>
      <div className="md:col-span-7 order-2 md:order-1">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
          <span className="text-rust">{post.kind}</span>
          <span className="text-ink/30">·</span>
          <time dateTime={post.date} className="text-ink/50">
            {dateFmt.format(new Date(post.date))}
          </time>
        </div>
        <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-tightest leading-[1] text-balance">
          {post.title}
        </h2>
        <div className="mt-5 space-y-4 text-ink/85 text-lg leading-relaxed">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {post.links?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {post.links.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
                >
                  {link.label} →
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
                >
                  {link.label} ↗
                </a>
              )
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function SecondaryPost({ post }) {
  return (
    <article className="border-t border-ink/10 pt-8">
      <div className="aspect-[16/10] overflow-hidden bg-ink/5 mb-5">
        <img
          src={post.image}
          alt={post.imageAlt || ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
        <span className="text-rust">{post.kind}</span>
        <span className="text-ink/30">·</span>
        <time dateTime={post.date} className="text-ink/50">
          {dateFmt.format(new Date(post.date))}
        </time>
      </div>
      <h2 className="mt-3 font-display font-black text-2xl md:text-3xl tracking-tightest leading-tight text-balance">
        {post.title}
      </h2>
      <p className="mt-3 text-ink/70 leading-relaxed">{post.excerpt}</p>
      {post.body?.length > 0 && (
        <details className="mt-4 group">
          <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-rust list-none inline-flex items-center gap-1">
            <span>Read more</span>
            <span className="transition-transform group-open:rotate-90">→</span>
          </summary>
          <div className="mt-4 space-y-3 text-ink/80 leading-relaxed">
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      )}
      {post.links?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {post.links.map((link) =>
            link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              >
                {link.label} →
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
              >
                {link.label} ↗
              </a>
            )
          )}
        </div>
      )}
    </article>
  )
}
