<script setup lang="ts">
const { artists } = useArtists()

useSeoMeta({
  title: 'Bammetje 2026 | Gratis mini-editie van BAM! Festival in Hengelo',
  ogTitle: 'Bammetje 2026 | Gratis mini-editie van BAM! Festival in Hengelo',
  description: 'Bammetje is de gratis mini-editie van BAM! Festival op zaterdag 23 mei 2026 bij Broedplaats Oogst in Hengelo. Bekijk de sfeer, praktische info en updates.',
  ogDescription: 'Klein, maar BAM. Op zaterdag 23 mei 2026 strijkt Bammetje neer bij Broedplaats Oogst in Hengelo.',
  ogImage: 'https://bammetje.bamfestival.nl/assets/hero/bammetje-header-1440.webp',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="frame">
        <div class="header-row">
          <NuxtLink to="/" class="brand-link">
            <img
              class="brand-mark"
              src="/assets/favicons/logo-192.png"
              alt="Bammetje logo"
              width="192"
              height="192"
            />
            <div>
              <p class="brand-name">Bammetje</p>
              <p class="brand-note">23 mei 2026 • Hengelo</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main id="main-content">
      <section class="hero" id="top">
        <div class="hero-banner">
          <picture>
            <source
              type="image/webp"
              srcset="
                /assets/hero/bammetje-header-640.webp 640w,
                /assets/hero/bammetje-header-960.webp 960w,
                /assets/hero/bammetje-header-1440.webp 1440w,
                /assets/hero/bammetje-header-1920.webp 1920w
              "
              sizes="100vw"
            />
            <NuxtImg
              src="/assets/hero/bammetje-header-1440.jpg"
              srcset="
                /assets/hero/bammetje-header-640.jpg 640w,
                /assets/hero/bammetje-header-960.jpg 960w,
                /assets/hero/bammetje-header-1440.jpg 1440w,
                /assets/hero/bammetje-header-1920.jpg 1920w
              "
              sizes="100vw"
              alt="Bammetje headerbeeld voor de mini-editie van BAM! Festival"
              width="1920"
              height="1004"
              fetchpriority="high"
            />
          </picture>
        </div>
        <div class="frame hero-inner hero-grid">
          <div class="hero-copy">
            <span class="eyebrow eyebrow-dark"><span class="dot" aria-hidden="true"></span> Mini BAM, maximale vibe</span>
            <div class="hero-title-wrap">
              <p class="eyebrow eyebrow-light">Gratis mini-editie van BAM! Festival</p>
              <h1 class="hero-title">Bammetje</h1>
              <p class="hero-subtitle">
                Klein, maar BAM. Op zaterdag 23 mei 2026 landt de mini-editie van BAM! Festival bij Broedplaats Oogst in Hengelo:
                gratis muziek, warme sfeer en een dag die voelt als een compacte uitbarsting van alles waar BAM voor staat.
              </p>
              <div class="hero-actions">
                <a class="action-button action-button-primary" href="#line-up">Bekijk line-up</a>
                <a class="action-button action-button-secondary" href="#info">Praktische info</a>
              </div>
              <div class="hero-strip" aria-label="Belangrijkste evenementdetails">
                <div class="hero-strip-item">
                  <strong>23 mei</strong>
                  <span>Zaterdag in 2026</span>
                </div>
                <div class="hero-strip-item">
                  <strong>Gratis</strong>
                  <span>Kom langs zonder ticketstress</span>
                </div>
                <div class="hero-strip-item">
                  <strong>Oogst</strong>
                  <span>Broedplaats in Hengelo</span>
                </div>
              </div>
            </div>
          </div>
          <aside class="ticket-card hero-ticket" id="gratis-entree" aria-label="Kerninformatie Bammetje">
            <span class="eyebrow eyebrow-light">Gratis entree</span>
            <strong>Oogst<br />Hengelo</strong>
            <p class="section-text hero-ticket-text">
              Van middag tot avond, met ruimte voor muziek, drinken en die herkenbare BAM-sfeer in een compactere vorm.
            </p>
          </aside>
        </div>
      </section>

      <section class="section story-band">
        <div class="frame story-layout">
          <div class="story-quote">
            <span class="eyebrow eyebrow-dark">Waarom Bammetje</span>
            <p>
              BAM! Festival kan in 2026 niet neerstrijken in het Prins Bernhardplantsoen, maar stil blijft het niet.
              Vanuit liefde voor muziek, organiseren en vrijwilligersenergie komt er een kleinere editie op Oogst.
            </p>
          </div>
          <div class="story-points">
            <div class="story-point">
              <span class="dot" aria-hidden="true"></span>
              <div>
                <strong>Geen vervanging, wel dezelfde geest</strong>
                <p>Bammetje is bewust kleiner dan het festival in het park, maar moet dezelfde open, warme en lokale energie vasthouden.</p>
              </div>
            </div>
            <div class="story-point">
              <span class="dot" aria-hidden="true"></span>
              <div>
                <strong>Gebouwd voor Hengelo en Twente</strong>
                <p>De site moet snel duidelijk maken dat dit een gratis, toegankelijke festivaldag is voor het lokale publiek dat BAM mist.</p>
              </div>
            </div>
            <div class="story-point">
              <span class="dot" aria-hidden="true"></span>
              <div>
                <strong>Compact in info, rijk in sfeer</strong>
                <p>Niet volstoppen met details. Eerst gevoel, dan de praktische zekerheid om gewoon te komen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="line-up">
        <div class="frame">
          <div class="section-intro">
            <span class="eyebrow eyebrow-light">Line-up</span>
            <h2 class="section-title">Drie podia. Zeven namen. Meteen overzicht.</h2>
            <p class="section-text">
              De eerste indeling staat nu vast: de grotere namen op het Hoofdpodium, de dj's in de Tommy-Loods en de andere acts in De Tent.
              Zo voelt de line-up niet alleen levendiger, maar ook meteen logisch voor bezoekers.
            </p>
          </div>

          <div class="artist-grid">
            <ArtistCard
              v-for="artist in artists"
              :key="artist.name"
              :artist="artist"
            />
          </div>
        </div>
      </section>

      <section class="section" id="timetable">
        <div class="frame">
          <div class="section-intro">
            <span class="eyebrow eyebrow-light">Timetable</span>
            <h2 class="section-title">Podia nu. Speeltijden straks.</h2>
            <p class="section-text">
              De precieze programmering komt later. Daarom staat hier geen verzonnen tijdschema, maar wel een heldere podiumindeling die straks direct naar echte speeltijden kan worden vertaald.
            </p>
          </div>

          <div class="timetable">
            <article class="time-block time-block-main">
              <div class="time-block-top">
                <div class="time-label">Hoofdpodium</div>
                <div class="time-tag">Grotere namen</div>
              </div>
              <ul>
                <li><span class="time-stage">Bevestigd</span><span>André Manuel</span></li>
                <li><span class="time-stage">Bevestigd</span><span>IDA</span></li>
              </ul>
              <p class="time-note">Dit podium draagt de grotere publieksmomenten. Speeltijden volgen zodra het schema rond is.</p>
            </article>

            <article class="time-block time-block-tent">
              <div class="time-block-top">
                <div class="time-label">De Tent</div>
                <div class="time-tag">Live en dichtbij</div>
              </div>
              <ul>
                <li><span class="time-stage">Bevestigd</span><span>Post Ella</span></li>
                <li><span class="time-stage">Bevestigd</span><span>Lenny Monsou</span></li>
                <li><span class="time-stage">Bevestigd</span><span>Lézard</span></li>
              </ul>
              <p class="time-note">De Tent is voor de andere liveacts: intiemer, directer en perfect voor een compactere setting.</p>
            </article>

            <article class="time-block time-block-loft">
              <div class="time-block-top">
                <div class="time-label">Tommy-Loods</div>
                <div class="time-tag">Dj-hoek</div>
              </div>
              <ul>
                <li><span class="time-stage">Bevestigd</span><span>Yo That's Shit</span></li>
                <li><span class="time-stage">Bevestigd</span><span>Mørssync & Sabossi</span></li>
              </ul>
              <p class="time-note">De dj's zitten hier samen. Zodra de tijden bekend zijn, kan dit blok direct een echte timetable worden.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section" id="info">
        <div class="frame">
          <div class="section-intro">
            <span class="eyebrow eyebrow-light">Info</span>
            <h2 class="section-title">Snel snappen. Dan gewoon komen.</h2>
            <p class="section-text">
              Dit is de kern voor bezoekers uit Hengelo en Twente: waar het is, wanneer het begint en waarom je geen drempel hebt om langs te gaan.
            </p>
          </div>

          <div class="info-grid">
            <div class="info-stack">
              <dl class="info-card">
                <dt>Datum</dt>
                <dd>23 mei 2026</dd>
                <dd>Zaterdag, midden in het voorjaar. Klaar om buiten weer BAM-gevoel op te bouwen.</dd>
              </dl>
              <dl class="info-card">
                <dt>Tijd</dt>
                <dd>14:00 – 23:00</dd>
                <dd>Van middag tot avond, compact genoeg om overzichtelijk te blijven en lang genoeg om echt sfeer te maken.</dd>
              </dl>
              <dl class="info-card">
                <dt>Toegang</dt>
                <dd>Gratis</dd>
                <dd>Geen ticket nodig. Gewoon komen, aansluiten en genieten van muziek en een drankje.</dd>
              </dl>
            </div>

            <section class="location-panel" id="locatie" aria-labelledby="locatie_title">
              <span class="eyebrow eyebrow-dark">Locatie</span>
              <h2 class="section-title location-title" id="locatie_title">Broedplaats Oogst</h2>
              <p>
                Bammetje landt bij Oogst in Hengelo. Verwacht geen exacte kopie van BAM! Festival in het park, maar een kleinere setting met dezelfde liefde voor livemuziek,
                ontmoeting en lokale energie.
              </p>
              <address class="location-address">
                Esrein 53<br />
                7553 CX Hengelo
              </address>
              <div class="location-map">
                <ClientOnly>
                  <LMap
                    ref="map"
                    :zoom="15"
                    :center="[52.2621, 6.7937]"
                    :use-global-leaflet="false"
                  >
                    <LTileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <LMarker :lat-lng="[52.2621, 6.7937]">
                      <LPopup>
                        <div class="map-popup">
                          <strong>Broedplaats Oogst</strong><br />
                          Esrein 53, Hengelo
                        </div>
                      </LPopup>
                    </LMarker>
                  </LMap>
                </ClientOnly>
              </div>
              <div class="location-links">
                <a class="action-button action-button-primary" href="https://www.google.com/maps/search/?api=1&query=Broedplaats+Oogst+Hengelo" target="_blank" rel="noreferrer">Route openen</a>
                <a class="action-button action-button-secondary" href="https://www.bamfestival.nl/" target="_blank" rel="noreferrer">Bekijk BAM! Festival</a>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="frame">
          <div class="quote-ribbon">
            <p>
              "Samen genieten van livemuziek en een drankje. Dat is uiteindelijk waar BAM altijd om draait."
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="frame">
          <div class="light-panel sponsor-bar">
            <div>
              <span class="eyebrow eyebrow-light">Partners</span>
              <h2 class="section-title section-title-tight">Lokaal gedragen.</h2>
              <p class="section-text section-text-push">
                Bammetje voelt sterker als partners en stad zichtbaar meedoen. Deze strook houdt de uiting compact, warm en duidelijk herkenbaar.
              </p>
            </div>
            <div class="sponsor-logos">
              <a href="https://www.hengelo.nl/" target="_blank" rel="noreferrer" class="sponsor-logo">
                <NuxtImg
                  src="/assets/logos/gemeente-hengelo-640.webp"
                  alt="Logo van Gemeente Hengelo"
                  width="640"
                  height="238"
                  loading="lazy"
                />
              </a>
              <a href="https://www.hartvanzuid.nl/" target="_blank" rel="noreferrer" class="sponsor-logo">
                <NuxtImg
                  src="/assets/logos/hart-van-zuid-640.webp"
                  alt="Logo van Hart van Zuid"
                  width="640"
                  height="238"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="frame footer-bar">
        <div>
          <p class="brand-name footer-brand">Bammetje</p>
          <p class="footer-text">
            De mini-editie van BAM! Festival voor Hengelo en Twente. Gratis, warm en klaar om in 2026 even flink uit te pakken.
          </p>
        </div>
        <div class="footer-meta">
          <a href="https://www.bamfestival.nl/" target="_blank" rel="noreferrer">BAM! Festival</a>
          <a href="https://www.google.com/maps/search/?api=1&query=Broedplaats+Oogst+Hengelo" target="_blank" rel="noreferrer">Route</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --page-ink: #22161a;
  --page-soft-ink: #51383e;
  --page-surface: #fcf4ef;
  --page-surface-warm: #f7e9dc;
  --page-panel: rgba(253, 250, 251, 0.82);
  --page-dark: #120206;
  --page-burgundy: #530a1d;
  --page-red-dark: #921234;
  --page-red: #c62144;
  --page-orange: #e26426;
  --page-yellow: #f8be05;
  --page-white: #fdfafb;
  --page-soft-white: rgba(253, 250, 251, 0.84);
  --page-soft-white-border: rgba(253, 250, 251, 0.14);
  --page-soft-dark: rgba(18, 2, 6, 0.68);
  --page-header-surface: rgba(83, 10, 29, 0.72);
  --page-accent-ring: rgba(248, 190, 5, 0.18);
  --page-blob-orange: rgba(226, 100, 38, 0.26);
  --page-blob-red: rgba(198, 33, 68, 0.2);
  --page-panel-border: rgba(83, 10, 29, 0.1);
  --page-chip-surface: rgba(253, 250, 251, 0.12);
  --page-shadow: 0 20px 70px rgba(83, 10, 29, 0.14);
  --page-gradient: linear-gradient(135deg, #530a1d 0%, #921234 35%, #c62144 55%, #e26426 80%, #f8be05 100%);
  --page-story-gradient: linear-gradient(180deg, #25040d 0%, #530a1d 28%, #6d0d27 52%, #8c1233 70%, #5a0a1f 100%);
  --page-location-gradient: linear-gradient(160deg, #2a0610 0%, #530a1d 34%, #7b112c 62%, #e26426 100%);
  --page-footer-gradient: linear-gradient(180deg, rgba(18, 2, 6, 0) 0%, rgba(18, 2, 6, 0.85) 16%, #120206 100%);
  --page-hero-card-gradient: 
    radial-gradient(circle at 82% 18%, rgba(248, 190, 5, 0.28), transparent 16%),
    radial-gradient(circle at 18% 16%, rgba(216, 151, 156, 0.24), transparent 12%),
    radial-gradient(circle at 75% 65%, rgba(226, 100, 38, 0.28), transparent 26%),
    linear-gradient(125deg, rgba(18, 2, 6, 0.88) 4%, rgba(83, 10, 29, 0.9) 24%, rgba(146, 18, 52, 0.92) 46%, rgba(198, 33, 68, 0.92) 64%, rgba(226, 100, 38, 0.92) 82%, rgba(248, 190, 5, 0.88) 100%);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --section-gap: clamp(4rem, 7vw, 8rem);
  --container-pad: clamp(1.25rem, 3vw, 2rem);

  color-scheme: dark light;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  font-family: 'Instrument Sans', sans-serif;
  color: var(--page-ink);
  background:
    radial-gradient(circle at 10% 10%, rgba(248, 190, 5, 0.16), transparent 22%),
    radial-gradient(circle at 90% 15%, rgba(198, 33, 68, 0.15), transparent 18%),
    linear-gradient(180deg, #fff6ec 0%, #fff1eb 26%, #fff7f2 52%, #fff1dd 100%);
}

img {
  display: block;
  max-width: 100%;
}

a,
button {
  transition:
    transform 220ms var(--ease-out-quint),
    background-color 220ms var(--ease-out-quint),
    border-color 220ms var(--ease-out-quint),
    color 220ms var(--ease-out-quint),
    opacity 220ms var(--ease-out-quint),
    box-shadow 220ms var(--ease-out-quint);
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  border-radius: 999px;
  background: var(--page-white);
  color: var(--page-dark);
  padding: 0.9rem 1.2rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: var(--page-shadow);
}

.skip-link:focus {
  top: 1rem;
}

.site-shell {
  position: relative;
  overflow: clip;
}

.site-shell::before,
.site-shell::after {
  content: "";
  position: fixed;
  inset: auto;
  z-index: -1;
  pointer-events: none;
  filter: blur(40px);
  opacity: 0.6;
}

.site-shell::before {
  top: 8rem;
  left: -4rem;
  width: 15rem;
  height: 15rem;
  border-radius: 42% 58% 49% 51% / 57% 38% 62% 43%;
  background: var(--page-blob-orange);
  animation: float_blob_a 14s ease-in-out infinite;
}

.site-shell::after {
  right: -5rem;
  top: 28rem;
  width: 18rem;
  height: 18rem;
  border-radius: 63% 37% 40% 60% / 47% 59% 41% 53%;
  background: var(--page-blob-red);
  animation: float_blob_b 18s ease-in-out infinite;
}

@keyframes float_blob_a {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(1rem, 1.25rem, 0) rotate(8deg);
  }
}

@keyframes float_blob_b {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(-1rem, -1rem, 0) rotate(-8deg);
  }
}

.frame {
  width: min(100%, 76rem);
  margin-inline: auto;
  padding-inline: var(--container-pad);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1;
}

.eyebrow-light {
  background: var(--page-soft-white);
  color: #6c1830;
  border: 1px solid rgba(108, 24, 48, 0.12);
}

.eyebrow-dark {
  background: var(--page-soft-dark);
  color: var(--page-white);
  border: 1px solid var(--page-soft-white-border);
}

.dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: var(--page-yellow);
  box-shadow: 0 0 0 0.2rem var(--page-accent-ring);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(18px);
  background: var(--page-header-surface);
  border-bottom: 1px solid var(--page-soft-white-border);
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.75rem;
  padding-block: 0.8rem;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
  text-decoration: none;
  color: var(--page-white);
}

.brand-mark {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1.1rem;
  padding: 0.35rem;
  background: rgba(253, 250, 251, 0.94);
  box-shadow: 0 14px 34px rgba(18, 2, 6, 0.18);
  transform-origin: center;
}

.brand-name {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: 1.7rem;
  line-height: 0.88;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.brand-note {
  margin: 0.12rem 0 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(253, 250, 251, 0.74);
}

.hero {
  position: relative;
  padding-bottom: var(--section-gap);
}

.hero-banner {
  position: relative;
  width: 100%;
  min-height: clamp(16rem, 42vw, 34rem);
  overflow: clip;
  background: #2a0610;
  box-shadow: var(--page-shadow);
}

.hero-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 2, 6, 0.08) 0%, rgba(18, 2, 6, 0.22) 32%, rgba(18, 2, 6, 0.52) 100%);
  pointer-events: none;
}

.hero-banner picture,
.hero-banner img {
  width: 100%;
  height: 100%;
}

.hero-banner img {
  object-fit: cover;
  object-position: center;
}

.hero-inner {
  margin-top: clamp(-2.8rem, -4vw, -2rem);
  position: relative;
  z-index: 1;
}

.hero-grid {
  display: grid;
  gap: 2rem;
  align-items: start;
}

.hero-copy {
  position: relative;
  z-index: 1;
}

.hero-title-wrap {
  position: relative;
  padding: clamp(1.8rem, 3vw, 2.6rem);
  border-radius: clamp(1.8rem, 3vw, 2.8rem);
  overflow: clip;
  box-shadow: var(--page-shadow);
  background: var(--page-hero-card-gradient);
  transform-origin: 20% 20%;
}

.hero-title-wrap::after {
  content: "";
  position: absolute;
  inset: 1rem;
  border-radius: clamp(1.1rem, 2vw, 2rem);
  border: 1px solid rgba(253, 250, 251, 0.16);
  pointer-events: none;
}

.hero-title {
  margin: 1rem 0 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(4.2rem, 15vw, 9rem);
  line-height: 0.82;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #fdfafb;
  text-wrap: balance;
}

.hero-subtitle {
  max-width: 34rem;
  margin: 1.1rem 0 0;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.65;
  color: rgba(253, 250, 251, 0.9);
  text-wrap: pretty;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.6rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 3.4rem;
  padding: 0.95rem 1.35rem;
  border-radius: 999px;
  border: 1px solid transparent;
  text-decoration: none;
  font-weight: 800;
  line-height: 1;
  position: relative;
  overflow: clip;
}

.action-button-primary {
  background: #f8be05;
  color: #120206;
  box-shadow: 0 16px 40px rgba(248, 190, 5, 0.28);
}

.action-button-primary:hover,
.action-button-primary:focus-visible {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 20px 44px rgba(248, 190, 5, 0.32);
}

.action-button-secondary {
  border-color: rgba(253, 250, 251, 0.2);
  color: #fdfafb;
  background: rgba(253, 250, 251, 0.1);
}

.action-button-secondary:hover,
.action-button-secondary:focus-visible {
  transform: translateY(-2px);
  background: rgba(253, 250, 251, 0.16);
}

.action-button:active {
  transform: scale(0.97);
}

.hero-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.3rem;
}

