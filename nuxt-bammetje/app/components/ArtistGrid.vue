<script setup lang="ts">
import type { ArtistRecord } from '~/app/types/artist'

defineProps<{
  artists: ArtistRecord[]
}>()
</script>

<template>
  <div class="artist-grid">
    <ArtistCard
      v-for="artist in artists"
      :key="artist.title"
      :artist="artist"
    />
  </div>
</template>

<style scoped>
.artist-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .artist-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .artist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
