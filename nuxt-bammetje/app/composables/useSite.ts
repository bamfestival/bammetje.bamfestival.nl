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
    subtitle: 'Op zaterdag 23 mei 2026 landt de mini-editie van BAM! Festival bij Broedplaats Oogst in Hengelo: gratis muziek, warme sfeer en een dag die voelt als een compacte uitbarsting van alles waar BAM voor staat.',
    hero: {
      eyebrow: 'Mini BAM, maximale vibe',
      label: 'Gratis mini-editie van BAM! Festival',
      title: 'Bammetje',
      bannerAriaLabel: 'Headerbeeld van Bammetje',
      imageAlt: 'Bammetje headerbeeld voor de mini-editie van BAM! Festival',
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
      description: 'Van middag tot avond, met ruimte voor muziek, drinken en die herkenbare BAM-sfeer in een compactere vorm.'
    },
    about: {
      title: 'Waarom Bammetje',
      intro: 'BAM! Festival kan in 2026 niet neerstrijken in het Prins Bernhardplantsoen, maar stil blijft het niet. Vanuit liefde voor muziek, organiseren en vrijwilligersenergie komt er een kleinere editie op Oogst.',
      points: [
        {
          title: 'Geen vervanging, wel dezelfde geest',
          description: 'Bammetje is bewust kleiner dan het festival in het park, maar moet dezelfde open, warme en lokale energie vasthouden.'
        },
        {
          title: 'Gebouwd voor Hengelo en Twente',
          description: 'De site moet snel duidelijk maken dat dit een gratis, toegankelijke festivaldag is voor het lokale publiek dat BAM mist.'
        },
        {
          title: 'Compact in info, rijk in sfeer',
          description: 'Niet volstoppen met details. Eerst gevoel, dan de praktische zekerheid om gewoon te komen.'
        }
      ]
    },
    lineUp: {
      title: 'Line-up',
      heading: 'Drie podia. Zeven namen. Meteen overzicht.',
      intro: "De eerste indeling staat nu vast: de grotere namen op het Hoofdpodium, de dj's in de Tommy-Loods en de andere acts in De Tent. Zo voelt de line-up niet alleen levendiger, maar ook meteen logisch voor bezoekers."
    },
    timetableSection: {
      title: 'Timetable',
      heading: 'Podia nu. Speeltijden straks.',
      intro: 'De precieze programmering komt later. Daarom staat hier geen verzonnen tijdschema, maar wel een heldere podiumindeling die straks direct naar echte speeltijden kan worden vertaald.',
      fallbackTimeLabel: 'Bevestigd',
      blocks: {
        hoofdpodium: {
          tag: 'Grotere namen',
          note: 'Dit podium draagt de grotere publieksmomenten. Speeltijden volgen zodra het schema rond is.'
        },
        'de-tent': {
          tag: 'Live en dichtbij',
          note: 'De Tent is voor de andere liveacts: intiemer, directer en perfect voor een compactere setting.'
        },
        'tommy-loods': {
          tag: 'Dj-hoek',
          note: 'De dj\'s zitten hier samen. Zodra de tijden bekend zijn, kan dit blok direct een echte timetable worden.'
        }
      }
    },
    infoSection: {
      title: 'Info',
      heading: 'Snel snappen. Dan gewoon komen.',
      intro: 'Dit is de kern voor bezoekers uit Hengelo en Twente: waar het is, wanneer het begint en waarom je geen drempel hebt om langs te gaan.',
      items: {
        date: {
          label: 'Datum',
          value: '23 mei 2026',
          description: 'Zaterdag. Klaar om buiten weer BAM-gevoel op te bouwen.'
        },
        time: {
          label: 'Tijd',
          value: '14:00 – 23:00',
          description: 'Van middag tot avond, compact genoeg om overzichtelijk te blijven en lang genoeg om echt sfeer te maken.'
        },
        admission: {
          label: 'Toegang',
          value: 'Gratis',
          description: 'Geen ticket nodig. Gewoon komen, aansluiten en genieten van muziek en een drankje.'
        }
      },
      locationTitle: 'Locatie',
      locationHeading: 'Oogst',
      locationDescription: 'Bammetje landt bij Oogst in Hengelo. Verwacht geen exacte kopie van BAM! Festival in het park, maar een kleinere setting met dezelfde liefde voor livemuziek, ontmoeting en lokale energie.',
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
      ogImageAlt: 'Posterbeeld voor Bammetje 2026'
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

  type _ArtistRecord = {
    title: string
    stage: string
    subtitle: string
    bio?: string
    starttime?: string
    theme?: 'dark' | 'light' | 'night' | 'gold'
    image_landscape: string
    spotify?: string
    youtube?: string
    website?: string
    instagram?: string
    facebook?: string
  }

  type _SponsorRecord = {
    title: string
    logo?: string
    logo_alt?: string
    link?: string
  }

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
            value: sourceInfoItems.date?.value || source.date || defaultConfig.date,
            description: sourceInfoItems.date?.description || `${source.eventDay || defaultConfig.eventDay}. Klaar om buiten weer BAM-gevoel op te bouwen.`,
          },
          time: {
            ...defaultConfig.infoSection.items.time,
            ...sourceInfoItems.time,
            value: sourceInfoItems.time?.value || source.eventTime || defaultConfig.eventTime,
          },
          admission: {
            ...defaultConfig.infoSection.items.admission,
            ...sourceInfoItems.admission,
            value: sourceInfoItems.admission?.value || source.admission || defaultConfig.admission,
            description: sourceInfoItems.admission?.description || source.admissionNote || defaultConfig.admissionNote,
          },
        },
        locationHeading: sourceInfoSection.locationHeading || source.location?.split(',')[0] || defaultConfig.infoSection.locationHeading,
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

  const mappedArtists = computed(() => {
    if (!artists.value) return []
    return (artists.value as _ArtistRecord[]).map((artist) => ({
      name: artist.title,
      stage: artist.stage,
      description: artist.subtitle,
      bio: artist.bio || '',
      time: artist.starttime ? `${artist.starttime} indicatie` : '',
      theme: artist.theme || 'dark',
      image: artist.image_landscape,
      spotify: artist.spotify || '',
      youtube: artist.youtube || '',
      website: artist.website || '',
      instagram: artist.instagram || '',
      facebook: artist.facebook || '',
    }))
  })

  return { artists: mappedArtists }
}

export const useSponsors = () => {
  const { data: sponsors } = useAsyncData('sponsors', () =>
    queryCollection('sponsors').all()
  )

  const mappedSponsors = computed(() => {
    if (!sponsors.value) return []
    return (sponsors.value as _SponsorRecord[]).map((sponsor) => ({
      title: sponsor.title,
      logo: sponsor.logo || '/assets/logos/default-640.webp',
      logo_alt: sponsor.logo_alt || `Logo van ${sponsor.title}`,
      link: sponsor.link || '#',
    }))
  })

  return { sponsors: mappedSponsors }
}
