<!-- Badges -->
<p align="center">
  <a href="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/ci.yml/badge.svg?branch=main&style=flat-square">
  </a>
  <a href="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/codeql.yml">
    <img alt="CodeQL" src="https://github.com/mcapostol/Clarified-Website-Final/actions/workflows/codeql.yml/badge.svg?branch=main&style=flat-square">
  </a>
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square">
</p>

<h1 align="center">Clarified – Company Website</h1>

**Clarified** is a consultancy brand site focused on clear messaging, blazing‑fast load times, and SEO.  
Built as a static site (HTML/SCSS) and deployed via GitHub Actions to Azure Static Web Apps.

<!-- live -->
<p align="center">
  <a href="[live-url]" target="_blank">🌐 Live demo</a>
</p>

<!-- screenshot -->
<p align="center">
  <img src="img/screenshot.png" width="720" alt="Homepage screenshot">
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
- [ ] Blog section (Markdown → Eleventy)  
- [ ] Lighthouse CI badge in README  
- [ ] GDPR cookie banner  

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
