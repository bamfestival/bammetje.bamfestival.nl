<script setup lang="ts">
import type { ArtistRecord, StageKey } from '~/app/types/artist'

const props = defineProps<{
  artists: ArtistRecord[]
  fallbackTimeLabel: string
  timeLabelSuffix?: string
  blocks: Record<StageKey, { tag: string, note: string }>
}>()

const { getStageName } = useSite()

const stageOrder: StageKey[] = ['hoofdpodium', 'de-tent', 'tommy-loods']

const stageClassMap: Record<StageKey, string> = {
  hoofdpodium: 'time-block-main',
  'de-tent': 'time-block-tent',
  'tommy-loods': 'time-block-loft',
}

const pxPerMinute = 1.35
const minimumCardHeight = 3.6 * 16
const defaultDurationMinutes = 30
const preferredTimelineStart = 14 * 60
const preferredTimelineEnd = 23 * 60

const compareTimes = (left?: string, right?: string) => (left || '').localeCompare(right || '', 'nl')

const slugifyArtist = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const parseTimeToMinutes = (value?: string) => {
  if (!value) return null
  const match = value.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  return hours * 60 + minutes
}

const formatMinutesToLabel = (value: number) => {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

const formatTimeLabel = (starttime?: string, endtime?: string) => {
  if (!starttime) return props.fallbackTimeLabel
  if (endtime) return `${starttime} - ${endtime}`
  return [starttime, props.timeLabelSuffix].filter(Boolean).join(' ')
}

const formatPerformanceTitle = (artist: ArtistRecord) => {
  const subtitle = artist.subtitle?.trim()
  const tags = artist.tags?.filter(Boolean) ?? []
  const parts = [artist.title, subtitle, ...tags].filter(Boolean)
  return parts.join(' • ')
}

const performanceEntries = computed(() =>
  props.artists.flatMap((artist) =>
    artist.performances.map((performance, index) => {
      const startMinutes = parseTimeToMinutes(performance.starttime)
      const rawEndMinutes = parseTimeToMinutes(performance.endtime)
      const endMinutes = rawEndMinutes ?? (startMinutes !== null ? startMinutes + defaultDurationMinutes : null)

      return {
        key: `${artist.title}-${performance.stage}-${performance.starttime}-${index}`,
        title: artist.title,
        tooltip: formatPerformanceTitle(artist),
        artistHref: `#artist-${slugifyArtist(artist.title)}`,
        stage: performance.stage,
        starttime: performance.starttime,
        endtime: performance.endtime,
        startMinutes,
        endMinutes,
      }
    })
  )
)

const timelineStartMinutes = computed(() => {
  const starts = performanceEntries.value
    .map(entry => entry.startMinutes)
    .filter((value): value is number => value !== null)

  if (!starts.length) return preferredTimelineStart
  return Math.min(preferredTimelineStart, ...starts)
})

const timelineEndMinutes = computed(() => {
  const ends = performanceEntries.value
    .map(entry => entry.endMinutes)
    .filter((value): value is number => value !== null)

  if (!ends.length) return preferredTimelineEnd
  const maxEnd = Math.max(preferredTimelineEnd, ...ends)
  return Math.ceil(maxEnd / 30) * 30
})

const timelineHeight = computed(() =>
  Math.max((timelineEndMinutes.value - timelineStartMinutes.value) * pxPerMinute, 28 * 16)
)

const timelineHourMarkers = computed(() => {
  const markers: Array<{ key: string, label: string, offset: number }> = []

  for (let minutes = timelineStartMinutes.value; minutes <= timelineEndMinutes.value; minutes += 60) {
    markers.push({
      key: `hour-${minutes}`,
      label: formatMinutesToLabel(minutes),
      offset: (minutes - timelineStartMinutes.value) * pxPerMinute,
    })
  }

  return markers
})

const timelineGuides = computed(() => {
  const guides: Array<{ key: string, offset: number, major: boolean }> = []

  for (let minutes = timelineStartMinutes.value; minutes <= timelineEndMinutes.value; minutes += 30) {
    guides.push({
      key: `guide-${minutes}`,
      offset: (minutes - timelineStartMinutes.value) * pxPerMinute,
      major: minutes % 60 === 0,
    })
  }

  return guides
})

const stageBlocks = computed(() =>
  stageOrder.map((stage) => ({
    key: stage,
    name: getStageName(stage),
    performances: performanceEntries.value
      .filter(performance => performance.stage === stage)
      .sort((left, right) => compareTimes(left.starttime, right.starttime) || left.title.localeCompare(right.title, 'nl'))
      .map((performance) => {
        const top = performance.startMinutes !== null
          ? (performance.startMinutes - timelineStartMinutes.value) * pxPerMinute
          : 0

        const duration = performance.startMinutes !== null && performance.endMinutes !== null
          ? Math.max(performance.endMinutes - performance.startMinutes, defaultDurationMinutes)
          : defaultDurationMinutes

        return {
          ...performance,
          timeLabel: formatTimeLabel(performance.starttime, performance.endtime),
          top,
          height: Math.max(duration * pxPerMinute, minimumCardHeight),
        }
      }),
    ...props.blocks[stage],
    className: stageClassMap[stage],
  }))
)

</script>

<template>
  <div class="timetable-mobile">
    <div class="mobile-scroll-shell">
      <div class="mobile-scroll-grid">
        <div class="mobile-timeline-corner">Tijd</div>

        <header
          v-for="block in stageBlocks"
          :key="`${block.key}-mobile-header`"
          class="mobile-stage-header"
          :class="block.className"
        >
          <div class="time-label">{{ block.name }}</div>
          <div class="time-tag">{{ block.tag }}</div>
        </header>

        <div class="mobile-timeline-axis" :style="{ '--timeline-height': `${timelineHeight}px` }">
          <div
            v-for="marker in timelineHourMarkers"
            :key="`${marker.key}-mobile`"
            class="mobile-timeline-axis-marker"
            :style="{ top: `${marker.offset}px` }"
          >
            <span>{{ marker.label }}</span>
          </div>
        </div>

        <div
          v-for="block in stageBlocks"
          :key="`${block.key}-mobile-body`"
          class="mobile-stage-column"
          :class="block.className"
          :style="{ '--timeline-height': `${timelineHeight}px` }"
        >
          <div
            v-for="guide in timelineGuides"
            :key="`${block.key}-${guide.key}-mobile`"
            class="mobile-stage-guide"
            :class="{ 'is-major': guide.major }"
            :style="{ top: `${guide.offset}px` }"
          />

          <article
            v-for="performance in block.performances"
            :key="`${performance.key}-mobile`"
            class="mobile-stage-performance"
            :style="{ top: `${performance.top}px`, height: `${performance.height}px` }"
          >
            <a class="mobile-stage-performance-link" :href="performance.artistHref" :title="performance.tooltip">
              <span class="mobile-stage-performance-time">{{ performance.timeLabel }}</span>
              <h3 class="mobile-stage-performance-title">{{ performance.title }}</h3>
            </a>
          </article>
        </div>
      </div>
    </div>
  </div>

  <div class="timetable-desktop">
    <div class="timeline-grid">
      <div class="timeline-corner">Tijd</div>

      <header
        v-for="block in stageBlocks"
        :key="`${block.key}-header`"
        class="timeline-stage-header"
        :class="block.className"
      >
        <div class="timeline-stage-headline">
          <div class="time-label">{{ block.name }}</div>
          <div class="time-tag">{{ block.tag }}</div>
        </div>
        <p class="timeline-stage-note">{{ block.note }}</p>
      </header>

      <div class="timeline-axis" :style="{ '--timeline-height': `${timelineHeight}px` }">
        <div
          v-for="marker in timelineHourMarkers"
          :key="marker.key"
          class="timeline-axis-marker"
          :style="{ top: `${marker.offset}px` }"
        >
          <span>{{ marker.label }}</span>
        </div>
      </div>

      <div
        v-for="block in stageBlocks"
        :key="`${block.key}-body`"
        class="timeline-stage"
        :class="block.className"
        :style="{ '--timeline-height': `${timelineHeight}px` }"
      >
        <div
          v-for="guide in timelineGuides"
          :key="`${block.key}-${guide.key}`"
          class="timeline-guide"
          :class="{ 'is-major': guide.major }"
          :style="{ top: `${guide.offset}px` }"
        />

        <article
          v-for="performance in block.performances"
          :key="performance.key"
          class="timeline-performance"
          :style="{ top: `${performance.top}px`, height: `${performance.height}px` }"
        >
          <a class="timeline-performance-link" :href="performance.artistHref" :title="performance.tooltip">
            <span class="timeline-performance-time">{{ performance.timeLabel }}</span>
            <h3 class="timeline-performance-title">{{ performance.title }}</h3>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timetable-mobile {
  display: block;
}

.mobile-scroll-shell {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.45rem;
  -webkit-overflow-scrolling: touch;
}

.mobile-scroll-grid {
  display: grid;
  grid-template-columns: 4.25rem repeat(3, minmax(11rem, 11rem));
  min-width: 38rem;
  gap: 0.8rem;
  align-items: stretch;
}

.mobile-timeline-corner {
  padding: 1rem 0.35rem 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(83, 10, 29, 0.66);
}

.mobile-stage-header {
  min-height: 5.75rem;
  padding: 1rem 0.95rem 0.9rem;
  border-radius: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  justify-content: space-between;
  background: rgba(253, 250, 251, 0.92);
  border: 1px solid rgba(83, 10, 29, 0.08);
  box-shadow: 0 12px 24px rgba(83, 10, 29, 0.08);
}

.mobile-stage-header .time-label {
  font-size: clamp(1.45rem, 6vw, 1.75rem);
}

.mobile-timeline-axis,
.mobile-stage-column {
  position: relative;
  height: var(--timeline-height);
  min-height: var(--timeline-height);
}

.mobile-timeline-axis {
  border-right: 1px solid rgba(83, 10, 29, 0.14);
}

.mobile-timeline-axis-marker {
  position: absolute;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
}

.mobile-timeline-axis-marker span {
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 0.55rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(83, 10, 29, 0.58);
}

.mobile-stage-column {
  border-radius: 1.45rem;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(253, 250, 251, 0.84), rgba(253, 250, 251, 0.94));
  border: 1px solid rgba(83, 10, 29, 0.09);
  box-shadow: inset 0 1px 0 rgba(253, 250, 251, 0.72);
}

