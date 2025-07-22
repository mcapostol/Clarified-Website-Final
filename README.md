# Clarified Website

Modern, responsive landing site for the **Clarified** consulting brand – built for speed and easy content tweaks by non‑tech teammates.

| Section | Details |
|---------|---------|
| **Goal** | Public face of Clarified: services, case studies, contact. Optimised for SEO & Lighthouse > 90. |
| **Stack** | HTML5 / SCSS, TinyJS for form validation, GitHub Actions for deployment to Azure Static Web Apps. |
| **Status** | **Production** (used on clarified.ro) |

## Roadmap&nbsp;🚀
- [x] Static pages & CSS refactor
- [x] GitHub Actions → Azure Static Web Apps
- [ ] Add blog section (Markdown → 11ty build)
- [ ] Integrate Azure Cognitive Search for on‑site search
- [ ] Automate Lighthouse CI badge

## Local setup
```bash
git clone https://github.com/mcapostol/Clarified-Website-Final
npm install           # downloads live‑server
npm run dev           # open http://localhost:4000
