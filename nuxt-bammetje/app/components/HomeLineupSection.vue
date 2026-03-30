<script setup lang="ts">
const { siteConfig, artistPublishLabel, artistsArePublished } = useSite()
const { artists } = useArtists()
</script>

<template>
  <section id="line-up" class="section">
    <div class="frame">
      <div class="section-intro">
        <span class="eyebrow eyebrow-light">{{ siteConfig.lineUp.title }}</span>
        <h2 class="section-title">{{ siteConfig.lineUp.heading }}</h2>
        <p class="section-text">
          {{ artistsArePublished ? siteConfig.lineUp.intro : (siteConfig.lineUp.preReleaseIntro || siteConfig.lineUp.intro) }}
        </p>
      </div>

      <div v-if="!artistsArePublished" class="tba-banner" role="status" aria-live="polite">
        <span class="eyebrow eyebrow-dark">{{ siteConfig.artistRelease.bannerEyebrow }}</span>
        <h3 class="tba-banner-title">{{ siteConfig.artistRelease.bannerTitle }}</h3>
        <p class="section-text">{{ siteConfig.artistRelease.bannerText }}</p>
        <p v-if="artistPublishLabel" class="tba-banner-meta">
          {{ siteConfig.artistRelease.bannerTimePrefix }} {{ artistPublishLabel }}
        </p>
      </div>

      <ArtistGrid v-else :artists="artists" />
    </div>
  </section>
</template>
