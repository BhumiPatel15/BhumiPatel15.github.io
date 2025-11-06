# Terminal Portfolio (Astro + Tailwind)

This repository contains a static, terminal-inspired portfolio site built with Astro and Tailwind CSS. All copy is file-based in `/content/*.yml`.

Editing guide only (no local run steps needed):

- Update site settings in `content/site.yml` (name, handle, role, accent, toggles, socials, resume, email).
- Update sections: `skills.yml`, `experience.yml`, `education.yml`, `certifications.yml`, `projects.yml`, `organizations.yml`.
- On push to `main`, GitHub Actions builds and deploys to GitHub Pages.

Structure:

- `src/components/*` — UI components.
- `src/pages/index.astro` — single-page layout reading YAML files.
- `src/layouts/BaseLayout.astro` — meta tags, header/nav, global styles.
- `public/` — static assets (favicon, og image, robots.txt).
- `.github/workflows/gh-pages.yml` — CI configuration.

Notes:

- Accent color and scanlines are set by `content/site.yml`.
- Respects `prefers-reduced-motion` and a manual `reducedMotion` toggle.
