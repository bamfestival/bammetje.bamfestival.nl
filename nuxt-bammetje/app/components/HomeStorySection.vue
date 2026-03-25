<script setup lang="ts">
const { siteConfig } = useSite()
</script>

<template>
  <section class="section story-band">
    <div class="frame story-layout">
      <div class="story-quote">
        <span class="eyebrow eyebrow-dark">{{ siteConfig.about.title }}</span>
        <p>{{ siteConfig.about.intro }}</p>
      </div>
      <div class="story-points">
        <div
          v-for="point in siteConfig.about.points"
          :key="point.title"
          class="story-point"
        >
          <span class="dot" aria-hidden="true" />
          <div>
            <strong>{{ point.title }}</strong>
            <p>{{ point.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
