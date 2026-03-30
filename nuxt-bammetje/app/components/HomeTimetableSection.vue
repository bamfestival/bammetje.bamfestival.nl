<script setup lang="ts">
const { siteConfig, artistPublishLabel } = useSite()
const { artistsWithPerformances, hasPerformances, artistsArePublished } = useArtists()
</script>

<template>
  <section v-if="!artistsArePublished || hasPerformances" id="timetable" class="section">
    <div class="frame">
      <div class="section-intro">
        <span class="eyebrow eyebrow-light">{{ siteConfig.timetableSection.title }}</span>
        <h2 class="section-title">{{ siteConfig.timetableSection.heading }}</h2>
        <p class="section-text">
          {{ artistsArePublished ? siteConfig.timetableSection.intro : (siteConfig.timetableSection.preReleaseIntro || siteConfig.timetableSection.intro) }}
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

      <TimetableGrid
        v-else
        :artists="artistsWithPerformances"
        :fallback-time-label="siteConfig.timetableSection.fallbackTimeLabel"
        :time-label-suffix="siteConfig.timetableSection.timeLabelSuffix"
        :blocks="siteConfig.timetableSection.blocks"
      />
    </div>
  </section>
</template>
