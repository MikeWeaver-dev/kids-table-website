import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import TikTokEmbed from './TikTokEmbed.jsx'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Nav />
      <main key={pathname} className="flex-1 page-enter">
        {children}
      </main>
      <Footer />

      {/* Hidden, always-mounted copy of the TikTok embed. On first page load
          this triggers the embed script to fetch & render the iframe into an
          offscreen container, populating the browser's HTTP cache. When the
          user later navigates to /socials, the visible embed's iframe loads
          from that cache and appears quickly. */}
      <div
        aria-hidden="true"
        className="fixed pointer-events-none opacity-0"
        style={{ top: '-9999px', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <TikTokEmbed username="kidstabletheband" />
      </div>
    </div>
  )
}
