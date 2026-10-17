# Kids Table — kidstabletheband.com

The band website for **[Kids Table](https://kidstabletheband.com)**, a six-piece indie pop band out of Washington, DC.

- **Live:** https://kidstabletheband.com (also https://kids-table-band.web.app)
- **Repo:** https://github.com/MikeWeaver-dev/kids-table-website
- **Hosting:** Firebase Hosting, project `kids-table-band`

Any band member can edit the site. **Push to `main` and it deploys automatically.**

---

## The band

- Amy Smith — vocals
- Mike Weaver — guitar
- Max Wooten — bass
- Andy King — drums
- Bryan Truong (BT) — keys
- Ryan Thomas — trumpet

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend framework | React 18 |
| Routing | React Router v6 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Language | JavaScript (no TypeScript — intentional, keeps barrier low) |
| Hosting | Firebase Hosting |
| CI/CD | GitHub Actions (`FirebaseExtended/action-hosting-deploy@v0`) |
| Contact form | Formspree (free tier) |
| Shows API | Bandsintown API (artist app_id from Bandsintown for Artists) |
| Social embeds | TikTok oEmbed script |

**Node version:** 20.x (CI uses 20; works locally with any 18+).

---

## Getting started locally

```bash
# 1. Clone
git clone https://github.com/MikeWeaver-dev/kids-table-website.git
cd kids-table-website

# 2. Install (one-time)
npm install

# 3. Run dev server
npm run dev
```

The dev server lives at `http://localhost:5173` with hot reload on save.

**Production build check** (optional, mostly for sanity before merging):

```bash
npm run build       # produces dist/
npm run preview     # serves dist/ at localhost:4173
```

One env var is needed for the Shows page. Create `.env` in the project root:

```
VITE_BANDS_IN_TOWN_API=<app_id from Bandsintown for Artists>
```

CI reads the same value from the `BANDSINTOWN_APP_ID` GitHub Actions secret. Without it the Shows page always shows the empty state. Formspree is wired to the shared band email and needs no setup.

---

## Making a change

```bash
git checkout -b my-change        # branch (optional but polite)
# ...edit files...
git add -A
git commit -m "Describe the change"
git push                         # if on a branch, open a PR; if on main, deploys immediately
```

**Pushing to `main` triggers a production deploy** (~45 seconds end to end). You'll see the run at [Actions](https://github.com/MikeWeaver-dev/kids-table-website/actions).

**Pushing to a feature branch and opening a PR** gets you an auto-generated preview URL in the PR comments. Useful for sharing drafts before merging.

---

## Where to edit what

| What you want to change | File |
| --- | --- |
| News / announcements (add, remove, edit posts) | `src/data/news.js` |
| About page copy (bio, member list, press quotes) | `src/pages/About.jsx` |
| Hero carousel images or rotation speed | `src/components/HeroCarousel.jsx` |
| Nav links or site structure | `src/components/Nav.jsx` and `src/App.jsx` |
| Footer | `src/components/Footer.jsx` |
| Contact form fields or email target | `src/pages/Contact.jsx` (uses Formspree ID `xoejpjnw`) |
| Socials page copy / handles | `src/pages/Socials.jsx` |
| Shows page / Bandsintown artist name | `src/pages/Events.jsx` |
| Colors, fonts, theme tokens | `tailwind.config.js` |
| Site-wide base styles | `src/index.css` |
| Logo, favicon, images used in copy | `public/images/` |

### Adding a news post
Open `src/data/news.js`. Posts live in the `posts` array in reverse-chronological order (newest first). Copy an existing post object as a template:

```js
{
  id: 'unique-slug',           // url-safe, used as React key
  kind: 'Tour',                // badge label: Release / Tour / Press / etc.
  date: '2026-11-15',          // YYYY-MM-DD
  title: 'Headline here',
  excerpt: 'One-line summary shown in grid view.',
  image: '/images/some-photo.jpg',
  imageAlt: 'alt text for accessibility',
  body: [
    'Paragraph 1.',
    'Paragraph 2.',
  ],
  links: [
    { label: 'External link', href: 'https://example.com' },
    { label: 'Internal link', href: '/shows', internal: true },
  ],
}
```

The first post in the array is rendered as the featured post. The rest appear in a two-column grid below.

### Swapping hero carousel photos
Edit the `images` array in `src/components/HeroCarousel.jsx`:

```js
const images = [
  { src: '/images/band-hero.jpg',       alt: 'Kids Table — band portrait',  pos: 'center' },
  // ...add/remove/reorder...
]
```

`pos` is passed to CSS `object-position` if the default `center` crop doesn't frame the band well — try `'top'`, `'bottom'`, `'center 30%'`, etc.

Rotation speed is controlled by `INTERVAL_MS` at the top of the same file (default 5000 = 5 seconds).

### Updating images
1. Drop originals in a `/assets` folder (gitignored, don't commit)
2. Run `scripts/optimize-images.ps1` from PowerShell on Windows — it downsizes photos and copies them to `public/images/`
3. Reference them in the code at `/images/filename.jpg`

If you're on Mac/Linux, the script is PowerShell-specific. You can downsize images any way you prefer; just put the final web-ready versions in `public/images/` and keep them under ~1 MB each.

---

## Deploy pipeline (how it's wired)

```
local change -> git push to main
             -> GitHub Actions runs (.github/workflows/firebase-hosting-merge.yml)
                1. npm ci
                2. npm run build  (produces dist/)
                3. firebase deploy via FirebaseExtended/action-hosting-deploy
             -> live at kidstabletheband.com in ~45s
```

- The deploy uses a service account stored as a GitHub secret: `FIREBASE_SERVICE_ACCOUNT_KIDS_TABLE_BAND`
- No one needs Firebase CLI access to deploy — just push rights to the repo
- Firebase hosting config: `firebase.json` (rewrites, cache headers)
- Firebase project binding: `.firebaserc` (`kids-table-band`)
- If you ever need to deploy manually: `firebase deploy --only hosting` (requires `firebase login` and project access)

### Preview deploys for PRs
Every PR gets a unique preview URL posted as a comment on the PR, via `.github/workflows/firebase-hosting-pull-request.yml`. These URLs expire after ~7 days.

---

## Firebase & domain

- **Firebase project:** `kids-table-band`
- **Firebase Hosting console:** https://console.firebase.google.com/project/kids-table-band/hosting
- **Default Firebase URL:** `kids-table-band.web.app`
- **Custom domain:** `kidstabletheband.com` (apex) + `www.kidstabletheband.com` (redirects to apex)
- **Registrar:** Porkbun — https://porkbun.com
- **DNS:** apex uses an `ALIAS` record pointing to `kids-table-band.web.app`; `www` uses a `CNAME` pointing to the same
- **SSL:** Let's Encrypt via Firebase. **Auto-renews** every ~60 days. No action needed.
- **Email (MX):** untouched by DNS changes — if the band ever wants `hello@kidstabletheband.com`-style email, it can be added without disturbing hosting

---

## Project structure

```
kids-table-website/
├── public/
│   ├── images/              # Optimized photos & logos (committed)
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── HeroCarousel.jsx # Crossfade carousel on home
│   │   ├── Layout.jsx       # Wraps all pages (nav + footer + hidden TikTok prewarm)
│   │   ├── Nav.jsx          # Top nav + mobile menu
│   │   └── TikTokEmbed.jsx  # Shared TikTok creator-feed embed
│   ├── data/
│   │   └── news.js          # News posts source of truth
│   ├── pages/
│   │   ├── About.jsx        # Home (/)
│   │   ├── Contact.jsx      # /contact
│   │   ├── Events.jsx       # /shows (Bandsintown)
│   │   ├── News.jsx         # /news
│   │   ├── NotFound.jsx     # 404
│   │   └── Socials.jsx      # /socials (TikTok embed)
│   ├── App.jsx              # Route table
│   ├── main.jsx             # React entry
│   └── index.css            # Tailwind + base styles
├── scripts/
│   └── optimize-images.ps1  # Windows image downsizer
├── .github/workflows/       # CI/CD
├── firebase.json            # Hosting rules & cache headers
├── .firebaserc              # Firebase project binding
├── tailwind.config.js       # Design tokens
├── vite.config.js
└── package.json
```

---

## Design conventions

- **Colors are defined in `tailwind.config.js`.** Use the semantic names (`ink`, `paper`, `cream`, `rust`, `plum`, `olive`, `dusk`) rather than hex values. If you add a new color, add it there first.
- **Fonts:** `font-display` (Fraunces serif) for headlines, `font-sans` (Inter) for body, `font-mono` (JetBrains Mono) for micro-labels.
- **Mobile-first.** Default styles target phones; `md:` prefix adds desktop styles. The site gets ~70% of its traffic from mobile — test any UI change on a phone-width viewport (Chrome DevTools device mode is fine).
- **Avoid "AI-slop" aesthetics.** No glassy gradients everywhere, no stock purple-to-cyan gradients, no generic marketing-template feel. Keep it editorial, warm, and specific to the band.

---

## Troubleshooting

**`npm install` fails on Windows**
Delete `node_modules/` and `package-lock.json`, then retry. If still failing, confirm Node ≥ 18.

**Dev server won't start / port in use**
Another `vite` is probably running. Kill it (close the terminal or `Ctrl+C`), or Vite will prompt to use port 5174.

**I pushed but the live site hasn't updated**
Check the [Actions tab](https://github.com/MikeWeaver-dev/kids-table-website/actions). If the latest run is red, click into it to see which step failed. Common causes: lint error in a new file, image path typo, missing import. The failing step shows the exact Node error.

**TikTok embed is blank**
The embed only renders if `@kidstabletheband` has public posts. Confirm the account has public TikToks. Hard-refresh (Ctrl+Shift+R). The site preloads the embed on first page view so navigating to `/socials` should feel fast — if it doesn't, see the loading state (gradient + spinner).

**Shows page shows "No shows on the books"**
Either Bandsintown has no upcoming events for artist ID 15570878, or the request failed. Open the browser console on `/shows`: a `[Shows]` error with status 403 means the app_id is missing or wrong (check `.env` locally, the `BANDSINTOWN_APP_ID` secret in CI). Otherwise shows auto-update from Bandsintown — add new dates there, they appear here within a few minutes.

**Contact form submissions aren't arriving**
Check the Formspree dashboard: https://formspree.io/forms/xoejpjnw. The form ID is in `src/pages/Contact.jsx`. If the band wants to change the destination email, do it in Formspree's dashboard (not the code).

**SSL cert warning in browser**
Only an issue right after initial domain setup. The cert auto-renews ongoing — if you ever see a cert warning on the live site, check Firebase Hosting console for status.

---

## Contact

For code questions: open an issue on this repo.
For band stuff: kidstabletheband@gmail.com
