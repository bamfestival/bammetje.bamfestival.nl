<script setup lang="ts">
const { siteConfig } = useSite()
const { artists } = useArtists()
</script>

<template>
  <section id="timetable" class="section">
    <div class="frame">
      <div class="section-intro">
        <span class="eyebrow eyebrow-light">{{ siteConfig.timetableSection.title }}</span>
        <h2 class="section-title">{{ siteConfig.timetableSection.heading }}</h2>
        <p class="section-text">{{ siteConfig.timetableSection.intro }}</p>
      </div>

      <TimetableGrid
        :artists="artists"
        :fallback-time-label="siteConfig.timetableSection.fallbackTimeLabel"
        :time-label-suffix="siteConfig.timetableSection.timeLabelSuffix"
        :blocks="siteConfig.timetableSection.blocks"
      />
    </div>
  </section>
</template>
