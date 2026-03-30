<script setup lang="ts">
const { siteConfig } = useSite()
const { artists, hasPerformances } = useArtists()

const structuredData = computed(() => {
  const config = siteConfig.value
  const performers = artists.value.map(artist => ({
    '@type': 'MusicGroup',
    name: artist.title,
    description: artist.subtitle,
    image: artist.image_square || artist.image_landscape || undefined,
    sameAs: [
      artist.website,
      artist.instagram,
      artist.facebook,
      artist.youtube,
      artist.spotify,
    ].filter(Boolean),
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicEvent',
        name: config.title,
        description: config.meta.description,
        startDate: '2026-05-23T14:00:00+02:00',
        endDate: '2026-05-23T23:00:00+02:00',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        image: [config.meta.ogImage],
        url: 'https://bammetje.bamfestival.nl/',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://bammetje.bamfestival.nl/',
        },
        location: {
          '@type': 'Place',
          name: config.location,
          address: {
            '@type': 'PostalAddress',
            streetAddress: config.address,
            addressLocality: 'Hengelo',
            postalCode: '7553 CX',
            addressCountry: 'NL',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: config.coordinates[0],
            longitude: config.coordinates[1],
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'BAM! Festival',
          url: config.links.bamFestival,
        },
        performer: performers,
      },
      {
        '@type': 'WebPage',
        name: config.title,
        url: 'https://bammetje.bamfestival.nl/',
        description: config.meta.description,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: config.meta.ogImage,
        },
        about: {
          '@type': 'MusicEvent',
          name: config.title,
        },
        mainContentOfPage: [
          'Hero',
          'Waarom Bammetje',
          'Line-up',
          ...(hasPerformances.value ? ['Timetable'] : []),
          'Info',
          'Partners',
        ],
      },
    ],
  }
})

const structuredDataJson = computed(() => JSON.stringify(structuredData.value))

useHead({
  script: [
    {
      key: 'home-structured-data',
      type: 'application/ld+json',
      textContent: structuredDataJson,
    },
  ],
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeStorySection />
    <HomeLineupSection />
    <HomeTimetableSection />
    <HomeInfoSection />
    <HomeQuoteSection />
    <HomeSponsorsSection />
  </div>
</template>
