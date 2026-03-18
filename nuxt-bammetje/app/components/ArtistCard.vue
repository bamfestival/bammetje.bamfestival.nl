<script setup lang="ts">
defineProps<{
  artist: {
    name: string
    stage: 'Hoofdpodium' | 'De Tent' | 'Tommy-Loods'
    description: string
    bio: string
    time: string
    theme: 'dark' | 'light' | 'night' | 'gold'
    image: string
  }
}>()

const isFlipped = ref(false)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

const stageClass = computed(() => {
  return {
    'Hoofdpodium': 'stage_main',
    'De Tent': 'stage_tent',
    'Tommy-Loods': 'stage_loft'
  }
})
</script>

<template>
  <article 
    class="flip-card" 
    :class="{ 'is-flipped': isFlipped }"
    tabindex="0"
    role="button"
    :aria-label="`${artist.name} - klik voor meer informatie`"
    @click="toggleFlip"
    @keydown.enter="toggleFlip"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front" :data-theme="artist.theme">
        <div class="flip-badges" aria-hidden="true">
          <span class="flip-badge flip-badge-like">Nice</span>
          <span class="flip-badge flip-badge-next">Next</span>
        </div>
        <div class="flip-card-media">
          <NuxtImg
            :src="artist.image"
            :alt="`${artist.name} optreden`"
            width="960"
            height="640"
            loading="lazy"
            format="webp"
          />
        </div>
        <span class="stage-chip" :class="stageClass[artist.stage]">
          {{ artist.stage }}
        </span>
        <h3>{{ artist.name }}</h3>
        <p>{{ artist.description }}</p>
        <span class="flip-hint">Tap for bio</span>
      </div>
      <div class="flip-card-back" :data-theme="artist.theme">
        <span class="stage-chip" :class="stageClass[artist.stage]">Achterkant</span>
        <h3>{{ artist.name }}</h3>
        <p class="flip-back-text">{{ artist.bio }}</p>
        <div class="flip-meta">
          <div class="flip-meta-item">
            <span class="flip-meta-label">Podium</span>
            <span class="flip-meta-value">{{ artist.stage }}</span>
          </div>
          <div class="flip-meta-item">
            <span class="flip-meta-label">Tijd</span>
            <span class="flip-meta-value">{{ artist.time }}</span>
          </div>
        </div>
        <span class="flip-hint">Tap back</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.flip-card {
  perspective: 1200px;
  cursor: pointer;
  outline: none;
}

.flip-card:focus-visible {
  outline: 3px solid rgba(248, 190, 5, 0.92);
  outline-offset: 3px;
  border-radius: 1.8rem;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: 32rem;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  display: grid;
  gap: 0.85rem;
  align-content: start;
  padding: 1.15rem;
  border-radius: 1.8rem;
  backface-visibility: hidden;
  box-shadow: 0 20px 70px rgba(83, 10, 29, 0.14);
  overflow: clip;
}

.flip-card-front {
  background:
    radial-gradient(circle at 82% 18%, rgba(248, 190, 5, 0.28), transparent 16%),
    radial-gradient(circle at 18% 16%, rgba(216, 151, 156, 0.24), transparent 12%),
    linear-gradient(125deg, rgba(18, 2, 6, 0.88) 4%, rgba(83, 10, 29, 0.9) 24%, rgba(146, 18, 52, 0.92) 46%, rgba(198, 33, 68, 0.92) 64%, rgba(226, 100, 38, 0.92) 82%, rgba(248, 190, 5, 0.88) 100%);
  color: #fdfafb;
}

