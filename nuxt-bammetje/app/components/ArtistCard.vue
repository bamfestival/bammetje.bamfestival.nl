<script setup lang="ts">
import type { ArtistPerformance, ArtistRecord, StageKey } from '~/app/types/artist'

const { getStageName, siteConfig } = useSite()

const props = defineProps<{
  artist: ArtistRecord
}>()

const cardId = computed(() =>
  props.artist.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
)

const frontImage = computed(() => props.artist.image_square || props.artist.image_landscape)
const backImage = computed(() => props.artist.image_landscape || props.artist.image_square || '')
const frontImageAlt = computed(() => props.artist.image_square_alt || props.artist.image_landscape_alt || props.artist.title)
const backImageAlt = computed(() => props.artist.image_landscape_alt || props.artist.image_square_alt || props.artist.title)

const youtubeEmbedUrl = computed(() => {
  if (!props.artist.youtube) return ''
  const url = props.artist.youtube.trim()

  if (url.includes('/embed/')) {
    return url.replace('youtube.com/embed/', 'youtube-nocookie.com/embed/')
  }

  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1)
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const videoId = parsed.searchParams.get('v')
      if (parsed.pathname === '/watch' && videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`
      }

      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/)
      if (shortsMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`
      }
    }
  }
  catch {
    return ''
  }

  return ''
})

const resolvedYoutubeEmbedUrl = ref('')
const hasTriedYoutubeResolve = ref(false)

const cardRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const backRef = ref<HTMLDivElement | null>(null)
const frontRef = ref<HTMLButtonElement | null>(null)
const isFlipped = ref(false)

const prefersReducedMotion = ref(false)

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

const closeFlip = () => {
  isFlipped.value = false
  nextTick(() => {
    frontRef.value?.focus()
  })
}

const getBackFocusableElements = () => {
  if (!backRef.value) return []

  return [...backRef.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(element => !element.hasAttribute('inert') && element.getAttribute('aria-hidden') !== 'true')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isFlipped.value) {
    event.preventDefault()
    closeFlip()
  }
}

const handleBackKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeFlip()
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = getBackFocusableElements()
  if (!focusableElements.length) {
    event.preventDefault()
    closeButtonRef.value?.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement as HTMLElement | null

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  }
  else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

const activeYoutubeEmbedUrl = computed(() => youtubeEmbedUrl.value || resolvedYoutubeEmbedUrl.value)

const resolveYoutubeEmbedUrl = async () => {
  if (!props.artist.youtube || youtubeEmbedUrl.value || hasTriedYoutubeResolve.value) {
    return
  }

  hasTriedYoutubeResolve.value = true

  try {
    const response = await $fetch<{ embedUrl?: string }>('/api/youtube/resolve', {
      query: { url: props.artist.youtube }
    })
    resolvedYoutubeEmbedUrl.value = response.embedUrl || ''
  }
  catch {
    resolvedYoutubeEmbedUrl.value = ''
  }
}

watch(isFlipped, (flipped) => {
  if (flipped) {
    nextTick(() => {
      closeButtonRef.value?.focus()
    })
    resolveYoutubeEmbedUrl()
  }
})

const stageClass = computed(() => ({
  'hoofdpodium': 'stage-main',
  'tommy-loods': 'stage-loft'
} as Record<StageKey, string>))

const compareTimes = (left: string, right: string) => left.localeCompare(right, 'nl')

const performances = computed(() => props.artist.performances ?? [])

const sortedPerformances = computed(() =>
  [...performances.value].sort((left, right) => compareTimes(left.starttime, right.starttime))
)

const hasPerformances = computed(() => sortedPerformances.value.length > 0)

const formatPerformanceTime = (performance: ArtistPerformance) =>
  performance.endtime ? `${performance.starttime} - ${performance.endtime}` : performance.starttime

const artistTags = computed(() => props.artist.tags?.filter(Boolean) || [])

const artistCardUi = computed(() => siteConfig.value.ui.artistCard)

const withArtistName = (label: string) => label.replace('{artist}', props.artist.title)
</script>