.mobile-stage-guide {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed rgba(83, 10, 29, 0.09);
  transform: translateY(-0.5px);
}

.mobile-stage-guide.is-major {
  border-top-style: solid;
  border-top-color: rgba(83, 10, 29, 0.18);
}

.mobile-stage-performance {
  position: absolute;
  left: 0.55rem;
  right: 0.55rem;
  padding: 0.65rem 0.72rem;
  border-radius: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow: hidden;
  box-shadow: 0 14px 24px rgba(83, 10, 29, 0.14);
}

.mobile-stage-performance-link,
.timeline-performance-link {
  display: flex;
  flex-direction: column;
  gap: inherit;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.mobile-stage-performance-link:focus-visible,
.timeline-performance-link:focus-visible {
  outline: 2px solid rgba(253, 250, 251, 0.92);
  outline-offset: 2px;
}

.mobile-stage-performance-time {
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.84;
}

.mobile-stage-performance-title {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(0.95rem, 4vw, 1.15rem);
  line-height: 0.95;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  text-wrap: balance;
}

.time-block-main {
  --stage-accent: var(--page-red);
}

.time-block-tent {
  --stage-accent: var(--page-orange);
}

.time-block-loft {
  --stage-accent: var(--page-yellow);
}

.time-block-main.mobile-stage-header,
.time-block-main.mobile-stage-column {
  border-top: 0.35rem solid var(--page-red);
}

.time-block-tent.mobile-stage-header,
.time-block-tent.mobile-stage-column {
  border-top: 0.35rem solid var(--page-orange);
}

.time-block-loft.mobile-stage-header,
.time-block-loft.mobile-stage-column {
  border-top: 0.35rem solid var(--page-yellow);
}

.time-block-main .mobile-stage-performance {
  background: linear-gradient(180deg, rgba(198, 33, 68, 0.92), rgba(146, 18, 52, 0.96));
  color: #fdfafb;
}

.time-block-tent .mobile-stage-performance {
  background: linear-gradient(180deg, rgba(226, 100, 38, 0.92), rgba(146, 18, 52, 0.92));
  color: #fdfafb;
}

.time-block-loft .mobile-stage-performance {
  background: linear-gradient(180deg, rgba(248, 190, 5, 0.92), rgba(226, 100, 38, 0.94));
  color: #120206;
}

.time-block-top,
.timeline-stage-headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
}

