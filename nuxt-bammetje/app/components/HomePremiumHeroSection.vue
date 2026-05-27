<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'

const bgRef = ref<HTMLElement | null>(null)
const particleStyles = shallowRef<Array<Record<string, string>>>([])
let scrollCleanup: (() => void) | null = null

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reducedMotion && bgRef.value) {
    const handleScroll = () => {
      const y = window.scrollY * 0.3
      bgRef.value!.style.transform = `translate3d(0, ${y}px, 0)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    scrollCleanup = () => window.removeEventListener('scroll', handleScroll)
  }

  if (!reducedMotion) {
    particleStyles.value = Array.from({ length: 15 }, () => ({
      '--delay': `${Math.random() * 10}s`,
      '--x': `${Math.random() * 100}%`,
      '--y': `${Math.random() * 100}%`,
      '--size': `${2 + Math.random() * 3}px`,
      '--duration': `${8 + Math.random() * 14}s`,
    }))
  }
})

onUnmounted(() => {
  scrollCleanup?.()
})
</script>

<template>
  <section class="premium-hero">
    <div ref="bgRef" class="premium-hero-bg" aria-hidden="true">
      <NuxtImg
        class="premium-hero-image"
        src="/assets/stock/concert-crowd-stage.jpg"
        alt=""
        fetchpriority="high"
        loading="eager"
        decoding="async"
        format="webp"
        quality="82"
        sizes="100vw"
      />
      <div class="premium-hero-overlay" aria-hidden="true" />
      <div class="premium-hero-grain" aria-hidden="true" />
      <div class="premium-hero-light-leak" aria-hidden="true" />
    </div>

    <ClientOnly>
      <div v-if="particleStyles.length" class="premium-hero-particles" aria-hidden="true">
        <span
          v-for="(style, i) in particleStyles"
          :key="i"
          class="particle"
          :style="style"
        />
      </div>
    </ClientOnly>

    <div class="premium-hero-content">
      <div class="frame">
        <div class="premium-hero-text">
          <p class="premium-hero-eyebrow">Bammetje 2026 &bull; Bedankt!</p>
          <h1 class="premium-hero-title">
            Bammetje,<br>geen BAM!<br>
            <span class="premium-hero-title-accent">wel festival!</span>
          </h1>
          <p class="premium-hero-subtitle">Bedankt dat je er was. Volgende editie: vrijdag 21 &amp; zaterdag 22 mei 2027 in het Prins Bernhardplantsoen.</p>
          <p class="premium-hero-intro">4060 bezoekers. 28,5 graden. Weinig schaduw. Veel liefde, muziek en dezelfde vertrouwde BAM!-sfeer.</p>
          <p class="premium-hero-body">Helemaal stil bleef het gelukkig niet: onder de noemer Bammetje organiseerden we een eenmalige mini-editie bij Broedplaats Oogst. Kleiner van schaal, maar met dezelfde rauwe energie, warmte en sfeer die BAM! al jaren bijzonder maakt.</p>
          <div class="premium-hero-actions">
            <a href="https://bamfestival.nl/fotoalbums" target="_blank" rel="noreferrer" class="premium-btn premium-btn-primary">Bekijk foto&rsquo;s</a>
            <a href="https://bamfestival.nl" target="_blank" rel="noreferrer" class="premium-btn premium-btn-secondary">BAM! Festival 2027</a>
          </div>
          <div class="premium-hero-badges" aria-hidden="true">
            <div class="premium-badge"><span aria-hidden="true">☀️</span> 28,5 &deg;C</div>
            <div class="premium-badge"><span aria-hidden="true">👥</span> 4060 bezoekers</div>
            <div class="premium-badge"><span aria-hidden="true">📍</span> Broedplaats Oogst</div>
            <div class="premium-badge"><span aria-hidden="true">🎵</span> Eenmalige editie</div>
          </div>
        </div>
      </div>
    </div>

    <div class="premium-hero-bottom">
      <p class="premium-hero-bottom-text">Bedankt voor een onvergetelijke dag. Tot volgend jaar in het Park!</p>
    </div>
  </section>
</template>
