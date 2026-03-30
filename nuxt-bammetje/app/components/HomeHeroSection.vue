<script setup lang="ts">
const { siteConfig } = useSite()
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-banner">
      <NuxtImg
        class="hero-banner-image"
        src="/assets/hero/bammetje-header-1920.webp"
        :alt="siteConfig.hero.imageAlt"
        width="1920"
        height="450"
        fetchpriority="high"
        loading="eager"
        decoding="async"
        format="webp"
        quality="76"
        sizes="(max-width: 640px) 640px, (max-width: 960px) 960px, (max-width: 1440px) 1440px, 1920px"
      />
    </div>
  </section>
</template>
