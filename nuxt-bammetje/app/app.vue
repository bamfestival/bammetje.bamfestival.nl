<script setup lang="ts">
declare global {
  interface Window {
    _paq?: Array<string[]>
  }
}

const { siteConfig } = useSite()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isClientReady = ref(false)
const hasMatomoConsent = ref(false)
const matomoLoaded = ref(false)

let consentPollId: number | undefined

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const readCookie = (name: string) => {
  if (!import.meta.client) return null

  const cookie = document.cookie
    .split('; ')
    .find(entry => entry.startsWith(`${name}=`))

  if (!cookie) return null

  return decodeURIComponent(cookie.split('=').slice(1).join('='))
}

const updateConsentState = () => {
  const enabledIds = readCookie('ncc_e')
  hasMatomoConsent.value = enabledIds?.split(',').includes('matomo_analytics') ?? false
}

const navItems = computed(() => siteConfig.value.ui.navItems || [])

const footerLinks = computed(() => {
  const links = siteConfig.value?.links || {}
  return Object.entries(links)
    .filter(([key, value]) => value && !['bamFestival', 'route'].includes(key))
    .map(([key, value]) => ({
      label: key,
      href: value as string,
    }))
})

function loadMatomo() {
  if (!import.meta.client || !hasMatomoConsent.value || matomoLoaded.value) return

  window._paq = window._paq || []
  window._paq.push(['trackPageView'])
  window._paq.push(['enableLinkTracking'])
  const u = 'https://matomo.puntuale.nl/'
  window._paq.push(['setTrackerUrl', u + 'matomo.php'])
  window._paq.push(['setSiteId', '14'])
  const d = document
  const g = d.createElement('script')
  const s = d.getElementsByTagName('script')[0]
  if (s?.parentNode) {
    g.async = true
    g.src = u + 'matomo.js'
    s.parentNode.insertBefore(g, s)
    matomoLoaded.value = true
  }
}

watch(
  hasMatomoConsent,
  (isAllowed) => {
    if (isAllowed) {
      loadMatomo()
    }
  },
)