.flip-card-front[data-theme="light"] {
  color: #2e1418;
  background:
    radial-gradient(circle at 74% 20%, rgba(216, 151, 156, 0.28), transparent 14%),
    linear-gradient(180deg, #fff3e5 0%, #f7dbc8 100%);
}

.flip-card-front[data-theme="night"] {
  color: #fdfafb;
  background:
    radial-gradient(circle at 16% 20%, rgba(248, 190, 5, 0.2), transparent 16%),
    linear-gradient(180deg, #120206 0%, #530a1d 100%);
}

.flip-card-front[data-theme="gold"] {
  color: #2b1603;
  background:
    radial-gradient(circle at 24% 18%, rgba(253, 250, 251, 0.34), transparent 12%),
    linear-gradient(180deg, #f8be05 0%, #f3a513 100%);
}

.flip-card-back {
  transform: rotateY(180deg);
  background:
    radial-gradient(circle at 82% 18%, rgba(248, 190, 5, 0.28), transparent 16%),
    radial-gradient(circle at 18% 16%, rgba(216, 151, 156, 0.24), transparent 12%),
    linear-gradient(125deg, rgba(18, 2, 6, 0.88) 4%, rgba(83, 10, 29, 0.9) 24%, rgba(146, 18, 52, 0.92) 46%, rgba(198, 33, 68, 0.92) 64%, rgba(226, 100, 38, 0.92) 82%, rgba(248, 190, 5, 0.88) 100%);
  color: #fdfafb;
}

.flip-card-back[data-theme="light"] {
  background:
    radial-gradient(circle at 74% 20%, rgba(216, 151, 156, 0.28), transparent 14%),
    linear-gradient(180deg, #fff3e5 0%, #f7dbc8 100%);
  color: #2e1418;
}

.flip-card-back[data-theme="night"] {
  background:
    radial-gradient(circle at 16% 20%, rgba(248, 190, 5, 0.2), transparent 16%),
    linear-gradient(180deg, #120206 0%, #530a1d 100%);
}

.flip-card-back[data-theme="gold"] {
  background:
    radial-gradient(circle at 24% 18%, rgba(253, 250, 251, 0.34), transparent 12%),
    linear-gradient(180deg, #f8be05 0%, #f3a513 100%);
  color: #2b1603;
}

.flip-card-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.flip-card-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 2, 6, 0.1) 0%, rgba(18, 2, 6, 0.78) 100%);
}

.flip-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flip-card-front > *:not(.flip-card-media):not(.flip-badges),
.flip-card-back > *:not(.flip-badges) {
  position: relative;
  z-index: 1;
}

.flip-badges {
  position: absolute;
  inset: 1rem 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;
  pointer-events: none;
}

.flip-badge {
  border-radius: 999px;
  padding: 0.55rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  box-shadow: 0 12px 30px rgba(18, 2, 6, 0.18);
  opacity: 0;
  transform: translateY(0.35rem) scale(0.94);
  transition: opacity 120ms linear, transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
}

.flip-badge-like {
  background: rgba(253, 250, 251, 0.94);
  color: #921234;
}

.flip-badge-next {
  margin-left: auto;
  background: rgba(18, 2, 6, 0.86);
  color: #f8be05;
  border: 1px solid rgba(253, 250, 251, 0.14);
}

.flip-card.is-flipped .flip-badge-like,
.flip-card.is-flipped .flip-badge-next {
  opacity: 1;
  transform: translateY(0) scale(1.04);
}

.stage-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  border-radius: 999px;
  padding: 0.42rem 0.72rem;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  line-height: 1;
}

.stage-chip::before {
  content: "";
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.9;
}

.stage_main {
  background: rgba(198, 33, 68, 0.16);
  color: #fdfafb;
  border: 1px solid rgba(253, 250, 251, 0.14);
}

.stage_tent {
  background: rgba(253, 250, 251, 0.72);
  color: #921234;
  border: 1px solid rgba(83, 10, 29, 0.12);
}

.stage_loft {
  background: rgba(248, 190, 5, 0.22);
  color: #fdfafb;
  border: 1px solid rgba(253, 250, 251, 0.14);
}

.flip-card-front h3,
.flip-card-back h3 {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(2.2rem, 9vw, 3.3rem);
  line-height: 0.88;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.flip-card-front p,
.flip-card-back p {
  margin: 0;
  line-height: 1.65;
  max-width: 24rem;
}

.flip-back-text {
  margin-top: 0.5rem;
}

.flip-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(253, 250, 251, 0.14);
}

.flip-card-back[data-theme="light"] .flip-meta {
  border-top-color: rgba(83, 10, 29, 0.12);
}

.flip-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.flip-meta-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.7;
}

.flip-meta-value {
  font-family: 'Saira Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.flip-hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.6;
}

@media (min-width: 48rem) {
  .flip-card-inner {
    min-height: 36rem;
  }

  .flip-card-front,
  .flip-card-back {
    padding: 1.5rem;
  }
}
</style>
