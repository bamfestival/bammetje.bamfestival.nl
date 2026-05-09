<script setup lang="ts">
import { joinURL } from 'ufo'

const { siteConfig } = useSite()
const runtimeConfig = useRuntimeConfig()

const imageWidths = [480, 720, 960, 1280]

const assetPath = (imageBase: string, width: number) =>
  joinURL(runtimeConfig.app.baseURL, `/assets/randprogramma/${imageBase}-${width}.webp`)

const srcsetFor = (imageBase: string) =>
  imageWidths.map(width => `${assetPath(imageBase, width)} ${width}w`).join(', ')

const cardId = (imageBase: string) => `randprogramma-${imageBase}`
</script>

<template>
  <section id="randprogramma" class="section randprogramma-section">
    <div class="frame">
      <div class="randprogramma-layout">
        <div class="section-intro randprogramma-intro">
          <span class="eyebrow eyebrow-light">{{ siteConfig.randprogrammaSection.title }}</span>
          <h2 class="section-title">{{ siteConfig.randprogrammaSection.heading }}</h2>
          <p class="section-text">{{ siteConfig.randprogrammaSection.intro }}</p>
        </div>

        <div class="randprogramma-grid">
          <article
            v-for="(item, index) in siteConfig.randprogrammaSection.items"
            :key="item.imageBase"
            class="randprogramma-item"
            :class="{ 'randprogramma-item-featured': index === 0 }"
          >
            <input
              :id="cardId(item.imageBase)"
              class="randprogramma-toggle"
              type="checkbox"
              :aria-label="`${item.title} randprogramma details`"
            >
            <label class="randprogramma-card" :for="cardId(item.imageBase)">
              <span class="randprogramma-card-inner" aria-hidden="true">
                <span class="randprogramma-card-face randprogramma-card-front">
                  <picture class="randprogramma-picture">
                    <source
                      type="image/webp"
                      :srcset="srcsetFor(item.imageBase)"
                      sizes="(min-width: 64rem) 32vw, (min-width: 48rem) 44vw, 92vw"
                    >
                    <img
                      :src="assetPath(item.imageBase, 720)"
                      :alt="item.imageAlt"
                      width="720"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    >
                  </picture>
                  <span class="randprogramma-copy">
                    <span class="randprogramma-title">{{ item.displayTitle || item.title }}</span>
                  </span>
                </span>

                <span class="randprogramma-card-face randprogramma-card-back">
                  <span class="randprogramma-back-kicker">{{ siteConfig.randprogrammaSection.title }}</span>
                  <span class="randprogramma-back-title">{{ item.displayTitle || item.title }}</span>
                  <span class="randprogramma-back-text">{{ item.description }}</span>
                </span>
              </span>
            </label>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
