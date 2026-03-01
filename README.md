# Mujuryoku - 11ty Photographer Starter Kit

**Live demo:** https://viarami.github.io/mujuryoku/

Mujuryoku is a themeable Eleventy (11ty) starter for photography sites.

It includes:
- Starter pages for portfolio websites
- An isolated demo page at `/demo/`
- Multiple visual themes
- Markdown blog support
- GitHub Pages deployment workflow

## Language Versions

- [Deutsch](./README.de.md)
- [Espanol](./README.es.md)
- [Francais](./README.fr.md)
- [Japanese](./README.ja.md)
- [Chinese (Simplified)](./README.zh-CN.md)

## What Changed In This Version

- Added support for optional demo images from `demo-images/` in the demo page.
- Added a dedicated demo image gallery section (auto-populates when images exist).
- Added more starter blog posts.
- Theme switcher now:
  - appears at the bottom-right
  - is enabled only in development mode (`npm run dev`) and on `/demo/`
- Portfolio content is now data-driven via `src/_data/portfolio.js`.
- GitHub and site metadata updated for `viarami/mujuryoku`.
- GitHub Pages workflow now builds with `SITE_BASE_PATH=/mujuryoku`.

## Quick Start

### Requirements

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/viarami/mujuryoku.git
cd mujuryoku
npm install
npm run dev
```

Local site: `http://localhost:8080`

## Zero-Friction Setup For New Users

To keep everything running with minimal edits, start with only these files:

1. `src/_data/metadata.js`
- Site title, URLs, contact details, social links

2. `src/_data/portfolio.js`
- Portfolio categories and image cards for both Home and Portfolio pages

3. `src/_data/services.js` and `src/_data/pricing.js`
- Services and pricing content rendered by starter macros

4. `src/posts/*.md`
- Blog content

No template edits are required for basic customization.

## Project Structure

```text
src/
  _data/
    metadata.js
    demo.js
    portfolio.js
    pricing.js
    services.js
    theme.js
  _includes/
    components/
    layouts/
  assets/
    css/
    images/
    js/
  pages/
  posts/
  demo/
demo-images/
.github/workflows/deploy.yml
.eleventy.js
```

## Demo vs Starter Separation

- Demo route source: `src/demo/`
- Demo data: `src/_data/demo.js`
- Demo styles: `src/assets/css/demo.css`
- Optional demo image source folder: `demo-images/` (published to `/assets/demo-images/`)
- Starter pages remain in `src/pages/`

If you do not need the demo route, you can remove `src/demo/`, demo data in `src/_data/demo.js`, demo styles in `src/assets/css/demo.css`, and `demo-images/`.

## Theme Switching

Theme switcher script: `src/assets/js/theme-switcher.js`

Behavior:
- shown in development mode
- shown on `/demo/` in published builds
- hidden on normal published starter pages

## Blog

Create new posts in `src/posts/`:

```markdown
---
title: "Your Post Title"
date: 2026-03-01
tags: ["photography", "tips"]
featured_image: /assets/images/portfolio-1.jpg
excerpt: "Short summary text"
layout: post.njk
---

Post content here.
```

## GitHub Pages Deployment (`viarami/mujuryoku`)

This repository is configured for project-page deployment:

- Repo: `https://github.com/viarami/mujuryoku`
- Published URL: `https://viarami.github.io/mujuryoku/`

### Already configured

- Workflow: `.github/workflows/deploy.yml`
- Build base path env var: `SITE_BASE_PATH=/mujuryoku`
- URL metadata: `src/_data/metadata.js`
- HTML URL prefix transform in `.eleventy.js` for root-relative links/assets

### Activate deployment

1. Push to `main`.
2. In GitHub repo settings, set **Pages -> Source** to **GitHub Actions**.
3. Wait for the `Deploy to GitHub Pages` workflow to finish.

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run clean` - remove `_site`
- `npm run debug` - Eleventy debug output

## License

MIT