<template>
  <article 
    :id="`artist-${cardId}`"
    ref="cardRef"
    class="flip-card" 
    :class="{ 'is-flipped': isFlipped, 'reduce-motion': prefersReducedMotion }"
    @keydown="handleKeydown"
  >
    <div class="flip-card-inner">
      <div
        class="flip-card-front"
        :data-theme="artist.theme || 'dark'"
      >
        <button
          ref="frontRef"
          type="button"
          class="flip-card-front-button"
          :aria-expanded="isFlipped"
          :aria-controls="isFlipped ? `artist-back-${cardId}` : undefined"
          aria-haspopup="dialog"
          :aria-label="withArtistName(artistCardUi.detailsAriaLabel)"
          @click="toggleFlip"
        >
          <span class="sr-only">{{ withArtistName(artistCardUi.detailsAriaLabel) }}</span>
        </button>
        <div class="flip-card-media">
          <NuxtImg
            :src="frontImage"
            :alt="frontImageAlt"
            loading="lazy"
            format="webp"
            quality="80"
            sizes="sm:100vw md:50vw lg:33vw"
          />
        </div>
        <div class="flip-card-content">
          <h3>{{ artist.title }}</h3>
          <p class="flip-description">{{ artist.subtitle }}</p>
          <ul v-if="artistTags.length" class="tag-list">
            <li v-for="tag in artistTags" :key="`${artist.title}-${tag}`" class="tag-pill">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="isFlipped"
        :id="`artist-back-${cardId}`"
        ref="backRef"
        class="flip-card-back" 
        :data-theme="artist.theme || 'dark'"
        role="dialog"
        :aria-label="withArtistName(artistCardUi.detailsAriaLabel)"
        aria-modal="true"
        @keydown="handleBackKeydown"
      >
        <button 
          ref="closeButtonRef"
          class="flip-close" 
          :aria-label="artistCardUi.closeLabel"
          @click="closeFlip" 
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-icon"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="flip-back-media">
          <NuxtImg
            :src="backImage"
            :alt="backImageAlt"
            loading="lazy"
            format="webp"
            quality="80"
            sizes="sm:100vw md:50vw lg:33vw"
          />
        </div>
        <div class="flip-back-content">
          <h3>{{ artist.title }}</h3>
          <p class="flip-bio">{{ artist.bio || artist.subtitle }}</p>
          <ul v-if="artistTags.length" class="tag-list">
            <li v-for="tag in artistTags" :key="`${artist.title}-${tag}-back`" class="tag-pill">
              {{ tag }}
            </li>
          </ul>
          <ul v-if="hasPerformances" class="performance-list">
            <li
              v-for="(performance, index) in sortedPerformances"
              :key="`${artist.title}-${performance.stage}-${performance.starttime}-${index}`"
              class="performance-item"
            >
              <span class="stage-chip performance-stage-chip" :class="stageClass[performance.stage]">
                {{ getStageName(performance.stage) }}
              </span>
              <span class="performance-time">{{ formatPerformanceTime(performance) }}</span>
            </li>
          </ul>
          <div v-if="isFlipped" class="flip-embed-group">
            <div v-if="artist.youtube && activeYoutubeEmbedUrl" class="flip-embed">
              <p class="flip-embed-label">{{ artistCardUi.youtubeLabel }}</p>
              <div class="video-container">
                <iframe 
                  :src="activeYoutubeEmbedUrl"
                  :title="withArtistName(artistCardUi.youtubeAriaLabel)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  loading="lazy"
                />
              </div>
            </div>
            <div v-if="artist.spotify" class="flip-embed">
              <p class="flip-embed-label">{{ artistCardUi.spotifyLabel }}</p>
              <iframe 
                :src="artist.spotify"
                :title="withArtistName(artistCardUi.spotifyAriaLabel)"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
          <div class="flip-socials">
            <a v-if="artist.instagram" :href="artist.instagram" target="_blank" rel="noreferrer" :aria-label="withArtistName(artistCardUi.instagramAriaLabel)" class="flip-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M12 2.2c2.7 0 3 0 4 .1 1 0 1.6.2 2 .4.5.2.8.5 1.1.9.3.4.6.7.9 1.1.4.5.5 1.1.6 2 .1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.6-.4 2-.2.5-.5.8-.9 1.1-.4.3-.7.6-1.1.9-.5.4-1.1.5-2 .6-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.6-.2-2-.4-.5-.2-.8-.5-1.1-.9-.3-.4-.6-.7-.9-1.1-.4-.5-.5-1.1-.6-2-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.6.4-2 .2-.5.5-.8.9-1.1.4-.3.7-.6 1.1-.9.5-.4 1.1-.5 2-.6 1-.1 1.3-.1 4-.1M12 0C8.7 0 8.3 0 7 .1c-1.3 0-2.2.2-3 .6C3.5 1 2.8 1.3 2.1 2 1.5 2.7 1.2 3.4 1 4.2c-.4.8-.6 1.7-.6 3C0 8.3 0 8.7 0 12s0 3.7.1 5.3c0 1.3.2 2.2.6 3 .3.7.6 1.4 1.1 2 .7.7 1.4 1 2.2 1.2.8.4 1.7.6 3 .6C8.3 24 8.7 24 12 24s3.7 0 5.3-.1c1.3 0 2.2-.2 3-.6.7-.3 1.4-.6 2-1.1.7-.7 1-1.4 1.2-2.2.4-.8.6-1.7.6-3 .1-1.6.1-2 .1-5.3s0-3.7-.1-5.3c0-1.3-.2-2.2-.6-3-.3-.7-.6-1.4-1.1-2-.7-.7-1.4-1-2.2-1.2-.8-.4-1.7-.6-3-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.5a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>
            </a>
            <a v-if="artist.youtube" :href="artist.youtube" target="_blank" rel="noreferrer" :aria-label="withArtistName(artistCardUi.youtubeAriaLabel)" class="flip-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C20 3.5 12 3.5 12 3.5s-8 0-9.5.6c-1.1.3-1.8 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.2 1 1 1.8 2 2.1 1.5.6 7.5.6 7.5.6s8 0 9.5-.6c1.1-.3 1.8-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            </a>
            <a v-if="artist.spotify" :href="artist.spotify" target="_blank" rel="noreferrer" :aria-label="withArtistName(artistCardUi.spotifyAriaLabel)" class="flip-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.6.5-1 .4-2.8-1.7-6.4-2-10.6-1.1-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9C9.4 14.4 13 14 17 15c.4.1.7.5.5.9zm1.4-3.3c-.3.4-.8.6-1.3.3-3.2-2-8.2-2.6-12-1.4-.5.1-.9-.2-1-.7-.1-.5.2-.9.7-1 4.2-1.3 9.4-.6 13 1.5.4.3.6.8.3 1.3zm.1-3.4c-3.3-1.8-9.4-2-13.2-.9-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 4.2-1.2 10.6-1 14.3.9.6.3.8 1 .5 1.6-.2.4-.6.6-.9.5z"/></svg>
            </a>
            <a v-if="artist.facebook" :href="artist.facebook" target="_blank" rel="noreferrer" :aria-label="withArtistName(artistCardUi.facebookAriaLabel)" class="flip-social-link">
              <svg viewBox="0 0 24 24" fill="#fdfafb" class="social-icon"><path d="M24 12c0-6.6-5.4-12-12-12S0 5.4 0 12c0 6 4.4 11 10.1 11.9v-8.4H6.9v-3.5h3.2V9.3c0-3.1 1.8-4.8 4.6-4.8 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.8v2.3h3.3l-.5 3.5H15l-.1 8.4C19.6 23 24 18 24 12z"/></svg>
            </a>
            <a v-if="artist.website" :href="artist.website" target="_blank" rel="noreferrer" :aria-label="withArtistName(artistCardUi.websiteAriaLabel)" class="flip-social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fdfafb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.flip-card {
  position: relative;
  width: 100%;
  min-height: 32rem;
  perspective: 1200px;
  scroll-margin-top: 7rem;
}