.hero-strip-item {
  padding: 0.95rem 1rem;
  border-radius: 1.25rem;
  background: var(--page-chip-surface);
  border: 1px solid rgba(253, 250, 251, 0.12);
  color: #fdfafb;
}

.hero-strip-item strong {
  display: block;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-strip-item span {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.88rem;
  line-height: 1.4;
  color: rgba(253, 250, 251, 0.82);
}

.ticket-card {
  width: 100%;
  max-width: 24rem;
  padding: 1.35rem;
  border-radius: 1.8rem;
  background: rgba(253, 250, 251, 0.92);
  color: var(--page-ink);
  box-shadow: var(--page-shadow);
  transform: rotate(-2deg);
}

.ticket-card strong {
  display: block;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(2rem, 7vw, 2.9rem);
  line-height: 0.9;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.section {
  padding-block: var(--section-gap);
}

.section-intro {
  display: grid;
  gap: 0.9rem;
  margin-bottom: clamp(1.8rem, 4vw, 3rem);
}

.section-title {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(2.8rem, 8vw, 5rem);
  line-height: 0.88;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-wrap: balance;
}

.section-text {
  max-width: 42rem;
  margin: 0;
  font-size: 1.04rem;
  line-height: 1.75;
  color: var(--page-soft-ink);
  text-wrap: pretty;
}

.story-band {
  position: relative;
  color: #fdfafb;
  background:
    radial-gradient(circle at 12% 18%, rgba(248, 190, 5, 0.18), transparent 12%),
    radial-gradient(circle at 88% 24%, rgba(216, 151, 156, 0.16), transparent 12%),
    var(--page-story-gradient);
}

.story-layout {
  display: grid;
  gap: 1rem;
}

.story-quote {
  position: relative;
  padding: clamp(1.4rem, 3vw, 2rem);
  border-radius: 1.6rem;
  background: rgba(253, 250, 251, 0.08);
  border: 1px solid rgba(253, 250, 251, 0.12);
}

.story-quote p {
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.6;
  color: rgba(253, 250, 251, 0.94);
}

.story-points {
  display: grid;
  gap: 0.9rem;
}

.story-point {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(253, 250, 251, 0.14);
}

.story-point:last-child {
  border-bottom: 0;
}

.story-point strong {
  display: block;
  font-size: 1rem;
  line-height: 1.35;
  color: #fdfafb;
}

.story-point p {
  margin: 0.2rem 0 0;
  color: rgba(253, 250, 251, 0.8);
  line-height: 1.6;
}

.artist-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .hero-grid,
  .story-layout,
  .info-grid,
  .footer-bar {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .hero-copy {
    grid-column: span 8;
  }

  .hero-ticket {
    grid-column: span 4;
    justify-self: end;
    align-self: end;
  }

  .story-quote {
    grid-column: span 5;
  }

  .story-points {
    grid-column: span 7;
  }

  .artist-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .timetable {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .info-stack {
    grid-column: span 5;
  }

  .location-panel {
    grid-column: span 7;
  }

  .sponsor-bar {
    grid-template-columns: 1.2fr 1fr;
  }

  .footer-bar > :first-child {
    grid-column: span 6;
  }

  .footer-bar > :last-child {
    grid-column: span 6;
    justify-self: end;
  }
}

@media (min-width: 64rem) {
  .artist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.timetable {
  display: grid;
  gap: 1rem;
}

.time-block {
  padding: 1.15rem;
  border-radius: 1.4rem;
  background: rgba(253, 250, 251, 0.84);
  border: 1px solid var(--page-panel-border);
}

.time-block-main {
  border-top: 0.35rem solid var(--page-red);
}

.time-block-tent {
  border-top: 0.35rem solid var(--page-orange);
}

.time-block-loft {
  border-top: 0.35rem solid var(--page-yellow);
}

.time-block-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
}

.time-label {
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--page-burgundy);
}

.time-tag {
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: rgba(83, 10, 29, 0.08);
  color: var(--page-burgundy);
}

.time-block ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.7rem;
}

.time-block li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.7rem;
  align-items: start;
  line-height: 1.55;
}

