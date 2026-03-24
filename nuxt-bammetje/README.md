# Bammetje Nuxt Site

Nuxt implementation for `bammetje.bamfestival.nl`, the mini-edition of BAM! Festival at Oogst in Hengelo.

## Stack

- Nuxt 4
- Nuxt Content for site, artist, and sponsor data
- Nuxt Image for optimized asset delivery
- Nuxt Fonts for Saira Condensed and Instrument Sans
- Leaflet for the location map
- Sitemap, robots, PWA, schema.org, and cookie control modules

## Project Structure

- `app/app.vue`: global shell, header, footer, cookie control, and Matomo bootstrapping
- `app/pages/index.vue`: homepage sections and content presentation
- `app/components/ArtistCard.vue`: interactive artist cards
- `app/composables/useSite.ts`: content queries and mapped site data
- `content/site.json`: global site copy and metadata
- `content/artists/*.json`: line-up data, stage assignment, and schedule hints
- `content/sponsors/*.json`: sponsor data
- `public/assets/`: published images, logos, and favicons

## Install

```bash
npm install
```

If `better-sqlite3` was built with another Node version, rebuild it before running Nuxt:

```bash
npm rebuild better-sqlite3
```

## Development

Start the local dev server:

```bash
npm run dev
```

Build the production app:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content Editing

- Keep public-facing copy in Dutch.
- Keep code and docs in English.
- Update event metadata in `content/site.json`.
- Update artists and sponsors through the JSON files under `content/`.
- Keep performance timing on the artist records via `starttime` and `endtime`.
- Keep published asset paths relative and compatible with subfolder hosting.
- Add sponsor logos as optimized web assets in `public/assets/logos/` and reference them from `content/sponsors/*.json`.
- Normalize sponsor logos to a landscape transparent canvas before publishing. The site currently expects `640x238` source assets for the main sponsor strip.

## Validation

Recommended checks after meaningful changes:

```bash
npm rebuild better-sqlite3
npm run build
```

Manual checks:

- verify hero, line-up, timetable, info, location, and footer render correctly
- verify header and mobile-menu anchors scroll to real sections
- verify Leaflet map loads
- verify no console errors in the browser
- verify metadata, sitemap, manifest, and robots output

## Notes

- The production build downloads Google Fonts through `@nuxt/fonts`, so network access is required during build.
- Nuxt Image asset paths must point to real files in `public/`; extensionless paths are not reliable unless a matching source exists.