.flip-card.reduce-motion .flip-card-inner {
  transition: none;
}

@media (min-width: 48rem) {
  .flip-card {
    min-height: 36rem;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  transform-style: preserve-3d;
  transition: transform 760ms cubic-bezier(0.16, 1, 0.3, 1);
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  border-radius: 1.8rem;
  overflow: hidden;
  box-shadow: 0 20px 70px rgba(83, 10, 29, 0.14);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: opacity 380ms ease;
}

.flip-card.is-flipped .flip-card-front {
  pointer-events: none;
  opacity: 0;
}

.flip-card-front {
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 82% 18%, rgba(248, 190, 5, 0.28), transparent 16%),
    radial-gradient(circle at 18% 16%, rgba(216, 151, 156, 0.24), transparent 12%),
    linear-gradient(125deg, rgba(18, 2, 6, 0.88) 4%, rgba(83, 10, 29, 0.9) 24%, rgba(146, 18, 52, 0.92) 46%, rgba(198, 33, 68, 0.92) 64%, rgba(226, 100, 38, 0.92) 82%, rgba(248, 190, 5, 0.88) 100%);
  color: #fdfafb;
}

.flip-card-front-button {
  position: absolute;
  inset: 42% 0 0;
  z-index: 1;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  border-radius: inherit;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
}