onMounted(() => {
  isClientReady.value = true
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  updateConsentState()
  loadMatomo()
  consentPollId = window.setInterval(updateConsentState, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (consentPollId) {
    window.clearInterval(consentPollId)
  }
})
</script>

<template>
  <div class="site-shell">
    <a href="#main-content" class="skip-link">{{ siteConfig.ui.skipLinkLabel }}</a>
    <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="frame">
        <div class="header-row">
          <div class="header-actions">
            <div class="main-nav-shell">
              <nav class="main-nav" :aria-label="siteConfig.ui.mainNavAriaLabel">
                <a
                  v-for="item in navItems"
                  :key="item.href"
                  :href="item.href"
                >
                  <span class="nav-label">{{ item.label }}</span>
                </a>
              </nav>
            </div>

            <button
              id="nav-toggle"
              class="nav-toggle"
              type="button"
              :aria-expanded="String(isMobileMenuOpen)"
              aria-controls="mobile-panel"
              :aria-label="siteConfig.ui.menuButtonLabel"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <span class="nav-toggle-text">Menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div id="mobile-panel" class="mobile-panel" :data-open="String(isMobileMenuOpen)">
          <div class="mobile-panel-inner">
            <nav class="mobile-menu" :aria-label="siteConfig.ui.mobileNavAriaLabel">
              <a
                v-for="item in navItems"
                :key="`${item.href}-mobile`"
                :href="item.href"
                @click="isMobileMenuOpen = false"
              >
                <span class="mobile-nav-label">{{ item.label }}</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main id="main-content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <div class="frame footer-bar">
        <div class="footer-main">
          <div class="footer-brand-block">
            <p class="brand-name footer-brand">{{ siteConfig.footer.brand }}</p>
            <p class="footer-text">{{ siteConfig.footer.text }}</p>
          </div>
          <div class="footer-socials">
            <a :href="siteConfig.footer.social.instagram" target="_blank" rel="noreferrer" :aria-label="siteConfig.ui.socialLabels.instagram" class="footer-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M12 2.2c2.7 0 3 0 4 .1 1 0 1.6.2 2 .4.5.2.8.5 1.1.9.3.4.6.7.9 1.1.4.5.5 1.1.6 2 .1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.6-.4 2-.2.5-.5.8-.9 1.1-.4.3-.7.6-1.1.9-.5.4-1.1.5-2 .6-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.6-.2-2-.4-.5-.2-.8-.5-1.1-.9-.3-.4-.6-.7-.9-1.1-.4-.5-.5-1.1-.6-2-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.6.4-2 .2-.5.5-.8.9-1.1.4-.3.7-.6 1.1-.9.5-.4 1.1-.5 2-.6 1-.1 1.3-.1 4-.1M12 0C8.7 0 8.3 0 7 .1c-1.3 0-2.2.2-3 .6C3.5 1 2.8 1.3 2.1 2 1.5 2.7 1.2 3.4 1 4.2c-.4.8-.6 1.7-.6 3C0 8.3 0 8.7 0 12s0 3.7.1 5.3c0 1.3.2 2.2.6 3 .3.7.6 1.4 1.1 2 .7.7 1.4 1 2.2 1.2.8.4 1.7.6 3 .6C8.3 24 8.7 24 12 24s3.7 0 5.3-.1c1.3 0 2.2-.2 3-.6.7-.3 1.4-.6 2-1.1.7-.7 1-1.4 1.2-2.2.4-.8.6-1.7.6-3 .1-1.6.1-2 .1-5.3s0-3.7-.1-5.3c0-1.3-.2-2.2-.6-3-.3-.7-.6-1.4-1.1-2-.7-.7-1.4-1-2.2-1.2-.8-.4-1.7-.6-3-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.5a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>
            </a>
            <a :href="siteConfig.footer.social.linkedin" target="_blank" rel="noreferrer" :aria-label="siteConfig.ui.socialLabels.linkedin" class="footer-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a :href="siteConfig.footer.social.youtube" target="_blank" rel="noreferrer" :aria-label="siteConfig.ui.socialLabels.youtube" class="footer-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C20 3.5 12 3.5 12 3.5s-8 0-9.5.6c-1.1.3-1.8 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.2 1 1 1.8 2 2.1 1.5.6 7.5.6 7.5.6s8 0 9.5-.6c1.1-.3 1.8-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            </a>
            <a :href="siteConfig.footer.social.facebook" target="_blank" rel="noreferrer" :aria-label="siteConfig.ui.socialLabels.facebook" class="footer-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M24 12c0-6.6-5.4-12-12-12S0 5.4 0 12c0 6 4.4 11 10.1 11.9v-8.4H6.9v-3.5h3.2V9.3c0-3.1 1.8-4.8 4.6-4.8 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.8v2.3h3.3l-.5 3.5H15l-.1 8.4C19.6 23 24 18 24 12z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-meta">
          <a :href="siteConfig.footer.bamFestival.url" target="_blank" rel="noreferrer" class="footer-bam-link">{{ siteConfig.footer.bamFestival.name }}</a>
          <span class="footer-address">{{ siteConfig.footer.bamFestival.address }}</span>
          <span class="footer-address">{{ siteConfig.footer.address }}</span>
          <a :href="siteConfig.links.route" target="_blank" rel="noreferrer">Route</a>
          <a
            v-for="link in footerLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.label }}
          </a>
          <a href="#top">{{ siteConfig.ui.backToTopLabel }}</a>
        </div>
      </div>
    </footer>

    <ClientOnly>
      <CookieControl v-if="isClientReady" locale="nl" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--surface-glass-dark);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-glass-dark);
}

.site-header::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.34rem;
  background: linear-gradient(90deg, var(--page-yellow) 0%, var(--page-orange) 30%, var(--page-red) 62%, var(--page-burgundy) 100%);
  opacity: 0.82;
}

