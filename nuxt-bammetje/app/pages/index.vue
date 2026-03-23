<script setup lang="ts">
const { siteConfig, getStageName } = useSite()
const { artists } = useArtists()
const { sponsors } = useSponsors()

useSeoMeta({
  title: siteConfig.value.title,
  ogTitle: siteConfig.value.title,
  description: siteConfig.value.meta.description,
  ogDescription: siteConfig.value.meta.ogDescription,
  ogImage: siteConfig.value.meta.ogImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-banner" aria-label="Headerbeeld van Bammetje">
      <NuxtImg
          src="/assets/hero/bammetje-header"
          alt="Bammetje headerbeeld voor de mini-editie van BAM! Festival"
          width="1920"
          height="1004"
          fetchpriority="high"
          format="webp"
          quality="85"
          sizes="100vw"
          preload
        />
    </div>
    <div class="frame hero-inner hero-grid">
      <div class="hero-copy">
        <span class="eyebrow eyebrow-dark"><span class="dot" aria-hidden="true"></span> Mini BAM, maximale vibe</span>
        <div class="hero-title-wrap">
          <p class="eyebrow eyebrow-dark">Gratis mini-editie van BAM! Festival</p>
          <h1 class="hero-title">Bammetje</h1>
          <p class="hero-subtitle">
            {{ siteConfig.subtitle }}
          </p>
          <div class="hero-actions">
            <a class="action-button action-button-primary" href="#line-up">Bekijk line-up</a>
            <a class="action-button action-button-secondary" href="#info">Praktische info</a>
          </div>
          <div class="hero-strip" aria-label="Belangrijkste evenementdetails">
            <div class="hero-strip-item">
              <strong>{{ siteConfig.eventDate }}</strong>
              <span>{{ siteConfig.eventDay }}. in 2026</span>
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
      <aside class="ticket-card hero-ticket" aria-label="Kerninformatie Bammetje">
        <span class="eyebrow eyebrow-light">{{ siteConfig.freeEntry.title }}</span>
        <strong>{{ siteConfig.freeEntry.location.replace(' / ', '\n') }}</strong>
        <p class="section-text hero-ticket-text">
          {{ siteConfig.freeEntry.description }}
        </p>
      </aside>
    </div>
  </section>

  <section class="section story-band">
    <div class="frame story-layout">
      <div class="story-quote">
        <span class="eyebrow eyebrow-dark">{{ siteConfig.about.title }}</span>
        <p>
          {{ siteConfig.about.intro }}
        </p>
      </div>
      <div class="story-points">
        <div
          v-for="point in siteConfig.about.points"
          :key="point.title"
          class="story-point"
        >
          <span class="dot" aria-hidden="true"/>
          <div>
            <strong>{{ point.title }}</strong>
            <p>{{ point.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="line-up" class="section">
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

  <section id="timetable" class="section">
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
            <div class="time-label">{{ getStageName('hoofdpodium') }}</div>
            <div class="time-tag">Grotere namen</div>
          </div>
          <ul>
            <li v-for="artist in artists.filter(a => a.stage === 'hoofdpodium')" :key="artist.name">
              <span class="time-stage">{{ artist.time || 'Bevestigd' }}</span>
              <span>{{ artist.name }}</span>
            </li>
          </ul>
          <p class="time-note">Dit podium draagt de grotere publieksmomenten. Speeltijden volgen zodra het schema rond is.</p>
        </article>

        <article class="time-block time-block-tent">
          <div class="time-block-top">
            <div class="time-label">{{ getStageName('de-tent') }}</div>
            <div class="time-tag">Live en dichtbij</div>
          </div>
          <ul>
            <li v-for="artist in artists.filter(a => a.stage === 'de-tent')" :key="artist.name">
              <span class="time-stage">{{ artist.time || 'Bevestigd' }}</span>
              <span>{{ artist.name }}</span>
            </li>
          </ul>
          <p class="time-note">De Tent is voor de andere liveacts: intiemer, directer en perfect voor een compactere setting.</p>
        </article>

        <article class="time-block time-block-loft">
          <div class="time-block-top">
            <div class="time-label">{{ getStageName('tommy-loods') }}</div>
            <div class="time-tag">Dj-hoek</div>
          </div>
          <ul>
            <li v-for="artist in artists.filter(a => a.stage === 'tommy-loods')" :key="artist.name">
              <span class="time-stage">{{ artist.time || 'Bevestigd' }}</span>
              <span>{{ artist.name }}</span>
            </li>
          </ul>
          <p class="time-note">De dj's zitten hier samen. Zodra de tijden bekend zijn, kan dit blok direct een echte timetable worden.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="info" class="section">
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
            <dd>{{ siteConfig.eventDate }} 2026</dd>
            <dd>{{ siteConfig.eventDay }}. Klaar om buiten weer BAM-gevoel op te bouwen.</dd>
          </dl>
          <dl class="info-card">
            <dt>Tijd</dt>
            <dd>{{ siteConfig.eventTime }}</dd>
            <dd>Van middag tot avond, compact genoeg om overzichtelijk te blijven en lang genoeg om echt sfeer te maken.</dd>
          </dl>
          <dl class="info-card">
            <dt>Toegang</dt>
            <dd>{{ siteConfig.admission }}</dd>
            <dd>Geen ticket nodig. Gewoon komen, aansluiten en genieten van muziek en een drankje.</dd>
          </dl>
        </div>

        <section id="locatie" class="location-panel" aria-labelledby="locatie_title">
          <span class="eyebrow eyebrow-dark">Locatie</span>
          <h2 id="locatie_title" class="section-title location-title">{{ siteConfig.freeEntry.location.split(' / ')[0] }}</h2>
          <p>
            Bammetje landt bij Oogst in Hengelo. Verwacht geen exacte kopie van BAM! Festival in het park, maar een kleinere setting met dezelfde liefde voor livemuziek,
            ontmoeting en lokale energie.
          </p>
          <address class="location-address">
            {{ siteConfig.address.replace(', ', '\n') }}
          </address>
          <div class="location-map">
            <ClientOnly>
              <LMap
                ref="map"
                :zoom="15"
                :center="siteConfig.coordinates"
                :use-global-leaflet="false"
              >
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LMarker :lat-lng="siteConfig.coordinates">
                  <LPopup>
                    <div class="map-popup">
                      <strong>{{ siteConfig.freeEntry.location.split(' / ')[0] }}</strong><br >
                      {{ siteConfig.address }}
                    </div>
                  </LPopup>
                </LMarker>
              </LMap>
            </ClientOnly>
          </div>
          <div class="location-links">
            <a class="action-button action-button-primary" :href="siteConfig.links.route" target="_blank" rel="noreferrer">Route openen</a>
            <a class="action-button action-button-secondary" :href="siteConfig.links.bamFestival" target="_blank" rel="noreferrer">Bekijk BAM! Festival</a>
          </div>
        </section>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="frame">
      <div class="quote-ribbon">
        <p>
          "{{ siteConfig.footer.quote }}"
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
          <a
            v-for="sponsor in sponsors"
            :key="sponsor.title"
            :href="sponsor.link"
            target="_blank"
            rel="noreferrer"
            class="sponsor-logo"
          >
            <NuxtImg
                :src="sponsor.logo"
                :alt="sponsor.logo_alt"
                width="640"
                height="238"
                loading="lazy"
                format="webp"
                quality="80"
                sizes="sm:100vw md:50vw"
              />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.site-shell::before,
.site-shell::after {
  content: "";
  position: fixed;
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

.hero {
  position: relative;
  padding-bottom: var(--section-gap);
}

.hero-banner {
  position: relative;
  width: 100%;
  min-height: clamp(16rem, 42vw, 34rem);
  overflow: clip;
  background: var(--page-burgundy);
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
  background: var(--page-yellow);
  color: var(--page-dark);
  box-shadow: 0 16px 40px rgba(248, 190, 5, 0.28);
}

.action-button-primary:hover,
.action-button-primary:focus-visible {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 20px 44px rgba(248, 190, 5, 0.32);
}

.action-button-secondary {
  border-color: rgba(253, 250, 251, 0.2);
  color: var(--page-white);
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
  color: var(--page-white);
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
  .info-grid {
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
  color: var(--page-white);
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
  white-space: pre-line;
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
  background: var(--page-burgundy);
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
  transition: transform 240ms var(--ease-out-quart), background-color 220ms var(--ease-out-quint), box-shadow 240ms var(--ease-out-quart);
}

.sponsor-logo:hover {
  transform: translateY(-3px);
  background: rgba(253, 250, 251, 0.8);
  box-shadow: 0 16px 36px rgba(83, 10, 29, 0.1);
}

.sponsor-logo img {
  display: block;
  width: 100%;
  max-width: 12rem;
  height: auto;
  max-height: 4rem;
  object-fit: contain;
  object-position: center;
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
  color: var(--page-white);
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
