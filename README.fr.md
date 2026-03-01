# Mujuryoku - Starter 11ty pour photographes (Francais)

Mujuryoku est un starter kit Eleventy (11ty) pour creer un site portfolio photo.

## Contenu

- Pages de base: Home, Portfolio, About, Services, Pricing, Blog, Contact
- Page demo isolee: `/demo/`
- 6 themes
- Blog Markdown
- Deploiement GitHub Pages via GitHub Actions

## Demarrage rapide

```bash
git clone https://github.com/viarami/mujuryoku.git
cd mujuryoku
npm install
npm run dev
```

URL locale: `http://localhost:8080`

## Fichiers principaux a modifier

- `src/_data/metadata.js` - infos globales du site
- `src/_data/portfolio.js` - cartes portfolio (Home + Portfolio)
- `src/_data/services.js` - contenu services
- `src/_data/pricing.js` - contenu tarifs
- `src/posts/*.md` - articles du blog

## Separation demo / starter

- Demo: `src/demo/`
- Donnees demo: `src/_data/demo.js`
- Images demo: `demo-images/` -> `/assets/demo-images/`
- Pages starter: `src/pages/`

## Theme switcher

Le bouton est en bas a droite et visible seulement:
- en mode developpement (`npm run dev`)
- sur la route demo (`/demo/`)

## GitHub Pages (viarami/mujuryoku)

- Depot: `https://github.com/viarami/mujuryoku`
- URL: `https://viarami.github.io/mujuryoku/`
- Build avec `SITE_BASE_PATH=/mujuryoku` (deja configure)

Voir aussi: [README.md](./README.md)
