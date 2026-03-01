# Mujuryoku - Starter 11ty para fotografia (Espanol)

Mujuryoku es un starter kit con Eleventy (11ty) para crear sitios web de fotografia.

## Incluye

- Paginas base: Home, Portfolio, About, Services, Pricing, Blog, Contact
- Demo aislada en `/demo/`
- 6 temas visuales
- Blog en Markdown
- Despliegue en GitHub Pages con GitHub Actions

## Inicio rapido

```bash
git clone https://github.com/viarami/mujuryoku.git
cd mujuryoku
npm install
npm run dev
```

URL local: `http://localhost:8080`

## Archivos clave para empezar

- `src/_data/metadata.js` - informacion general del sitio
- `src/_data/portfolio.js` - contenido del portfolio (Home + Portfolio)
- `src/_data/services.js` - servicios
- `src/_data/pricing.js` - precios
- `src/posts/*.md` - entradas del blog

## Separacion demo / starter

- Demo: `src/demo/`
- Datos de demo: `src/_data/demo.js`
- Imagenes de demo: `demo-images/` -> `/assets/demo-images/`
- Paginas del starter: `src/pages/`

## Theme switcher

El boton esta abajo a la derecha y solo aparece:
- en modo desarrollo (`npm run dev`)
- en la ruta demo (`/demo/`)

## GitHub Pages (viarami/mujuryoku)

- Repositorio: `https://github.com/viarami/mujuryoku`
- URL: `https://viarami.github.io/mujuryoku/`
- El build usa `SITE_BASE_PATH=/mujuryoku` (ya configurado)

Mas detalles: [README.md](./README.md)
