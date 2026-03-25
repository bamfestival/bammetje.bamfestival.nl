import type { ArtistRecord } from '~/app/types/artist'

export const useSite = () => {
  const { data: siteConfig } = useAsyncData('site-config', () =>
    queryCollection('site').first()
  )

  const defaultStages = {
    hoofdpodium: { name: 'Hoofdpodium', description: 'Het grote buitenpodium' },
    'de-tent': { name: 'De Tent', description: 'Overdekte tent' },
    'tommy-loods': { name: 'Tommy-Loods', description: 'Industriële binnenruimte' },
  }

  const defaultConfig = {
    title: 'Bammetje 2026',
    tagline: 'Gratis mini-editie van BAM! Festival in Hengelo',
    date: '23 mei 2026',
    location: 'Broedplaats Oogst, Hengelo',
    address: 'Esrein 53, 7553 CX Hengelo',
    coordinates: [52.2621, 6.7937] as [number, number],
    slogan: 'Klein, maar BAM.',
    subtitle: 'BAM! Festival kan dit jaar niet landen in het Prins Bernhardplantsoen, maar stil blijft het niet: Bammetje houdt een dag vol livemuziek, ontmoeting en zomergevoel levend.',
    hero: {
      eyebrow: 'Mini BAM, maximale vibe',
      label: 'Gratis mini-editie van BAM! Festival',
      title: 'Bammetje',
      bannerAriaLabel: 'Headerbeeld van Bammetje',
      imageAlt: 'Sfeerbeeld van Bammetje 2026 met golvende BAM-vormen in rood, oranje en geel',
      primaryActionLabel: 'Bekijk line-up',
      primaryActionTarget: '#line-up',
      secondaryActionLabel: 'Praktische info',
      secondaryActionTarget: '#info',
      detailsAriaLabel: 'Belangrijkste evenementdetails',
      details: [
        { value: '23 mei', label: 'Zaterdag in 2026' },
        { value: 'Gratis', label: 'Kom langs zonder ticketstress' },
        { value: 'Oogst', label: 'Broedplaats in Hengelo' }
      ]
    },
    eventDate: '23 mei',
    eventDay: 'Zaterdag',
    eventTime: '14:00 – 23:00',
    admission: 'Gratis',
    admissionNote: 'Kom langs zonder ticketstress',
    stages: defaultStages,
    freeEntry: {
      title: 'Gratis entree',
      location: 'Oogst / Hengelo',
      ariaLabel: 'Kerninformatie Bammetje',
      description: 'Kleiner van opzet, maar nog steeds warm, open en vol muziek.'
    },
    about: {
      title: 'Waarom Bammetje',
      intro: 'Omdat het Prins Bernhardplantsoen wordt verbouwd is er in 2026 geen BAM! Festival. Met Bammetje als kleinere editie houden we een onmisbaar festival toch levend. Want zeg nou zelf: een jaar geen BAM!, is een jaar niet geleefd.',
      points: [
        {
          title: 'Wat blijft hetzelfde?',
          description: 'Het vertrouwde BAM!-gevoel blijft. Samen genieten van livemuziek en een drankje, met dezelfde open en warme sfeer.'
        },
        {
          title: 'Wat is er dit jaar anders?',
          description: 'Het festival vindt eenmalig plaats op een andere locatie in Hengelo: Broedplaats Oogst. Kleiner betekent hier niet minder, maar compacter en dichter op elkaar.'
        },
        {
          title: 'Voor Hengelo en Twente',
          description: 'Bammetje blijft een toegankelijke festivaldag voor iedereen die BAM mist en in 2026 toch samen muziek wil beleven.'
        }
      ]
    },
    lineUp: {
      title: 'Line-up',
      heading: 'Drie podia. Zeven namen. Meteen overzicht.',
      intro: 'De line-up staat nu per podium ingedeeld, zodat je meteen ziet hoe de dag is opgebouwd: grotere publieksmomenten op het Hoofdpodium, liveacts in De Tent en dj-sets in de Tommy-Loods. Zo voelt het programma vanaf de eerste blik helder, levendig en goed verspreid over de dag.'
    },
    timetableSection: {
      title: 'Timetable',
      heading: 'Van middag tot laat.',
      intro: 'De timetable laat nu in één oogopslag zien hoe Bammetje zich van 14:00 tot laat over de drie podia ontvouwt. Zo zie je meteen waar je begint, waar de piekmomenten zitten en hoe de avond per podium doorloopt.',
      fallbackTimeLabel: 'Bevestigd',
      timeLabelSuffix: '',
      blocks: {
        hoofdpodium: {
          tag: 'Grotere namen',
          note: 'Hier vallen de grotere publieksmomenten samen: de acts die de dag open trekken, de druk opvoeren en het veld echt in beweging zetten.'
        },
        'de-tent': {
          tag: 'Live en dichtbij',
          note: 'De Tent is voor de andere liveacts: intiemer, directer en perfect voor een compactere setting.'
        },
        'tommy-loods': {
          tag: 'Dj-hoek',
          note: 'Hier bouwt de dag op van losse grooves naar een vollere dansvloer: de plek voor dj-sets die Bammetje richting avond trekken.'
        }
      }
    },
    infoSection: {
      title: 'Info',
      heading: 'Alles op een rij.',
      intro: 'Datum, tijd en plek in een paar tellen helder.',
      items: {
        date: {
          label: 'Datum',
          value: '23 mei 2026',
          description: ''
        },
        time: {
          label: 'Tijd',
          value: '14:00 – 23:00',
          description: ''
        },
        admission: {
          label: 'Toegang',
          value: 'Gratis',
          description: ''
        }
      },
      locationTitle: 'Locatie',
      locationHeading: 'Oogst',
      locationDescription: 'Bammetje strijkt dit jaar neer bij Broedplaats Oogst: een rauwe, warme plek die precies past bij deze kleinere editie.',
      routeLabel: 'Route openen',
      bamFestivalLabel: 'Bekijk BAM! Festival'
    },
    sponsorsSection: {
      title: 'Partners',
      heading: 'Lokaal gedragen.',
      intro: 'Bammetje voelt sterker als partners en stad zichtbaar meedoen. Deze strook houdt de uiting compact, warm en duidelijk herkenbaar.'
    },
    footer: {
      brand: 'Bammetje',
      text: 'De mini-editie van BAM! Festival voor Hengelo en Twente. Gratis, warm en klaar om in 2026 even flink uit te pakken.',
      quote: 'Samen genieten van livemuziek en een drankje. Dat is uiteindelijk waar BAM altijd om draait.'
    },
    meta: {
      description: 'Bammetje is de gratis mini-editie van BAM! Festival op zaterdag 23 mei 2026 bij Broedplaats Oogst in Hengelo. Bekijk de sfeer, praktische info en updates.',
      ogDescription: 'Klein, maar BAM. Op zaterdag 23 mei 2026 strijkt Bammetje neer bij Broedplaats Oogst in Hengelo.',
      ogImage: 'https://bammetje.bamfestival.nl/assets/hero/bammetje-2026-header.jpg',
      ogImageAlt: 'Promotiebeeld van Bammetje 2026 met de BAM!-huisstijlkleuren'
    },
    links: {
      bamFestival: 'https://www.bamfestival.nl/',
      route: 'https://www.google.com/maps/search/?api=1&query=Broedplaats+Oogst+Hengelo',
    },
    ui: {
      skipLinkLabel: 'Naar content',
      mainNavAriaLabel: 'Hoofdnavigatie',
      mobileNavAriaLabel: 'Mobiele navigatie',
      menuButtonLabel: 'Open menu',
      backToTopLabel: 'Naar boven',
      nav: {
        lineUp: 'Line-up',
        timetable: 'Timetable',
        info: 'Info',
        location: 'Locatie',
        freeEntry: 'Gratis entree',
      },
      socialLabels: {
        instagram: 'Volg Bammetje op Instagram',
        linkedin: 'Volg Bammetje op LinkedIn',
        youtube: 'Bekijk Bammetje op YouTube',
        facebook: 'Volg Bammetje op Facebook',
      },
      artistCard: {
        closeLabel: 'Sluit kaart en ga terug',
        youtubeLabel: 'YouTube',
        spotifyLabel: 'Spotify',
        instagramAriaLabel: 'Volg {artist} op Instagram',
        youtubeAriaLabel: 'Bekijk {artist} op YouTube',
        spotifyAriaLabel: 'Luister naar {artist} op Spotify',
        facebookAriaLabel: 'Volg {artist} op Facebook',
        websiteAriaLabel: 'Bezoek de website van {artist}',
        detailsAriaLabel: '{artist} details',
      },
    }
  }

  type SiteConfig = typeof defaultConfig
  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends readonly unknown[]
      ? T[K]
      : T[K] extends object
        ? DeepPartial<T[K]>
        : T[K]
  }

  type _SponsorRecord = {
    title: string
    logo?: string
    logo_alt?: string
    link?: string
    weight?: number
  }

  const getDefinedValue = <T>(...values: Array<T | undefined>) =>
    values.find(value => value !== undefined)

  const config = computed(() => {
    const source = (siteConfig.value || {}) as DeepPartial<SiteConfig>
    const sourceHero = source.hero || {}
    const sourceStages = source.stages || {}
    const sourceFreeEntry = source.freeEntry || {}
    const sourceAbout = source.about || {}
    const sourceLineUp = source.lineUp || {}
    const sourceTimetableSection = source.timetableSection || {}
    const sourceInfoSection = source.infoSection || {}
    const sourceSponsorsSection = source.sponsorsSection || {}
    const sourceFooter = source.footer || {}
    const sourceMeta = source.meta || {}
    const sourceLinks = source.links || {}
    const sourceUi = source.ui || {}
    const sourceInfoItems = sourceInfoSection.items || {}

    return {
      ...defaultConfig,
      ...source,
      hero: {
        ...defaultConfig.hero,
        ...sourceHero,
      },
      stages: {
        ...defaultConfig.stages,
        ...sourceStages,
      },
      freeEntry: {
        ...defaultConfig.freeEntry,
        ...sourceFreeEntry,
      },
      about: {
        ...defaultConfig.about,
        ...sourceAbout,
        points: sourceAbout.points || defaultConfig.about.points,
      },
      lineUp: {
        ...defaultConfig.lineUp,
        ...sourceLineUp,
      },
      timetableSection: {
        ...defaultConfig.timetableSection,
        ...sourceTimetableSection,
        blocks: {
          ...defaultConfig.timetableSection.blocks,
          ...sourceTimetableSection.blocks,
        },
      },
      infoSection: {
        ...defaultConfig.infoSection,
        ...sourceInfoSection,
        items: {
          ...defaultConfig.infoSection.items,
          ...sourceInfoItems,
          date: {
            ...defaultConfig.infoSection.items.date,
            ...sourceInfoItems.date,
            value: getDefinedValue(sourceInfoItems.date?.value, source.date, defaultConfig.date) ?? defaultConfig.date,
            description: getDefinedValue(
              sourceInfoItems.date?.description,
              source.eventDay ? `${source.eventDay}. Klaar om buiten weer BAM-gevoel op te bouwen.` : undefined,
              `${defaultConfig.eventDay}. Klaar om buiten weer BAM-gevoel op te bouwen.`,
            ) ?? '',
          },
          time: {
            ...defaultConfig.infoSection.items.time,
            ...sourceInfoItems.time,
            value: getDefinedValue(sourceInfoItems.time?.value, source.eventTime, defaultConfig.eventTime) ?? defaultConfig.eventTime,
          },
          admission: {
            ...defaultConfig.infoSection.items.admission,
            ...sourceInfoItems.admission,
            value: getDefinedValue(sourceInfoItems.admission?.value, source.admission, defaultConfig.admission) ?? defaultConfig.admission,
            description: getDefinedValue(sourceInfoItems.admission?.description, source.admissionNote, defaultConfig.admissionNote) ?? '',
          },
        },
        locationHeading: getDefinedValue(sourceInfoSection.locationHeading, source.location?.split(',')[0], defaultConfig.infoSection.locationHeading)
          ?? defaultConfig.infoSection.locationHeading,
      },
      sponsorsSection: {
        ...defaultConfig.sponsorsSection,
        ...sourceSponsorsSection,
      },
      footer: {
        ...defaultConfig.footer,
        ...sourceFooter,
      },
      meta: {
        ...defaultConfig.meta,
        ...sourceMeta,
      },
      links: {
        ...defaultConfig.links,
        ...sourceLinks,
      },
      ui: {
        ...defaultConfig.ui,
        ...sourceUi,
        nav: {
          ...defaultConfig.ui.nav,
          ...sourceUi.nav,
        },
        socialLabels: {
          ...defaultConfig.ui.socialLabels,
          ...sourceUi.socialLabels,
        },
        artistCard: {
          ...defaultConfig.ui.artistCard,
          ...sourceUi.artistCard,
        },
      },
    }
  })

  const getStageName = (stageKey: string | undefined): string => {
    if (!stageKey) return ''
    const stages = config.value?.stages || defaultStages
    return stages[stageKey as keyof typeof stages]?.name || stageKey
  }

  const stages = computed(() => {
    return config.value?.stages || defaultStages
  })

  return {
    siteConfig: config,
    getStageName,
    stages,
  }
}

export const useArtists = () => {
  const { data: artists } = useAsyncData('artists', () =>
    queryCollection('artists').all()
  )

  const sortedArtists = computed<ArtistRecord[]>(() => {
    if (!artists.value) return []
    return [...(artists.value as ArtistRecord[])]
      .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0) || a.title.localeCompare(b.title, 'nl'))
  })

  return { artists: sortedArtists }
}

export const useSponsors = () => {
  const { data: sponsors } = useAsyncData('sponsors', () =>
    queryCollection('sponsors').all()
  )

  const mappedSponsors = computed(() => {
    if (!sponsors.value) return []
    return [...(sponsors.value as _SponsorRecord[])]
      .sort((a, b) => Number(b.weight ?? 0) - Number(a.weight ?? 0) || a.title.localeCompare(b.title, 'nl'))
      .map((sponsor) => ({
        title: sponsor.title,
        logo: sponsor.logo || '/assets/logos/default-640.webp',
        logo_alt: sponsor.logo_alt || `Logo van ${sponsor.title}`,
        link: sponsor.link || '#',
        weight: Number(sponsor.weight ?? 0),
      }))
  })

  return { sponsors: mappedSponsors }
}
