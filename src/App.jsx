import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import About from './pages/About.jsx'
import Socials from './pages/Socials.jsx'
import Contact from './pages/Contact.jsx'
import Events from './pages/Events.jsx'
import News from './pages/News.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shows" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