.time-stage {
  min-width: 5.4rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--page-red-dark);
}

.time-note {
  margin-top: 1rem;
  padding-top: 0.95rem;
  border-top: 1px solid rgba(83, 10, 29, 0.1);
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--page-soft-ink);
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-stack {
  display: grid;
  gap: 1rem;
}

.info-card {
  padding: 1.25rem;
  border-radius: 1.5rem;
  background: rgba(253, 250, 251, 0.86);
  border: 1px solid var(--page-panel-border);
  box-shadow: var(--page-shadow);
}

.info-card dt {
  margin: 0;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--page-red-dark);
}

.info-card dd {
  margin: 0;
}

.info-card dd:first-of-type {
  margin: 0.55rem 0 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(2rem, 6vw, 3rem);
  line-height: 0.9;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--page-ink);
}

.info-card dd + dd {
  margin: 0.65rem 0 0;
  line-height: 1.65;
  color: var(--page-soft-ink);
}

.location-panel {
  position: relative;
  overflow: clip;
  padding: clamp(1.5rem, 3vw, 2.2rem);
  border-radius: clamp(1.8rem, 3vw, 2.4rem);
  color: #fdfafb;
  background:
    radial-gradient(circle at 22% 18%, rgba(248, 190, 5, 0.18), transparent 14%),
    radial-gradient(circle at 82% 74%, rgba(216, 151, 156, 0.2), transparent 20%),
    var(--page-location-gradient);
  box-shadow: var(--page-shadow);
}

