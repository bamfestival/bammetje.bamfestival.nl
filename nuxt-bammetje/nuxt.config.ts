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
    'nuxt-schema-org',
    'nuxt-swiper',
    '@dargmuesli/nuxt-cookie-control',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      title: 'Bammetje 2026 | Zaterdag 23 mei, Oogst Hengelo',
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
          content: 'Bammetje 2026 | Zaterdag 23 mei, Oogst Hengelo',
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
        { property: 'og:image:width', content: '1440' },
        { property: 'og:image:height', content: '756' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@BAMfestival' },
        {
          name: 'twitter:title',
          content: 'Bammetje 2026 | Zaterdag 23 mei, Oogst Hengelo',
        },
        {
          name: 'twitter:description',
          content: 'Gratis muziek, warme BAM-sfeer en een compacte festivaldag op Oogst in Hengelo.',
        },
        {
          name: 'twitter:image',
          content: 'https://bammetje.bamfestival.nl/assets/hero/bammetje-header-1440.webp',
        },
        { property: 'article:published_time', content: '2026-03-01' },
        { property: 'article:modified_time', content: '2026-03-21' },
      ],
      link: [
        { rel: 'canonical', href: 'https://bammetje.bamfestival.nl/' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicons/logo-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicons/logo-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicons/logo-180.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://open.spotify.com' },
        { rel: 'preconnect', href: 'https://www.youtube.com' },
        { rel: 'dns-prefetch', href: 'https://www.openstreetmap.org' },
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
    description: 'Gratis mini-editie van BAM! Festival – Zaterdag 23 mei 2026 bij Oogst in Hengelo',
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
      description: 'Gratis mini-editie van BAM! Festival – Zaterdag 23 mei 2026 bij Oogst in Hengelo',
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
    barPosition: 'bottom-full',
    colors: {
      barBackground: '#530A1D',
      barButtonBackground: '#F8BE05',
      barButtonColor: '#120206',
      barButtonHoverBackground: '#E26426',
      barButtonHoverColor: '#fdfafb',
      barTextColor: '#fdfafb',
      checkboxActiveBackground: '#C62144',
      checkboxActiveCircleBackground: '#fdfafb',
      checkboxDisabledBackground: '#921234',
      checkboxDisabledCircleBackground: '#fdfafb',
      checkboxInactiveBackground: 'rgba(253, 250, 251, 0.2)',
      checkboxInactiveCircleBackground: '#fdfafb',
      controlButtonBackground: '#C62144',
      controlButtonHoverBackground: '#E26426',
      controlButtonIconColor: '#fdfafb',
      controlButtonIconHoverColor: '#fdfafb',
      focusRingColor: '#F8BE05',
      modalBackground: '#120206',
      modalButtonBackground: '#C62144',
      modalButtonColor: '#fdfafb',
      modalButtonHoverBackground: '#E26426',
      modalButtonHoverColor: '#fdfafb',
      modalOverlay: '#530A1D',
      modalOverlayOpacity: 0.9,
      modalTextColor: '#fdfafb',
      modalUnsavedColor: '#F8BE05',
    },
    cookies: {
      necessary: [
        {
          id: 'cookie_control_consent',
          name: 'cookie_control_consent',
          description: 'Onthoudt uw cookie voorkeuren',
        },
      ],
      optional: [
        {
          id: 'matomo_analytics',
          name: 'matomo_analytics',
          description: 'Anonieme statistieken voor website-analyse',
          links: {
            text: 'Meer informatie over Matomo',
            url: 'https://matomo.org/privacy-policy/',
          },
        },
      ],
    },
  },

  leaflet: {},

  swiper: {},

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
