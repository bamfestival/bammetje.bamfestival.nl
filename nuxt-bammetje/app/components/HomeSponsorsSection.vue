<script setup lang="ts">
const { siteConfig } = useSite()
const { sponsors } = useSponsors()

const featuredSponsors = computed(() => sponsors.value.filter((sponsor) => sponsor.weight === 5))
const supportingSponsors = computed(() => sponsors.value.filter((sponsor) => sponsor.weight < 5))
</script>

<template>
  <section class="section">
    <div class="frame">
      <div class="light-panel sponsor-bar">
        <div class="sponsor-copy">
          <span class="eyebrow eyebrow-light">{{ siteConfig.sponsorsSection.title }}</span>
          <h2 class="section-title section-title-tight">{{ siteConfig.sponsorsSection.heading }}</h2>
          <p class="section-text section-text-push">{{ siteConfig.sponsorsSection.intro }}</p>
        </div>
        <div class="featured-sponsors">
          <a
            v-for="sponsor in featuredSponsors"
            :key="sponsor.title"
            :href="sponsor.link"
            :title="sponsor.title"
            target="_blank"
            rel="noreferrer"
            class="sponsor-logo sponsor-logo-featured"
          >
            <NuxtImg
              :src="sponsor.logo"
              :alt="sponsor.logo_alt"
              width="640"
              height="238"
              loading="lazy"
              format="webp"
              quality="80"
              sizes="sm:100vw md:50vw"
            />
          </a>
        </div>
        <div class="supporting-sponsors">
          <span class="supporting-sponsors-label">Met steun van</span>
          <div class="sponsor-logos">
            <a
              v-for="sponsor in supportingSponsors"
              :key="sponsor.title"
              :href="sponsor.link"
              :title="sponsor.title"
              target="_blank"
              rel="noreferrer"
              class="sponsor-logo sponsor-logo-supporting"
            >
              <NuxtImg
                :src="sponsor.logo"
                :alt="sponsor.logo_alt"
                width="640"
                height="238"
                loading="lazy"
                format="webp"
                quality="80"
                sizes="sm:100vw md:50vw"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
