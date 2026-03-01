# Mujuryoku - 11ty Fotografen Starter (Deutsch)

Mujuryoku ist ein Eleventy (11ty) Starter-Kit fuer Fotografen-Websites.

## Enthalten

- Starter-Seiten: Home, Portfolio, About, Services, Pricing, Blog, Contact
- Isolierte Demo-Seite unter `/demo/`
- 6 Themes
- Markdown-Blog
- GitHub Pages Deployment via GitHub Actions

## Schnellstart

```bash
git clone https://github.com/viarami/mujuryoku.git
cd mujuryoku
npm install
npm run dev
```

Lokale URL: `http://localhost:8080`

## Wichtige Dateien fuer den Start

- `src/_data/metadata.js` - Basisdaten (Titel, URL, Kontakt)
- `src/_data/portfolio.js` - Portfolio-Inhalte fuer Home + Portfolio
- `src/_data/services.js` - Service-Inhalte
- `src/_data/pricing.js` - Preis-Inhalte
- `src/posts/*.md` - Blogbeitraege

## Demo vs Starter

- Demo-Templates: `src/demo/`
- Demo-Daten: `src/_data/demo.js`
- Demo-Bilder: `demo-images/` -> `/assets/demo-images/`
- Starter-Seiten: `src/pages/`

## Theme Switcher

Der Theme-Switcher ist unten rechts und nur aktiv:
- im Dev-Modus (`npm run dev`)
- auf der Demo-Route (`/demo/`)

## GitHub Pages (viarami/mujuryoku)

- Repository: `https://github.com/viarami/mujuryoku`
- URL: `https://viarami.github.io/Mujuryoku---11ty-Starter-Photographer-Kit`
- Build nutzt `SITE_BASE_PATH=/mujuryoku` (bereits in Workflow gesetzt)

Mehr Details: [README.md](./README.md)