.location-panel p {
  max-width: 33rem;
  line-height: 1.7;
  color: rgba(253, 250, 251, 0.86);
}

.location-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.4rem;
}

.location-title {
  margin-top: 0.85rem;
  color: var(--page-white);
}

.location-address {
  margin-top: 1rem;
  font-style: normal;
  font-family: 'Saira Condensed', sans-serif;
  font-size: 1.4rem;
  line-height: 1.4;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: rgba(253, 250, 251, 0.9);
}

.location-map {
  margin-top: 1.25rem;
  height: 220px;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(253, 250, 251, 0.14);
}

.location-map :deep(.leaflet-container) {
  width: 100%;
  height: 100%;
  background: #530a1d;
}

.map-popup {
  font-size: 0.9rem;
  line-height: 1.4;
}

.quote-ribbon {
  padding: 1.25rem 1.4rem;
  border-radius: 1.5rem;
  background: rgba(253, 250, 251, 0.74);
  border: 1px solid rgba(83, 10, 29, 0.08);
  box-shadow: var(--page-shadow);
}

.quote-ribbon p {
  margin: 0;
  font-size: clamp(1.05rem, 2vw, 1.24rem);
  line-height: 1.7;
  color: var(--page-ink);
}

.sponsor-bar {
  display: grid;
  gap: 1rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 1.4rem;
  background:
    radial-gradient(circle at 12% 18%, rgba(248, 190, 5, 0.09), transparent 18%),
    linear-gradient(180deg, rgba(253, 250, 251, 0.86) 0%, rgba(255, 246, 236, 0.96) 100%);
}

