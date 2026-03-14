# Bammetje Placeholder Site

This folder contains a static placeholder website for `https://bammetje.bamfestival.nl`.

## Stack

- Static HTML
- Tailwind CSS via CDN
- Google Fonts (`Inter`)
- No client-side JavaScript required

## Content rules

- Source code and documentation are in English.
- All public-facing website copy is in Dutch.
- Event details reflect the mini-edition of BAM! Festival on `2026-05-23` from `14:00` until `23:00` at Broedplaats Oogst, Hengelo.

## Assets

- Hero image is derived from `header-bammetje-2026.jpg` and exported to responsive JPEG and WebP variants in `assets/hero/`.
- The visible site logo is served from `assets/branding/bammetje-logo-zwart-vierkant.webp`.
- Sponsor logos are optimized into PNG and WebP variants in `assets/logos/`.
- Favicon and app icons are generated from `bammetje-logo-zwart-vierkant.png` into `assets/favicons/`.

## Validation

Recommended local checks:

- `npx htmlhint index.html`
- `npx lighthouse http://127.0.0.1:8000 --preset=desktop --only-categories=accessibility,best-practices,seo,performance`
