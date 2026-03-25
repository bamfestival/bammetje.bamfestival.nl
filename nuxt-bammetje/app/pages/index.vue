<script setup lang="ts">
const { siteConfig } = useSite()

useSeoMeta({
  title: siteConfig.value.title,
  ogTitle: siteConfig.value.title,
  description: siteConfig.value.meta.description,
  ogDescription: siteConfig.value.meta.ogDescription,
  ogImage: siteConfig.value.meta.ogImage,
  ogImageAlt: siteConfig.value.meta.ogImageAlt,
  twitterCard: 'summary_large_image',
  twitterTitle: siteConfig.value.title,
  twitterDescription: siteConfig.value.meta.ogDescription,
  twitterImage: siteConfig.value.meta.ogImage,
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeStorySection />
    <HomeLineupSection />
    <HomeTimetableSection />
    <HomeInfoSection />
    <HomeQuoteSection />
    <HomeSponsorsSection />
  </div>
</template>