.site-header.is-scrolled {
  background: var(--surface-glass-dark-strong);
  border-bottom-color: rgba(253, 250, 251, 0.2);
  box-shadow: var(--shadow-glass);
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  min-height: 4.15rem;
  padding-block: 0.45rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-inline: auto 0;
}

.main-nav {
  display: none;
}

@media (min-width: 48rem) {
  .header-row {
    justify-content: center;
  }

  .header-actions {
    margin-inline: 0;
  }

  .main-nav-shell {
    position: relative;
    display: block;
    padding: 0.4rem 0.52rem;
    border-radius: 1.2rem;
    background: var(--surface-glass-dark);
    border: 1px solid var(--border-glass-dark);
    box-shadow: var(--shadow-glass);
    overflow: hidden;
  }

  .main-nav-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--surface-glass-dark-highlight);
    pointer-events: none;
  }

  .main-nav {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }

  .main-nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    height: 2.5rem;
    padding: 0.58rem 0.88rem;
    border-radius: 0.85rem;
    color: var(--page-white);
    text-decoration: none;
    background: var(--surface-glass-light);
    border: 1px solid rgba(253, 250, 251, 0.1);
    box-shadow: inset 0 1px 0 rgba(253, 250, 251, 0.08);
    transition: transform 220ms var(--ease-out-quint), background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  }

  .main-nav a:hover,
  .main-nav a:focus-visible {
    transform: translateY(-2px) rotate(-1deg);
    background: var(--surface-glass-light-strong);
    border-color: rgba(248, 190, 5, 0.42);
    box-shadow: 0 12px 24px rgba(18, 2, 6, 0.18), inset 0 1px 0 rgba(253, 250, 251, 0.14);
  }
}

.nav-label {
  display: block;
  font-family: 'Saira Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-width: 3rem;
  min-height: 3rem;
  height: 3rem;
  padding-inline: 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(253, 250, 251, 0.18);
  background: var(--surface-glass-dark);
  color: var(--page-white);
  box-shadow: 0 10px 24px rgba(18, 2, 6, 0.12);
  cursor: pointer;
  transition: transform 220ms var(--ease-out-quint), box-shadow 220ms var(--ease-out-quint), background-color 220ms var(--ease-out-quint);
}

.nav-toggle-text {
  font-family: 'Saira Condensed', sans-serif;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-toggle svg {
  width: 1.4rem;
  height: 1.4rem;
  transition: transform 220ms var(--ease-out-quint);
}

.nav-toggle:hover,
.nav-toggle:focus-visible {
  transform: translateY(-1px) rotate(-2deg);
  box-shadow: var(--shadow-glass-strong);
}

.nav-toggle[aria-expanded="true"] {
  background: var(--surface-glass-dark-strong);
}

.nav-toggle[aria-expanded="true"] svg {
  transform: rotate(90deg) scale(0.96);
}

@media (min-width: 48rem) {
  .nav-toggle {
    display: none;
  }
}

.mobile-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-0.35rem);
  transform-origin: top;
  transition: grid-template-rows 280ms var(--ease-out-quint), opacity 180ms var(--ease-out-quart), transform 220ms var(--ease-out-quart), visibility 0ms linear 220ms;
}

.mobile-panel[data-open="true"] {
  grid-template-rows: 1fr;
  visibility: visible;
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0ms;
}

.mobile-panel-inner {
  overflow: hidden;
  border-top: 1px solid rgba(253, 250, 251, 0.12);
  padding-top: 0.35rem;
}

.mobile-menu {
  display: grid;
  gap: 0.7rem;
  padding: 0.95rem 0 1rem;
}

.mobile-menu a {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.8rem;
  border-radius: 1.15rem;
  padding: 1rem 1rem 1rem 1.15rem;
  text-decoration: none;
  color: var(--page-white);
  background: var(--surface-glass-dark);
  border: 1px solid var(--border-glass-dark);
  opacity: 0;
  transform: translateY(-0.45rem);
  transition: transform 240ms var(--ease-out-quart), opacity 180ms var(--ease-out-quart), background-color 220ms var(--ease-out-quint), border-color 220ms var(--ease-out-quint);
}

