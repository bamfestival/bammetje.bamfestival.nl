import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const siteConfig = JSON.parse(
  readFileSync(resolve('./content/site.json'), 'utf-8'),
) as {
  title: string
  tagline: string
  meta?: {
    description?: string
    ogDescription?: string
    ogImage?: string
    ogImageAlt?: string
  }
}

const isDev = process.env.NODE_ENV !== 'production'

const productionSecurityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
    "connect-src 'self' https://matomo.puntuale.nl https://nominatim.openstreetmap.org",
    "frame-src 'self' https://www.youtube-nocookie.com https://open.spotify.com",
    "media-src 'self' https:",
    'upgrade-insecure-requests',
  ].join('; '),
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/leaflet',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@vite-pwa/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@dargmuesli/nuxt-cookie-control',
  ],

  app: {
    head: {
      title: siteConfig.title,
      htmlAttrs: { lang: 'nl' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#530A1D' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: siteConfig.meta?.description || siteConfig.tagline },
        { property: 'og:locale', content: 'nl_NL' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bammetje.bamfestival.nl/' },
        { property: 'og:site_name', content: 'Bammetje' },
        { property: 'og:title', content: siteConfig.title },
        { property: 'og:description', content: siteConfig.meta?.ogDescription || siteConfig.meta?.description || siteConfig.tagline },
        { property: 'og:image', content: siteConfig.meta?.ogImage || '' },
        { property: 'og:image:alt', content: siteConfig.meta?.ogImageAlt || siteConfig.title },
        { name: 'twitter:site', content: '@BAMfestival' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteConfig.title },
        { name: 'twitter:description', content: siteConfig.meta?.ogDescription || siteConfig.meta?.description || siteConfig.tagline },
        { name: 'twitter:image', content: siteConfig.meta?.ogImage || '' },
        { property: 'article:published_time', content: '2026-03-01' },
        { property: 'article:modified_time', content: '2026-03-21' },
      ],
      link: [
        { rel: 'canonical', href: 'https://bammetje.bamfestival.nl/' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicons/logo-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicons/logo-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicons/logo-180.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://www.openstreetmap.org' },
      ],

    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/home.css', 'leaflet/dist/leaflet.css'],

  fonts: {
    families: [
      { name: 'Saira Condensed', provider: 'google', weights: [700, 800] },
      { name: 'Instrument Sans', provider: 'google', weights: [400, 700] },
    ],
  },

  image: {
    domains: ['bammetje.bamfestival.nl'],
    format: ['webp', 'avif'],
    quality: 80,
  },

  site: {
    url: 'https://bammetje.bamfestival.nl',
    name: siteConfig.title,
    description: siteConfig.meta?.description || siteConfig.tagline,
  },

  sitemap: {},

  robots: {
    disallow: [],
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: siteConfig.title,
      short_name: siteConfig.title,
      description: siteConfig.meta?.description || siteConfig.tagline,
      lang: 'nl-NL',
      start_url: '/',
      scope: '/',
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
    devOptions: {
      enabled: false,
    },
  },

  nitro: {
    routeRules: {
      '/**': {
        headers: isDev ? {} : productionSecurityHeaders,
      },
      '/.well-known/security.txt': {
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      },
    },
    prerender: {
      routes: ['/'],
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

  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
      },
    },
    optimizeDeps: {
      include: [
        '@vue-leaflet/vue-leaflet',
      ],
    },
  },
})
