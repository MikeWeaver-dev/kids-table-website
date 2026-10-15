import { useEffect } from 'react'

// Standalone TikTok creator-feed embed.
//
// TikTok's embed.js scans the page for `.tiktok-embed` blockquotes AT SCRIPT
// LOAD TIME and replaces them with iframes. In a React SPA that mounts
// blockquotes after script execution, we have to re-inject the script to
// trigger reprocessing. Removing the previous tag and appending a fresh one is
// the standard workaround.
export default function TikTokEmbed({ username, className = '' }) {
  useEffect(() => {
    const id = 'tiktok-embed-script'
    document.getElementById(id)?.remove()
    const script = document.createElement('script')
    script.id = id
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [username])

  return (
    <blockquote
      className={`tiktok-embed ${className}`}
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
