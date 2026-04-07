<script setup lang="ts">
import type { ArtistRecord, StageKey } from '~/app/types/artist'

const props = defineProps<{
  artists: ArtistRecord[]
  fallbackTimeLabel: string
  timeLabelSuffix?: string
  blocks: Partial<Record<StageKey, { tag: string, note: string }>>
}>()

const { getStageName } = useSite()

const stageOrder: StageKey[] = ['hoofdpodium', 'tommy-loods', 'veld']

const stageClassMap: Record<StageKey, string> = {
  hoofdpodium: 'time-block-main',
  'tommy-loods': 'time-block-loft',
  veld: 'time-block-tent',
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
    ...(props.blocks[stage] || { tag: '', note: '' }),
    className: stageClassMap[stage],
  }))
)

const mobileTimelineEntries = computed(() =>
  performanceEntries.value
    .slice()
    .sort((left, right) =>
      compareTimes(left.starttime, right.starttime)
      || stageOrder.indexOf(left.stage) - stageOrder.indexOf(right.stage)
      || left.title.localeCompare(right.title, 'nl')
    )
    .map((performance) => {
      const block = stageBlocks.value.find(stage => stage.key === performance.stage)

      return {
        ...performance,
        timeLabel: formatTimeLabel(performance.starttime, performance.endtime),
        stageName: block?.name || getStageName(performance.stage),
        stageTag: block?.tag || '',
        className: block?.className || stageClassMap[performance.stage],
      }
    })
)

const desktopGridStyle = computed(() => ({
  gridTemplateColumns: `5rem repeat(${stageBlocks.value.length}, minmax(18rem, 1fr))`,
  minWidth: `${5 + stageBlocks.value.length * 18 + stageBlocks.value.length * 1}rem`,
}))

</script>

<template>
  <div class="timetable-mobile">
    <div class="mobile-agenda">
      <article
        v-for="performance in mobileTimelineEntries"
        :key="`${performance.key}-mobile-list`"
        class="mobile-agenda-item"
        :class="performance.className"
      >
        <a class="mobile-agenda-link" :href="performance.artistHref" :title="performance.tooltip">
          <div class="mobile-agenda-time">
            <span class="mobile-agenda-time-label">{{ performance.timeLabel }}</span>
          </div>
          <div class="mobile-agenda-body">
            <div class="mobile-agenda-stage-row">
              <span class="mobile-agenda-stage">{{ performance.stageName }}</span>
              <span v-if="performance.stageTag" class="mobile-agenda-tag">{{ performance.stageTag }}</span>
            </div>
            <h3 class="mobile-agenda-title">{{ performance.title }}</h3>
          </div>
        </a>
      </article>
      <div v-if="!mobileTimelineEntries.length" class="mobile-agenda-empty">
        {{ fallbackTimeLabel }}
      </div>
    </div>
  </div>

  <div class="timetable-desktop">
    <div class="timeline-grid" :style="desktopGridStyle">
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

.mobile-agenda {
  display: grid;
  gap: 0.9rem;
}

.mobile-agenda-item {
  border-radius: 1.35rem;
  overflow: hidden;
  box-shadow: var(--shadow-stage-card);
}

.mobile-agenda-link,
.timeline-performance-link {
  display: flex;
  gap: 0;
  width: 100%;
  color: inherit;
  text-decoration: none;
}

.mobile-agenda-link:focus-visible,
.timeline-performance-link:focus-visible {
  outline: 2px solid rgba(253, 250, 251, 0.92);
  outline-offset: 2px;
}

.mobile-agenda-time {
  flex: 0 0 5.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.8rem;
  background: rgba(18, 2, 6, 0.14);
  border-right: 1px solid var(--border-glass-dark);
}

.mobile-agenda-time-label {
  display: inline-flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.35;
  text-align: center;
}

.mobile-agenda-body {
  min-width: 0;
  flex: 1 1 auto;
  padding: 1rem 1rem 1rem 1.05rem;
  display: grid;
  gap: 0.45rem;
}

.mobile-agenda-stage-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.mobile-agenda-stage,
.mobile-agenda-tag {
  display: inline-flex;
  align-items: center;
  min-height: 1.9rem;
  border-radius: 999px;
  padding: 0.32rem 0.72rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mobile-agenda-stage {
  background: var(--surface-glass-light-strong);
  border: 1px solid var(--border-glass-dark);
}

.mobile-agenda-tag {
  background: rgba(18, 2, 6, 0.12);
}

.mobile-agenda-title {
  margin: 0;
  font-family: 'Saira Condensed', sans-serif;
  font-size: clamp(1.15rem, 5vw, 1.45rem);
  line-height: 0.95;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  text-wrap: balance;
  overflow-wrap: anywhere;
}

.mobile-agenda-empty {
  padding: 1rem 1.1rem;
  border-radius: 1.1rem;
  background: var(--surface-panel-warm);
  border: 1px solid var(--border-stage-card);
  color: var(--text-notice-muted);
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

.time-block-main.mobile-agenda-item {
  background: var(--surface-stage-main);
  color: #fdfafb;
}

.time-block-tent.mobile-agenda-item {
  background: linear-gradient(180deg, rgba(226, 100, 38, 0.92), rgba(146, 18, 52, 0.92));
  color: #fdfafb;
}

.time-block-loft.mobile-agenda-item {
  background: var(--surface-stage-loft);
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
  background: var(--surface-tint-soft);
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
    background: var(--surface-panel-warm-strong);
    border: 1px solid var(--border-stage-card);
    border-top-width: 0.4rem;
    box-shadow: var(--page-shadow);
  }

  .timeline-stage-note {
    margin: 0.75rem 0 0;
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--text-notice-muted);
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
    background: var(--surface-stage-card);
    border: 1px solid var(--border-stage-card);
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
    box-shadow: var(--shadow-stage-card);
    backdrop-filter: blur(4px);
  }

  .timeline-performance-link {
    justify-content: flex-start;
  }

  .time-block-main .timeline-performance {
    background: var(--surface-stage-main);
    color: #fdfafb;
  }

  .time-block-tent .timeline-performance {
    background: linear-gradient(180deg, rgba(226, 100, 38, 0.92), rgba(146, 18, 52, 0.92));
    color: #fdfafb;
  }

  .time-block-loft .timeline-performance {
    background: var(--surface-stage-loft);
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
