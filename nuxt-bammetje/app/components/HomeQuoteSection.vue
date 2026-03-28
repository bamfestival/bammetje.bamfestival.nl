<script setup lang="ts">
const { siteConfig } = useSite()
</script>

<template>
  <section class="section section-quote">
    <div class="frame quote-stack">
      <div class="quote-ribbon">
        <h2 class="sr-only">Waarom Bammetje blijft hangen</h2>
        <span class="quote-kicker">De kern van Bammetje</span>
        <p>{{ siteConfig.footer.quote }}</p>
        <span class="quote-signoff">Kleiner van schaal, hetzelfde gevoel.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote-stack {
  display: grid;
}
</style>
