<script setup lang="ts">
import { joinURL } from 'ufo'

const { siteConfig } = useSite()
const runtimeConfig = useRuntimeConfig()

const infoImageWidths = [480, 720, 960, 1280, 1512]

const infoAssetPath = (imageBase: string, width: number) =>
  joinURL(runtimeConfig.app.baseURL, `/assets/info/${imageBase}-${width}.webp`)

const infoSrcsetFor = (imageBase: string) =>
  infoImageWidths.map(width => `${infoAssetPath(imageBase, width)} ${width}w`).join(', ')
</script>

<template>
  <section id="info" class="section">
    <div class="frame">
      <div class="section-intro">
        <span class="eyebrow eyebrow-light">{{ siteConfig.infoSection.title }}</span>
        <h2 class="section-title">{{ siteConfig.infoSection.heading }}</h2>
        <p class="section-text">{{ siteConfig.infoSection.intro }}</p>
      </div>

      <div class="info-grid">
        <div class="info-stack">
          <dl class="info-card">
            <dt>{{ siteConfig.infoSection.items.date.label }}</dt>
            <dd>{{ siteConfig.infoSection.items.date.value }}</dd>
            <dd v-if="siteConfig.infoSection.items.date.description">{{ siteConfig.infoSection.items.date.description }}</dd>
          </dl>
          <dl class="info-card">
            <dt>{{ siteConfig.infoSection.items.time.label }}</dt>
            <dd>{{ siteConfig.infoSection.items.time.value }}</dd>
            <dd v-if="siteConfig.infoSection.items.time.description">{{ siteConfig.infoSection.items.time.description }}</dd>
          </dl>
          <dl class="info-card">
            <dt>{{ siteConfig.infoSection.items.admission.label }}</dt>
            <dd>{{ siteConfig.infoSection.items.admission.value }}</dd>
            <dd v-if="siteConfig.infoSection.items.admission.description">{{ siteConfig.infoSection.items.admission.description }}</dd>
          </dl>
        </div>

        <section id="locatie" class="location-panel" aria-labelledby="locatie_title">
          <span class="eyebrow eyebrow-dark">{{ siteConfig.infoSection.locationTitle }}</span>
          <h2 id="locatie_title" class="section-title location-title">{{ siteConfig.infoSection.locationHeading }}</h2>
          <p>{{ siteConfig.infoSection.locationDescription }}</p>
          <address class="location-address">
            {{ siteConfig.address.replace(', ', '\n') }}
          </address>
          <div class="location-map">
            <ClientOnly>
              <LMap
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
                      <strong>{{ siteConfig.infoSection.locationHeading }}</strong><br >
                      {{ siteConfig.address }}
                    </div>
                  </LPopup>
                </LMarker>
              </LMap>
            </ClientOnly>
          </div>
          <div class="location-links">
            <a class="action-button action-button-primary" :href="siteConfig.links.route" target="_blank" rel="noreferrer">{{ siteConfig.infoSection.routeLabel }}</a>
            <a class="action-button action-button-secondary" :href="siteConfig.links.bamFestival" target="_blank" rel="noreferrer">{{ siteConfig.infoSection.bamFestivalLabel }}</a>
          </div>
        </section>
      </div>

      <div class="info-visuals" aria-label="Praktische informatie">
        <article
          v-for="visual in siteConfig.infoSection.visuals"
          :key="visual.imageBase"
          class="info-visual"
        >
          <picture class="info-visual-picture">
            <source
              type="image/webp"
              :srcset="infoSrcsetFor(visual.imageBase)"
              sizes="(min-width: 64rem) 42vw, 92vw"
            >
            <img
              :src="infoAssetPath(visual.imageBase, 960)"
              :alt="visual.imageAlt"
              width="1512"
              height="851"
              loading="lazy"
              decoding="async"
            >
          </picture>
          <div v-if="!visual.hideCaption" class="info-visual-copy">
            <h3>{{ visual.title }}</h3>
            <p>{{ visual.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
