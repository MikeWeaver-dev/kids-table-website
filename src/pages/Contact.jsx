import { useState } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xoejpjnw'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill hidden fields, humans don't.
    if (data.get('_hp')) return

    setStatus('sending')
    setError('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        const payload = await res.json().catch(() => ({}))
        setError(payload?.errors?.[0]?.message || 'Something went wrong. Try emailing us directly.')
        setStatus('error')
      }
    } catch {
      setError('Network error. Try emailing us directly.')
      setStatus('error')
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-20">
      <header className="mb-10 md:mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-rust">Contact</p>
        <h1 className="mt-3 font-display font-black text-5xl md:text-7xl tracking-tightest leading-[0.95]">
          Say Hi
          <br />
        </h1>
        <p className="mt-5 text-lg text-ink/70">
          Booking, press, collabs, or just saying hi. We read everything (eventually).
        </p>
      </header>

      {status === 'sent' ? (
        <SentMessage />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <Field label="Your name" name="name" type="text" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Subject" name="subject" type="text" placeholder="e.g. booking in Richmond, press request, demo" />
          <TextArea label="Message" name="message" required rows={6} />
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 font-medium text-sm uppercase tracking-wider hover:bg-rust transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : (
                <>
                  <span>Send message</span>
                  <span aria-hidden>→</span>
                </>
              )}
            </button>
            {status === 'error' && (
              <p role="alert" className="text-sm text-rust">{error}</p>
            )}
          </div>
        </form>
      )}

      <div className="mt-16 pt-10 border-t border-ink/10 text-ink/80">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">Or reach us directly</p>
        <p className="text-lg">
          <a
            href="mailto:kidstabletheband@gmail.com"
            className="underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust break-all"
          >
            kidstabletheband@gmail.com
          </a>
          <span className="text-ink/40"> · </span>
          or a DM on{' '}
          <a
            href="https://instagram.com/kidstabletheband"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
          >
            Instagram
          </a>{' '}
          /{' '}
          <a
            href="https://tiktok.com/@kidstabletheband"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-ink/30 hover:decoration-rust hover:text-rust"
          >
            TikTok
          </a>
          .
        </p>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required, placeholder }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
        {label}{required && <span className="text-rust"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 block w-full bg-transparent border-0 border-b-2 border-ink/20 py-2.5 focus:border-ink focus:ring-0 focus:outline-none transition-colors text-ink placeholder:text-ink/30"
      />
    </label>
  )
}

function TextArea({ label, name, required, rows = 5 }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
        {label}{required && <span className="text-rust"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="mt-2 block w-full bg-transparent border-2 border-ink/15 rounded-sm p-3 focus:border-ink focus:ring-0 focus:outline-none transition-colors text-ink placeholder:text-ink/30 resize-y"
      />
    </label>
  )
}

function SentMessage() {
  return (
    <div className="border border-ink/10 bg-cream p-8 md:p-10 rounded-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-rust">Sent</p>
      <h2 className="mt-3 font-display font-black text-3xl md:text-4xl tracking-tightest">
        Got it. Thanks for writing.
      </h2>
      <p className="mt-3 text-ink/70">
        We'll get back to you, usually within a few days. If it's urgent, email
        <a className="ml-1 underline hover:text-rust" href="mailto:kidstabletheband@gmail.com">
          kidstabletheband@gmail.com
        </a>
        .
      </p>
    </div>
  )
}
