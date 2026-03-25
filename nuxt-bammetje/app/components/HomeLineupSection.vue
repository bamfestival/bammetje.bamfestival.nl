<script setup lang="ts">
const { siteConfig } = useSite()
const { artists } = useArtists()
</script>

<template>
  <section id="line-up" class="section">
    <div class="frame">
      <div class="section-intro">
        <span class="eyebrow eyebrow-light">{{ siteConfig.lineUp.title }}</span>
        <h2 class="section-title">{{ siteConfig.lineUp.heading }}</h2>
        <p class="section-text">{{ siteConfig.lineUp.intro }}</p>
      </div>

      <ArtistGrid :artists="artists" />
    </div>
  </section>
</template>
