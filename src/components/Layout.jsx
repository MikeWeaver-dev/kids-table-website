import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { TikTokFeedProvider } from './TikTokFeed.jsx'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    // Owns the one persistent TikTok feed that /socials displays; see TikTokFeed.jsx.
    <TikTokFeedProvider username="kidstabletheband">
      <div className="min-h-screen flex flex-col bg-paper text-ink">
        <Nav />
        <main key={pathname} className="flex-1 page-enter">
          {children}
        </main>
        <Footer />
      </div>
    </TikTokFeedProvider>
  )
}
