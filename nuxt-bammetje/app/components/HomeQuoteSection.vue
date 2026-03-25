<script setup lang="ts">
const { siteConfig } = useSite()
</script>

<template>
  <section class="section section-quote">
    <div class="frame">
      <div class="quote-ribbon">
        <span class="quote-kicker">Waar Bam om draait</span>
        <p>{{ siteConfig.footer.quote }}</p>
        <span class="quote-signoff">BAM! Festival geest, in het klein</span>
      </div>
    </div>
  </section>
</template>
