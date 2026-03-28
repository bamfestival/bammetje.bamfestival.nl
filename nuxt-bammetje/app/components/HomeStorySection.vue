<script setup lang="ts">
const { siteConfig } = useSite()
</script>

<template>
  <section class="section story-band">
    <div class="frame story-layout">
      <div class="story-quote">
        <h2 class="eyebrow eyebrow-dark story-heading">{{ siteConfig.about.title }}</h2>
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

<style scoped>
.story-heading {
  margin: 0;
}
</style>
