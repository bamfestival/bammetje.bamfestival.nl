<script setup lang="ts">
const { siteConfig } = useSite()
const { sponsors } = useSponsors()

const featuredSponsors = computed(() => sponsors.value.filter((sponsor) => sponsor.weight === 5))
const supportingSponsors = computed(() => sponsors.value.filter((sponsor) => sponsor.weight < 5))
</script>

<template>
  <section class="section section-sponsors">
    <div class="frame sponsor-stack">
      <section
        v-if="siteConfig.sponsorsSection.article"
        class="sponsor-article"
        aria-labelledby="sponsor-article-title"
      >
        <h2 id="sponsor-article-title" class="sponsor-article-title">{{ siteConfig.sponsorsSection.article.headline }}</h2>
        <p
          v-for="paragraph in siteConfig.sponsorsSection.article.paragraphs"
          :key="paragraph"
          class="sponsor-article-paragraph"
        >
          {{ paragraph }}
        </p>
        <p class="sponsor-article-credit">{{ siteConfig.sponsorsSection.article.credit }}</p>
      </section>
      <div class="light-panel sponsor-bar">
        <div class="sponsor-copy">
          <span class="eyebrow eyebrow-light">{{ siteConfig.sponsorsSection.title }}</span>
          <h2 class="section-title section-title-tight">{{ siteConfig.sponsorsSection.heading }}</h2>
          <p class="section-text section-text-push">{{ siteConfig.sponsorsSection.intro }}</p>
        </div>
        <div class="featured-sponsors">
          <template v-for="sponsor in featuredSponsors" :key="sponsor.title">
            <a
              v-if="sponsor.link"
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
                height="640"
                loading="lazy"
                format="webp"
                quality="80"
                sizes="sm:100vw md:50vw"
              />
            </a>
            <div
              v-else
              :title="sponsor.title"
              class="sponsor-logo sponsor-logo-featured"
            >
              <NuxtImg
                :src="sponsor.logo"
                :alt="sponsor.logo_alt"
                width="640"
                height="640"
                loading="lazy"
                format="webp"
                quality="80"
                sizes="sm:100vw md:50vw"
              />
            </div>
          </template>
        </div>
        <div class="supporting-sponsors">
          <span class="supporting-sponsors-label">Met steun van</span>
          <div class="sponsor-logos">
            <template v-for="sponsor in supportingSponsors" :key="sponsor.title">
              <a
                v-if="sponsor.link"
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
                  height="640"
                  loading="lazy"
                  format="webp"
                  quality="80"
                  sizes="sm:100vw md:50vw"
                />
              </a>
              <div
                v-else
                :title="sponsor.title"
                class="sponsor-logo sponsor-logo-supporting"
              >
                <NuxtImg
                  :src="sponsor.logo"
                  :alt="sponsor.logo_alt"
                  width="640"
                  height="640"
                  loading="lazy"
                  format="webp"
                  quality="80"
                  sizes="sm:100vw md:50vw"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-sponsors {
  padding-top: clamp(1.25rem, 2.5vw, 2rem);
}

.sponsor-stack {
  display: grid;
  gap: clamp(1rem, 1.8vw, 1.5rem);
}

.sponsor-article {
  display: grid;
  gap: clamp(0.7rem, 1.2vw, 0.95rem);
  padding: 1.2rem 1.25rem;
  border-radius: 1.4rem;
  background: var(--surface-sponsor-article);
  border: 1px solid var(--border-sponsor-article);
  box-shadow: var(--shadow-sponsor-article);
}

.sponsor-article-title {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2rem);
  line-height: 0.95;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--page-white);
}

.sponsor-article-paragraph,
.sponsor-article-credit {
  margin: 0;
  color: var(--text-sponsor-article);
}

.sponsor-article-credit {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-sponsor-credit);
}

@media (max-width: 47.99rem) {
  .section-sponsors {
    padding-top: 0.9rem;
  }

  .sponsor-stack {
    gap: 1rem;
  }
}

@media (min-width: 48rem) {
  .sponsor-article {
    padding: 1.45rem 1.6rem;
  }
}
</style>
