import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  // Warm the TikTok embed script from first page load so Socials feels instant.
  // Preload in index.html downloads the bytes; this adds the actual <script> tag
  // once so the script is parsed/executed and ready to process blockquotes.
  // Socials.jsx re-injects on its own mount to trigger processing of its blockquote.
  useEffect(() => {
    if (document.getElementById('tiktok-embed-preload')) return
    const script = document.createElement('script')
    script.id = 'tiktok-embed-preload'
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Nav />
      <main key={pathname} className="flex-1 page-enter">
        {children}
      </main>
      <Footer />
    </div>
  )
}
