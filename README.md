<!-- Badges -->
<p align="center">
  <a href="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/ci.yml">
    <img alt="CI Status" src="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/ci.yml/badge.svg?branch=main&style=flat-square" />
  </a>
  <a href="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/codeql.yml">
    <img alt="CodeQL Analysis" src="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/codeql.yml/badge.svg?branch=main&style=flat-square" />
  </a>
  <a href="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/lighthouse.yml">
    <img alt="Lighthouse CI" src="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/lighthouse.yml/badge.svg?branch=main&style=flat-square" />
  </a>
  <a href="LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square" />
  </a>
</p>

<h1 align="center">Clarified – Company Website</h1>
<p align="center">
  <strong>Clarified</strong> is a consultancy brand site focused on clear messaging,<br>
  blazing‑fast load times and top‑notch SEO.<br>
  Built as a static site (HTML/SCSS) and deployed via GitHub Actions → Azure Static Web Apps.
</p>

<!-- Live demo -->
<p align="center">
  <a href="https://clarified.ro/" target="_blank" rel="noopener noreferrer">
    🌐 Live Demo
  </a>
</p>

<!-- Screenshot -->
<p align="center">
  <img src="img/screenshot.png" width="720" alt="Clarified homepage screenshot" />
</p>

## Tech stack

| Layer | Choice |
|-------|--------|
| Mark‑up / Style | HTML5, SCSS (Dart‑Sass) |
| Tooling | NPM scripts, PostCSS Autoprefixer |
| CI / CD | GitHub Actions → Azure Static Web Apps |
| Testing | Lighthouse CI (performance budget) |
| Security | Dependabot + CodeQL (HTML/JS) |

## Features

- 💨 **Lighthouse 95+** performance out‑of‑the‑box  
- 📱 Fully responsive (mobile‑first)  
- 🗺️ SEO meta tags + sitemap.xml  
- 🌘 Dark‑mode toggle with CSS variables  
- **Contact form** powered by Azure Functions (serverless)

## Roadmap 🚀

- [x] Static pages & SCSS refactor  
- [x] GitHub Actions deploy to Azure Static Web Apps  
- [x] Blog section (Markdown → Eleventy)  
- [x] Lighthouse CI badge in README  
- [x] GDPR cookie banner  

## Quick start

```bash
git clone https://github.com/mcapostol/Clarified-Website-Final
npm install
npm run dev           # localhost:4000 with live‑reload
npm run build         # outputs /dist
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Serve site with BrowserSync |
| `npm run build` | Compile SCSS → CSS & minify HTML |
| `npm run lhci` | Run Lighthouse CI locally |

## License

[MIT](LICENSE)