.flip-card-front[data-theme="light"] {
  background:
    radial-gradient(circle at 74% 20%, rgba(216, 151, 156, 0.28), transparent 14%),
    linear-gradient(180deg, #fff3e5 0%, #f7dbc8 100%);
  color: #2e1418;
}

.flip-card-front[data-theme="night"] {
  background:
    radial-gradient(circle at 16% 20%, rgba(248, 190, 5, 0.2), transparent 16%),
    linear-gradient(180deg, #120206 0%, #530a1d 100%);
}

.flip-card-front[data-theme="gold"] {
  background:
    radial-gradient(circle at 24% 18%, rgba(253, 250, 251, 0.34), transparent 12%),
    linear-gradient(180deg, #f8be05 0%, #f3a513 100%);
  color: #2b1603;
}

.flip-card-back {
  transform: rotateY(180deg);
  background:
    radial-gradient(circle at 82% 18%, rgba(248, 190, 5, 0.28), transparent 16%),
    radial-gradient(circle at 18% 16%, rgba(216, 151, 156, 0.24), transparent 12%),
    linear-gradient(125deg, rgba(18, 2, 6, 0.88) 4%, rgba(83, 10, 29, 0.9) 24%, rgba(146, 18, 52, 0.92) 46%, rgba(198, 33, 68, 0.92) 64%, rgba(226, 100, 38, 0.92) 82%, rgba(248, 190, 5, 0.88) 100%);
  color: #fdfafb;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.flip-card-back[data-theme="light"] {
  background:
    radial-gradient(circle at 74% 20%, rgba(216, 151, 156, 0.28), transparent 14%),
    linear-gradient(180deg, rgba(46, 20, 24, 0.95) 0%, rgba(83, 10, 29, 0.98) 100%);
  color: #fdfafb;
}

.flip-card-back[data-theme="night"] {
  background:
    radial-gradient(circle at 16% 20%, rgba(248, 190, 5, 0.2), transparent 16%),
    linear-gradient(180deg, rgba(18, 2, 6, 0.92) 0%, rgba(83, 10, 29, 0.96) 100%);
  color: #fdfafb;
}

.flip-card-back[data-theme="gold"] {
  background:
    radial-gradient(circle at 24% 18%, rgba(253, 250, 251, 0.34), transparent 12%),
    linear-gradient(180deg, rgba(43, 22, 3, 0.92) 0%, rgba(83, 10, 29, 0.96) 100%);
  color: #fdfafb;
}

.flip-card-back::-webkit-scrollbar {
  width: 6px;
}

.flip-card-back::-webkit-scrollbar-track {
  background: transparent;
}

.flip-card-back::-webkit-scrollbar-thumb {
  background: rgba(253, 250, 251, 0.3);
  border-radius: 3px;
}

.flip-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 2.85rem;
  height: 2.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(253, 250, 251, 0.3);
  background: rgba(18, 2, 6, 0.7);
  color: #fdfafb;
  cursor: pointer;
  transition: background-color 220ms ease, transform 220ms ease;
}

.flip-close:hover {
  background: rgba(18, 2, 6, 0.9);
  transform: scale(1.05);
}

.flip-close:focus-visible {
  outline: 2px solid rgba(248, 190, 5, 0.92);
  outline-offset: 2px;
}

.flip-card-media {
  position: absolute;
  inset: 0;
}

.flip-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flip-card-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 2, 6, 0.1) 0%, rgba(18, 2, 6, 0.72) 100%);
  pointer-events: none;
}