.sponsor-bar::after {
  content: "";
  position: absolute;
  right: -4rem;
  bottom: -4rem;
  width: 12rem;
  height: 12rem;
  border-radius: 999px;
  background:
    radial-gradient(circle, rgba(248, 190, 5, 0.24) 0%, rgba(248, 190, 5, 0.04) 48%, transparent 72%);
  pointer-events: none;
}

.section-title-tight {
  margin-top: 0.85rem;
}

.section-text-push {
  margin-top: 0.9rem;
}

.hero-ticket-text {
  margin-top: 0.7rem;
  max-width: none;
}

.sponsor-logos {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.sponsor-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6.5rem;
  padding: 1rem;
  border-radius: 1.25rem;
  background: rgba(253, 250, 251, 0.64);
  border: 1px solid rgba(83, 10, 29, 0.08);
}

.sponsor-logo:hover {
  transform: translateY(-3px);
  background: rgba(253, 250, 251, 0.8);
  box-shadow: 0 16px 36px rgba(83, 10, 29, 0.1);
}

.footer {
  position: relative;
  overflow: hidden;
  padding: 2rem 0 2.8rem;
  color: rgba(253, 250, 251, 0.86);
  background: var(--page-footer-gradient);
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
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(253, 250, 251, 0.16);
}

.footer a {
  color: #fdfafb;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.15em;
}

.footer-brand {
  font-size: 2rem;
  color: var(--page-white);
}

.footer-text {
  margin: 0.55rem 0 0;
  max-width: 34rem;
  line-height: 1.7;
  color: rgba(253, 250, 251, 0.76);
}

.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.2rem;
}

.light-panel {
  border-radius: clamp(1.6rem, 3vw, 2.4rem);
  background: var(--page-panel);
  border: 1px solid var(--page-panel-border);
  box-shadow: var(--page-shadow);
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid rgba(248, 190, 5, 0.92);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
</style>
