import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import TikTokEmbed from './TikTokEmbed.jsx'

// TikTok's feed widget is heavy (~25 MB once it preloads its videos) and takes
// 5–10s to appear on a phone. To make /socials open instantly, ONE copy of it
// lives here for the whole visit:
//   - it starts loading in the background once the landing page has finished
//     loading (or right away if the visitor lands on /socials),
//   - it is never unmounted or moved, because moving an iframe reloads it,
//   - while a <TikTokFeedSlot> is on the page, it's laid exactly over the slot;
//     otherwise it sits invisible behind the page.
// The trade-off: every visitor downloads the feed, even if they never open
// /socials. That was a deliberate call by the band.

const FeedContext = createContext({ setSlot: () => {}, height: 0 })

const whenIdle = (cb) => {
  if (window.requestIdleCallback) {
    const h = window.requestIdleCallback(cb, { timeout: 3000 })
    return () => window.cancelIdleCallback(h)
  }
  const h = window.setTimeout(cb, 1500)
  return () => window.clearTimeout(h)
}

const wait = (ms) => new Promise((r) => window.setTimeout(r, ms))

// Resolves once the current page's own (non-lazy) images are in, so the feed
// never competes with them. The browser's load event can't be used alone: it
// can fire before React has even added the images.
const pageSettled = () => {
  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener('load', r, { once: true }))
  const images = [...document.querySelectorAll('main img:not([loading="lazy"])')]
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise((r) => {
          img.addEventListener('load', r, { once: true })
          img.addEventListener('error', r, { once: true })
        })
    )
  return Promise.race([Promise.all([loaded, ...images]), wait(8000)])
}

// Document position. Top comes from offsetTop because the page-enter
// animation shifts <main> vertically while it runs (offsetTop ignores
// transforms; offsetTop is measured inside each ancestor's border, so add the
// borders back). Left/width come from the rect for sub-pixel accuracy; the
// animation never moves anything sideways.
const docOffset = (el) => {
  let top = 0
  for (let n = el; n; n = n.offsetParent) top += n.offsetTop + (n === el ? 0 : n.clientTop)
  const rect = el.getBoundingClientRect()
  return { top, left: rect.left + window.scrollX, width: rect.width }
}

const sameBox = (a, b) => a && b && a.top === b.top && a.left === b.left && a.width === b.width

export function TikTokFeedProvider({ username, children }) {
  const [slot, setSlot] = useState(null)
  const [started, setStarted] = useState(false)
  const [box, setBox] = useState(null)
  const [height, setHeight] = useState(0)
  const hostRef = useRef(null)

  useEffect(() => {
    if (started) return
    if (slot) {
      setStarted(true)
      return
    }
    let cancelled = false
    let cancelIdle = () => {}
    pageSettled().then(() => {
      if (!cancelled) cancelIdle = whenIdle(() => setStarted(true))
    })
    return () => {
      cancelled = true
      cancelIdle()
    }
  }, [slot, started])

  // Follow the slot around as the page lays out.
  useLayoutEffect(() => {
    if (!slot) {
      setBox(null)
      return
    }
    const measure = () => {
      const next = docOffset(slot)
      setBox((prev) => (sameBox(prev, next) ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(slot)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [slot])

  // The slot reserves however tall TikTok makes the feed.
  useEffect(() => {
    const host = hostRef.current
    const ro = new ResizeObserver(() => setHeight(host.offsetHeight))
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  const visible = box !== null
  useEffect(() => {
    // Keep the hidden copy out of the tab order and screen readers.
    hostRef.current.inert = !visible
  }, [visible])

  const ctx = useMemo(() => ({ setSlot, height }), [height])

  return (
    <FeedContext.Provider value={ctx}>
      {children}
      <div
        ref={hostRef}
        aria-hidden={!visible}
        style={
          visible
            ? {
                position: 'absolute',
                top: box.top,
                left: box.left,
                width: box.width,
                zIndex: 10,
                // Same fade-up as <main>'s page-enter, so it moves with the slot.
                animation: 'fadeUp 0.5s cubic-bezier(0.2, 0.65, 0.3, 1) both',
              }
            : {
                // In the viewport (so the browser doesn't lazy-skip the iframe)
                // but transparent and painted behind the page background.
                position: 'fixed',
                top: 0,
                left: 0,
                width: Math.min(780, window.innerWidth - 80),
                opacity: 0,
                pointerEvents: 'none',
                zIndex: -1,
              }
        }
      >
        {started && <TikTokEmbed username={username} />}
      </div>
    </FeedContext.Provider>
  )
}

export function TikTokFeedSlot() {
  const { setSlot, height } = useContext(FeedContext)
  return <div ref={setSlot} style={{ height: height || undefined }} />
}
