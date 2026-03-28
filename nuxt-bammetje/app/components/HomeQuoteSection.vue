<script setup lang="ts">
const { siteConfig } = useSite()
</script>

<template>
  <section class="section section-quote">
    <div class="frame quote-stack">
      <div class="quote-ribbon">
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
