# Repository Guidelines

## Project Structure & Module Organization
This repository contains the website work for `bammetje.bamfestival.nl`, a mini-edition of BAM! Festival at Oogst.

- `placeholder/`: deployable prototype files. Treat this as the current public-facing single-file HTML5 site root.
- `content/`: source materials such as logos, sponsor files, social creatives, and copy references. Treat this as source input, not the published site.
- `bam-tailwind-website-theme-ui-kit/`: visual reference kit, design tokens, and reusable Tailwind-based patterns for BAMmetje.
- `README.md`: short project summary.

The current prototype is a mobile-first SPA-style site with scroll-based sections such as hero, line-up, timetable, info, location, and footer. Keep public-facing copy in Dutch. Keep code and documentation in English. Use English for filenames unless the asset itself is a source file that already exists under `content/`.

All production-ready paths must work when the site is served from a folder instead of domain root. Always verify relative paths for CSS, JavaScript, fonts, images, icons, and third-party libraries.

## Build, Test, and Development Commands
The current prototype has no build pipeline; use plain HTML with Tailwind CSS via CDN. If the project is expanded into Nuxt, use Node deployment on CloudPanel.

- `cd placeholder && python3 -m http.server 8000`: serve the site locally at `http://127.0.0.1:8000`.
- `npx htmlhint index.html`: validate HTML structure and common markup issues.
- `npx prettier --check .`: verify formatting when Prettier is configured.
- `npx lighthouse http://127.0.0.1:8000 --preset=desktop --only-categories=accessibility,best-practices,seo,performance`: run a quick quality check.

Run Lighthouse only while the local server is active from `placeholder/`.

If a Nuxt implementation is introduced, prefer this module baseline:

- `npx nuxt@latest module add eslint icon image fonts ui content tailwindcss sitemap robots eslint-module og-image schema-org swiper llms cookie-control studio @nuxtjs/leaflet`

Prototype with Tailwind CSS 4.x via CDN. For production builds, prefer a proper Tailwind/PostCSS pipeline instead of the CDN script.

## Coding Style & Naming Conventions
Follow the existing HTML style in the prototype and keep implementation decisions consistent with the BAMmetje design direction.

- Use 2-space indentation in HTML.
- Prefer semantic HTML5 first; keep inline JavaScript limited to configuration and small progressive-enhancement behavior.
- Use `snake_case` for logic identifiers and `kebab-case` for CSS and HTML classes.
- Use lowercase, hyphenated asset filenames such as `header-1440.webp` and `bammetje-logo-zwart-vierkant.png`.
- Preserve the current split: optimized web assets in published folders, originals in `content/`.
- Use Tailwind utility patterns that support a modern, fluid, joyful, responsive, non-corporate visual language.

Design and brand direction:

- Build for a local audience in Hengelo and Twente.
- The core message is free live music at a mini-edition of BAM!.
- The site should feel playful, warm, energetic, and accessible, never corporate or overly dark.
- Keep layouts mobile-first, expressive, and scroll-based rather than dense or portal-like.
- Prefer bold condensed display typography for headings and a clean sans-serif for body text.
- Use subtle motion only. Respect `prefers-reduced-motion`.

Color system:

- `#FDFAFB` almost white
- `#D8979C` soft pink accent
- `#120206` deep black/burgundy
- `#E26426` orange
- `#921234` dark red
- `#530A1D` dark burgundy
- `#C62144` BAM red
- `#F8BE05` BAM yellow

Default BAM gradient:

- `linear-gradient(135deg, #530A1D 0%, #921234 35%, #C62144 55%, #E26426 80%, #F8BE05 100%)`

Suggested token roles:

- primary: BAM red
- secondary: BAM orange
- accent: BAM yellow
- dark background: BAM burgundy
- light text: BAM white

Image handling:

- Always serve images in modern formats such as WebP or AVIF.
- Convert original JPEG and PNG assets before publishing.
- On macOS, prefer `sips` for baseline conversions and `cwebp` when available via Homebrew.

## Testing Guidelines
This project does not have an automated test suite. Validation is manual and page-focused.

- Run `htmlhint` after editing markup.
- Run linting when configured.
- Run Prettier checks when configured.
- Re-run Lighthouse after layout, metadata, accessibility, or asset changes.
- Test in a browser for console errors after meaningful UI or script changes.
- Manually verify responsive behavior, keyboard navigation, image paths, and external links in a browser.
- Manually verify the site from a subfolder path, not only from root.

Accessibility and SEO are required, not optional:

- semantic HTML5 structure
- correct heading hierarchy
- descriptive page titles and meta descriptions
- Open Graph and Twitter Card tags
- canonical URL
- sitemap and robots.txt
- alt text for all meaningful images
- keyboard-friendly navigation
- visible focus states
- sufficient color contrast
- skip-to-content link
- ARIA only when needed
- scalable typography
- clean readable URLs
- fast performance through optimized images and minimal CSS

Target WCAG 2.2 AA compliance throughout.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects, for example `Refresh placeholder branding copy`. Keep commit titles concise and action-oriented.

For pull requests:

- describe the user-visible change and affected paths;
- link the relevant issue or task when available;
- include screenshots for layout or content updates;
- note any validation performed, such as `htmlhint` or Lighthouse runs.

Avoid mixing source asset updates in `content/` with unrelated site changes unless they are part of the same deliverable.