.flip-card-content {
  position: relative;
  z-index: 2;
  margin-top: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flip-card-content h3 {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(2.2rem, 9vw, 3.3rem);
  line-height: 0.88;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.flip-description {
  margin: 0;
  line-height: 1.65;
  max-width: 24rem;
}

.flip-hint {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  padding: 0.4rem 0.65rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(253, 250, 251, 0.14);
  color: inherit;
  border: 1px solid rgba(253, 250, 251, 0.14);
}

.flip-front-socials {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.flip-front-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: rgba(253, 250, 251, 0.12);
  color: inherit;
  text-decoration: none;
  transition: background-color 220ms ease, transform 220ms ease;
}

.flip-front-social-link:hover,
.flip-front-social-link:focus-visible {
  background: rgba(253, 250, 251, 0.25);
  transform: translateY(-1px);
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

.stage-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.stage-chip::before {
  content: "";
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.9;
}

.stage-main {
  background: rgba(253, 250, 251, 0.16);
  color: #fdfafb;
  border: 1px solid rgba(253, 250, 251, 0.16);
}

.stage-tent {
  background: rgba(83, 10, 29, 0.22);
  color: #fdfafb;
  border: 1px solid rgba(253, 250, 251, 0.16);
}

.stage-loft {
  background: rgba(248, 190, 5, 0.22);
  color: #fdfafb;
  border: 1px solid rgba(253, 250, 251, 0.16);
}

.flip-back-media {
  width: 100%;
  max-height: 12rem;
  overflow: hidden;
}

.flip-back-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flip-back-content {
  position: relative;
  z-index: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flip-back-content h3 {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(1.8rem, 7vw, 2.5rem);
  line-height: 0.88;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.flip-bio {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(253, 250, 251, 0.9);
}

.performance-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.55rem;
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.38rem 0.62rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(253, 250, 251, 0.1);
  border: 1px solid rgba(253, 250, 251, 0.14);
  color: rgba(253, 250, 251, 0.88);
}

.performance-item {
  display: grid;
  grid-template-columns: minmax(10.5rem, 10.5rem) minmax(0, 1fr);
  align-items: center;
  gap: 0.55rem;
}

.performance-stage-chip {
  width: 100%;
  justify-content: flex-start;
}

.performance-time {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(253, 250, 251, 0.76);
}

@media (max-width: 29.99rem) {
  .performance-item {
    grid-template-columns: 1fr;
  }

  .performance-stage-chip {
    justify-content: flex-start;
  }
}

.flip-embed-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.flip-embed {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.flip-embed-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(253, 250, 251, 0.7);
  margin: 0;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.flip-embed iframe:not(.video-container iframe) {
  width: 100%;
  height: 80px;
  border-radius: 0.75rem;
  border: none;
  background: rgba(0, 0, 0, 0.4);
}

.flip-socials {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(253, 250, 251, 0.25);
}

.flip-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: rgba(253, 250, 251, 0.18);
  color: #fdfafb;
  text-decoration: none;
  transition: opacity 220ms ease, transform 220ms ease, background-color 220ms ease;
}

.flip-social-link:hover {
  background: rgba(253, 250, 251, 0.3);
  transform: translateY(-2px);
}

.flip-social-link:focus-visible {
  outline: 2px solid rgba(248, 190, 5, 0.92);
  outline-offset: 2px;
}

.social-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.flip-front-social-link:hover,
.flip-front-social-link:focus-visible {
  background: rgba(253, 250, 251, 0.25);
  transform: translateY(-1px);
}

.flip-close .close-icon {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
