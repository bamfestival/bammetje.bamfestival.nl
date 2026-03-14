# Repository Guidelines

## Project Structure & Module Organization
This repository is primarily a static placeholder site for `bammetje.bamfestival.nl`.

- `placeholder/`: deployable website files, including `index.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and optimized assets under `assets/`.
- `content/`: source materials such as logos, sponsor files, social creatives, and copy references. Treat this as source input, not the published site.
- `README.md`: short project summary.
- `placeholder/README.md`: project-specific content rules and validation commands.

Keep public-facing copy in Dutch. Keep code, filenames, and documentation in English unless the content itself is user-visible.

## Build, Test, and Development Commands
There is no build pipeline at the moment; the site is plain HTML with Tailwind loaded from CDN.

- `cd placeholder && python3 -m http.server 8000`: serve the site locally at `http://127.0.0.1:8000`.
- `npx htmlhint index.html`: validate HTML structure and common markup issues.
- `npx lighthouse http://127.0.0.1:8000 --preset=desktop --only-categories=accessibility,best-practices,seo,performance`: run a quick quality check.

Run Lighthouse only while the local server is active from `placeholder/`.

## Coding Style & Naming Conventions
Follow the existing HTML style in `placeholder/index.html`.

- Use 2-space indentation in HTML.
- Prefer semantic HTML first; keep inline JavaScript limited to configuration and third-party snippets.
- Use lowercase, hyphenated filenames such as `header-1440.webp` and `bammetje-logo-zwart-vierkant.png`.
- Preserve the current split: optimized web assets in `placeholder/assets/`, originals in `content/`.

## Testing Guidelines
This project does not have an automated test suite. Validation is manual and page-focused.

- Run `htmlhint` after editing markup.
- Re-run Lighthouse after layout, metadata, accessibility, or asset changes.
- Manually verify responsive behavior, image paths, and external links in a browser.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects, for example `Refresh placeholder branding copy`. Keep commit titles concise and action-oriented.

For pull requests:

- describe the user-visible change and affected paths;
- link the relevant issue or task when available;
- include screenshots for layout or content updates;
- note any validation performed, such as `htmlhint` or Lighthouse runs.

Avoid mixing source asset updates in `content/` with unrelated site changes unless they are part of the same deliverable.