.time-label {
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--page-burgundy);
}

.time-tag {
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: rgba(83, 10, 29, 0.08);
  color: var(--page-burgundy);
}

.timetable-desktop {
  display: none;
}

@media (min-width: 64rem) {
  .timetable-mobile {
    display: none;
  }

  .timetable-desktop {
    display: block;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.45rem;
    -webkit-overflow-scrolling: touch;
  }

  .timeline-grid {
    display: grid;
    grid-template-columns: 5rem repeat(3, minmax(18rem, 1fr));
    min-width: 61rem;
    gap: 1rem;
    align-items: stretch;
  }

  .timeline-corner {
    padding: 1.2rem 0.8rem 0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(83, 10, 29, 0.66);
  }

  .timeline-stage-header {
    min-height: 8.5rem;
    height: 100%;
    padding: 1.2rem 1.2rem 1rem;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    background:
      linear-gradient(180deg, rgba(253, 250, 251, 0.98), rgba(253, 250, 251, 0.88));
    border: 1px solid rgba(83, 10, 29, 0.08);
    border-top-width: 0.4rem;
    box-shadow: 0 12px 28px rgba(83, 10, 29, 0.08);
  }

  .timeline-stage-note {
    margin: 0.75rem 0 0;
    font-size: 0.9rem;
    line-height: 1.55;
    color: rgba(18, 2, 6, 0.72);
    flex: 1 1 auto;
  }

  .timeline-axis,
  .timeline-stage {
    position: relative;
    height: var(--timeline-height);
    min-height: var(--timeline-height);
  }

  .timeline-axis {
    border-right: 1px solid rgba(83, 10, 29, 0.14);
  }

  .timeline-axis-marker {
    position: absolute;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 0.75rem;
  }

  .timeline-axis-marker span {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(83, 10, 29, 0.6);
  }

  .timeline-stage {
    border-radius: 1.6rem;
    overflow: hidden;
    background:
      linear-gradient(180deg, rgba(253, 250, 251, 0.82), rgba(253, 250, 251, 0.92));
    border: 1px solid rgba(83, 10, 29, 0.09);
    box-shadow: inset 0 1px 0 rgba(253, 250, 251, 0.7);
  }

  .timeline-guide {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px dashed rgba(83, 10, 29, 0.09);
    transform: translateY(-0.5px);
  }

  .timeline-guide.is-major {
    border-top-style: solid;
    border-top-color: rgba(83, 10, 29, 0.18);
  }

  .timeline-performance {
    position: absolute;
    left: 0.8rem;
    right: 0.8rem;
    padding: 0.85rem 0.9rem;
    border-radius: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.45rem;
    overflow: hidden;
    box-shadow: 0 16px 30px rgba(83, 10, 29, 0.14);
    backdrop-filter: blur(4px);
  }

  .timeline-performance-link {
    justify-content: flex-start;
  }

  .time-block-main .timeline-performance {
    background: linear-gradient(180deg, rgba(198, 33, 68, 0.92), rgba(146, 18, 52, 0.96));
    color: #fdfafb;
  }

  .time-block-tent .timeline-performance {
    background: linear-gradient(180deg, rgba(226, 100, 38, 0.92), rgba(146, 18, 52, 0.92));
    color: #fdfafb;
  }

  .time-block-loft .timeline-performance {
    background: linear-gradient(180deg, rgba(248, 190, 5, 0.92), rgba(226, 100, 38, 0.94));
    color: #120206;
  }

  .timeline-performance-time {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.82;
  }

  .timeline-performance-title {
    margin: 0;
    font-family: 'Saira Condensed', sans-serif;
    font-size: clamp(1.05rem, 1.25vw, 1.45rem);
    line-height: 0.95;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
}
</style>