.mobile-menu a::before {
  content: "";
  position: absolute;
  top: 0.6rem;
  bottom: 0.6rem;
  left: 0.55rem;
  width: 0.28rem;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--page-yellow) 0%, var(--page-orange) 50%, var(--page-red) 100%);
}

.mobile-nav-label {
  font-family: 'Saira Condensed', sans-serif;
  font-size: 1.16rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.mobile-panel[data-open="true"] .mobile-menu a {
  opacity: 1;
  transform: translateY(0);
}

.mobile-panel[data-open="true"] .mobile-menu a:nth-child(1) { transition-delay: 40ms; }
.mobile-panel[data-open="true"] .mobile-menu a:nth-child(2) { transition-delay: 80ms; }
.mobile-panel[data-open="true"] .mobile-menu a:nth-child(3) { transition-delay: 120ms; }
.mobile-panel[data-open="true"] .mobile-menu a:nth-child(4) { transition-delay: 160ms; }
.mobile-panel[data-open="true"] .mobile-menu a:nth-child(5) { transition-delay: 200ms; }

.mobile-menu a:hover,
.mobile-menu a:focus-visible {
  transform: translateY(-2px) translateX(0.1rem);
  background: var(--surface-glass-dark-strong);
}

.footer {
  position: relative;
  overflow: hidden;
  padding: 2.5rem 0 3rem;
  color: rgba(253, 250, 251, 0.86);
  background: linear-gradient(180deg, rgba(18, 2, 6, 0) 0%, rgba(18, 2, 6, 0.85) 16%, var(--page-dark) 100%);
}

.footer::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 14% 24%, rgba(248, 190, 5, 0.12), transparent 18%),
    radial-gradient(circle at 82% 18%, rgba(198, 33, 68, 0.16), transparent 24%);
  pointer-events: none;
}

.footer-bar {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(253, 250, 251, 0.16);
}

.footer a {
  color: var(--page-white);
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.3rem 0;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.15em;
  transition: color 200ms ease;
}

.footer a:hover,
.footer a:focus-visible {
  color: var(--page-yellow);
}

.footer-main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .footer-main {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.footer-brand-block {
  display: grid;
  gap: 0.5rem;
}

.footer-brand {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
}

.footer-text {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(253, 250, 251, 0.72);
  line-height: 1.5;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(253, 250, 251, 0.08);
  border: 1px solid rgba(253, 250, 251, 0.14);
  transition: transform 220ms var(--ease-out-quint), background-color 220ms ease;
}

.footer-social-link:hover,
.footer-social-link:focus-visible {
  transform: translateY(-2px) scale(1.06);
  background: rgba(248, 190, 5, 0.16);
  border-color: var(--page-yellow);
}

.footer-social-link .social-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  align-items: center;
  font-size: 0.85rem;
}

.footer-meta a {
  min-width: 2.75rem;
  padding-inline: 0.25rem;
}

.footer-bam-link {
  font-weight: 700;
}

.footer-address {
  color: rgba(253, 250, 251, 0.6);
  font-size: 0.8rem;
}

@media (max-width: 30rem) {
  .footer-address {
    width: 100%;
  }
}
</style>

<style>
.cookieControl__ControlButton {
  right: 0.85rem;
  bottom: 0.85rem;
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  min-height: 3rem;
  opacity: 0.48;
  box-shadow: 0 8px 18px rgba(18, 2, 6, 0.12);
  backdrop-filter: blur(10px);
  transform: scale(0.92);
}

.cookieControl__ControlButton svg {
  max-width: 1.15rem;
  min-width: 1.15rem;
  max-height: 1.15rem;
  min-height: 1.15rem;
}

.cookieControl__ControlButton:hover,
.cookieControl__ControlButton:focus-visible {
  opacity: 0.78;
  transform: scale(1);
}

@media (min-width: 48rem) {
  .cookieControl__ControlButton {
    right: 1rem;
    bottom: 1rem;
    opacity: 0.42;
  }
}
</style>
