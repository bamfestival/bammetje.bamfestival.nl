// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/leaflet',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@vite-pwa/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
    'nuxt-og-image',
    'nuxt-schema-org',
    'nuxt-swiper',
    '@dargmuesli/nuxt-cookie-control',
    'nuxt-studio',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      title: 'Bammetje 2026 | Gratis mini-editie van BAM! Festival in Hengelo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Bammetje is de gratis mini-editie van BAM! Festival op zaterdag 23 mei 2026 bij Broedplaats Oogst in Hengelo. Bekijk de sfeer, praktische info en updates.',
        },
        { name: 'theme-color', content: '#530A1D' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:locale', content: 'nl_NL' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Bammetje 2026 | Gratis mini-editie van BAM! Festival in Hengelo',
        },
        {
          property: 'og:description',
          content:
            'Klein, maar BAM. Op zaterdag 23 mei 2026 strijkt Bammetje neer bij Broedplaats Oogst in Hengelo.',
        },
        { property: 'og:url', content: 'https://bammetje.bamfestival.nl/' },
        { property: 'og:site_name', content: 'Bammetje' },
        {
          property: 'og:image',
          content: 'https://bammetje.bamfestival.nl/assets/hero/bammetje-header-1440.webp',
        },
        { property: 'og:image:alt', content: 'Posterbeeld voor Bammetje 2026' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Bammetje 2026 | Gratis mini-editie van BAM! Festival in Hengelo',
        },
        {
          name: 'twitter:description',
          content: 'Gratis muziek, warme BAM-sfeer en een compacte festivaldag op Oogst in Hengelo.',
        },
        {
          name: 'twitter:image',
          content: 'https://bammetje.bamfestival.nl/assets/hero/bammetje-header-1440.webp',
        },
      ],
      link: [
        { rel: 'canonical', href: 'https://bammetje.bamfestival.nl/' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicons/logo-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicons/logo-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicons/logo-180.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],

  fonts: {
    families: [
      { name: 'Saira Condensed', provider: 'google', weights: [500, 700, 800] },
      { name: 'Instrument Sans', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  image: {
    domains: ['bammetje.bamfestival.nl'],
    format: ['webp', 'avif'],
    quality: 80,
  },

  site: {
    url: 'https://bammetje.bamfestival.nl',
    name: 'Bammetje',
    description: 'Gratis mini-editie van BAM! Festival in Hengelo',
  },

  sitemap: {},

  robots: {
    disallow: [],
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Bammetje 2026',
      short_name: 'Bammetje',
      description: 'Gratis mini-editie van BAM! Festival in Hengelo',
      theme_color: '#530A1D',
      background_color: '#120206',
      display: 'standalone',
      icons: [
        {
          src: '/assets/favicons/logo-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/assets/favicons/logo-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}'],
    },
    devOptions: {
      enabled: false,
    },
  },

  cookieControl: {
    locales: ['nl'],
    barPosition: 'bottom-right',
  },

  leaflet: {},

  swiper: {},

  studio: {
    dev: true,
    route: '/_studio',
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  vite: {
    optimizeDeps: {
      include: [
        '@vue-leaflet/vue-leaflet',
      ],
    },
  },
})
