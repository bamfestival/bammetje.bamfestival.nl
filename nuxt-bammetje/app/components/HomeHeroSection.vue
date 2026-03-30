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
    <div class="frame hero-inner hero-grid">
      <div class="hero-copy">
        <span class="eyebrow eyebrow-dark"><span class="dot" aria-hidden="true" /> {{ siteConfig.hero.eyebrow }}</span>
        <div class="hero-title-wrap">
          <p class="eyebrow eyebrow-dark">{{ siteConfig.hero.label }}</p>
          <h1 class="hero-title">
            <span>{{ siteConfig.hero.title }}</span>
          </h1>
          <p class="hero-subtitle">{{ siteConfig.subtitle }}</p>
          <div class="hero-actions">
            <a class="action-button action-button-primary" :href="siteConfig.hero.primaryActionTarget">{{ siteConfig.hero.primaryActionLabel }}</a>
            <a class="action-button action-button-secondary" :href="siteConfig.hero.secondaryActionTarget">{{ siteConfig.hero.secondaryActionLabel }}</a>
          </div>
          <div class="hero-strip" role="list" :aria-label="siteConfig.hero.detailsAriaLabel">
            <div v-for="item in siteConfig.hero.details" :key="item.value + item.label" class="hero-strip-item" role="listitem">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <aside id="gratis-entree" class="ticket-card hero-ticket" :aria-label="siteConfig.freeEntry.ariaLabel">
        <span class="eyebrow eyebrow-light">{{ siteConfig.freeEntry.title }}</span>
        <strong>{{ siteConfig.freeEntry.location.replace(' / ', '\n') }}</strong>
        <p class="section-text hero-ticket-text">{{ siteConfig.freeEntry.description }}</p>
      </aside>
    </div>
  </section>
</template>
