import type { ArtistRecord } from '~/app/types/artist'
import siteData from '../../content/site.json'

type SponsorRecord = {
  title: string
  logo?: string
  logo_alt?: string
  link?: string
  weight?: number
}

const artistModules = import.meta.glob('../../content/artists/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, ArtistRecord>

const sponsorModules = import.meta.glob('../../content/sponsors/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, SponsorRecord>

const artistRecords = Object.values(artistModules)
const sponsorRecords = Object.values(sponsorModules)

export const useSite = () => {
  const defaultStages = {
    hoofdpodium: { name: 'Rabobank Stage', description: 'Het grote buitenpodium' },
    'tommy-loods': { name: 'IPA Stage', description: 'Industriële binnenruimte' },
  }

  const defaultConfig = {
    title: 'Bammetje 2026',
    tagline: 'Gratis mini-editie van BAM! Festival in Hengelo',
    date: '23 mei 2026',
    location: 'Broedplaats Oogst, Hengelo',
    address: 'Esrein 53, 7553 CX Hengelo',
    coordinates: [52.2580145, 6.7915145] as [number, number],
    slogan: 'Klein, maar BAM.',
    subtitle: '23 MEI 2026 • BROEDPLAATS OOGST, HENGELO',
    hero: {
      eyebrow: 'Home',
      bannerAriaLabel: 'Headerbeeld van Bammetje',
      imageAlt: 'Sfeerbeeld van Bammetje 2026 met golvende BAM-vormen in rood, oranje en geel',
    },
    eventDate: '23 mei',
    eventDay: 'Zaterdag',
    eventTime: '14:00 – 23:00',
    admission: 'Gratis',
    admissionNote: 'Kom langs zonder ticketstress',
    artistRelease: {
      publishAt: '2026-03-31T12:00:00+02:00',
      bannerEyebrow: 'Line-up update',
      bannerTitle: 'To be announced',
      bannerText: 'De line-up en timetable verschijnen hier automatisch zodra de artiesten live gaan.',
      bannerTimePrefix: 'Live vanaf',
    },
    stages: defaultStages,
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
      heading: 'Twee podia. Zeven namen. Meteen overzicht.',
      intro: 'De line-up staat nu per podium ingedeeld, zodat je meteen ziet hoe de dag is opgebouwd: grotere publieksmomenten op de Rabobank Stage en dj-sets op de IPA Stage. Zo voelt het programma vanaf de eerste blik helder, levendig en goed verspreid over de dag.'
    },
    timetableSection: {
      title: 'Timetable',
      heading: 'Van middag tot laat.',
      intro: 'De timetable laat nu in één oogopslag zien hoe Bammetje zich van 14:00 tot laat over twee podia ontvouwt. Zo zie je meteen waar je begint, waar de piekmomenten zitten en hoe de avond per podium doorloopt.',
      fallbackTimeLabel: 'Bevestigd',
      timeLabelSuffix: '',
      blocks: {
        hoofdpodium: {
          tag: 'Grotere namen',
          note: 'Hier vallen de grotere publieksmomenten samen: de acts die de dag open trekken, de druk opvoeren en het veld echt in beweging zetten.'
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
      intro: 'Bammetje voelt sterker als partners en stad zichtbaar meedoen. Deze strook houdt de uiting compact, warm en duidelijk herkenbaar.',
      article: undefined,
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
      route: 'https://www.google.com/maps/search/?api=1&query=Esrein+53%2C+7553+CX+Hengelo',
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
      },
      navItems: [
        { href: '#top', label: 'Home' },
        { href: '#line-up', label: 'Line-up' },
        { href: '#timetable', label: 'Timetable' },
        { href: '#info', label: 'Info' },
        { href: '#locatie', label: 'Locatie' },
      ],
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

  const getDefinedValue = <T>(...values: Array<T | undefined>) =>
    values.find(value => value !== undefined)

  const config = computed(() => {
    const source = siteData as DeepPartial<SiteConfig>
    const sourceHero = source.hero || {}
    const sourceStages = source.stages || {}
    const sourceArtistRelease = source.artistRelease || {}
    const sourceAbout = source.about || {}
    const sourceLineUp = source.lineUp || {}
    const sourceTimetableSection = source.timetableSection || {}
    const sourceInfoSection = source.infoSection || {}
    const sourceSponsorsSection = source.sponsorsSection || {}
    const sourceFooter = source.footer || {}
    const sourceMeta = source.meta || {}
    const sourceLinks = source.links || {}
    const sourceUi = source.ui || {}
    const sourceNav = sourceUi.nav || {}
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
      artistRelease: {
        ...defaultConfig.artistRelease,
        ...sourceArtistRelease,
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
          ...sourceNav,
        },
        navItems: sourceUi.navItems || [
          { href: '#line-up', label: getDefinedValue(sourceNav.lineUp, defaultConfig.ui.nav.lineUp) ?? defaultConfig.ui.nav.lineUp },
          { href: '#timetable', label: getDefinedValue(sourceNav.timetable, defaultConfig.ui.nav.timetable) ?? defaultConfig.ui.nav.timetable },
          { href: '#info', label: getDefinedValue(sourceNav.info, defaultConfig.ui.nav.info) ?? defaultConfig.ui.nav.info },
          { href: '#locatie', label: getDefinedValue(sourceNav.location, defaultConfig.ui.nav.location) ?? defaultConfig.ui.nav.location },
        ],
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

  const artistReleaseNow = useState('artist-release-now', () => Date.now())

  if (import.meta.client) {
    onMounted(() => {
      artistReleaseNow.value = Date.now()
    })
  }

  const artistPublishDate = computed(() => {
    const value = config.value?.artistRelease?.publishAt
    if (!value) return null

    const timestamp = Date.parse(value)
    if (Number.isNaN(timestamp)) return null

    return new Date(timestamp)
  })

  const artistPublishLabel = computed(() => {
    if (!artistPublishDate.value) return ''

    return new Intl.DateTimeFormat('nl-NL', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Amsterdam',
    }).format(artistPublishDate.value)
  })

  const artistsArePublished = computed(() => {
    if (!artistPublishDate.value) return true
    return artistReleaseNow.value >= artistPublishDate.value.getTime()
  })

  return {
    siteConfig: config,
    getStageName,
    stages,
    artistPublishDate,
    artistPublishLabel,
    artistsArePublished,
  }
}

export const useArtists = () => {
  const { artistsArePublished } = useSite()

  const sortedArtists = computed<ArtistRecord[]>(() => {
    if (!artistsArePublished.value) return []
    return [...artistRecords]
      .map(artist => ({
        ...artist,
        published: artist.published ?? false,
        performances: artist.performances ?? [],
      }))
      .filter(artist => artist.published)
      .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0) || a.title.localeCompare(b.title, 'nl'))
  })

  const artistsWithPerformances = computed(() =>
    sortedArtists.value.filter(artist => artist.performances.length > 0)
  )

  const hasPerformances = computed(() => artistsWithPerformances.value.length > 0)

  return {
    artists: sortedArtists,
    artistsWithPerformances,
    hasPerformances,
    artistsArePublished,
  }
}

export const useSponsors = () => {
  const mappedSponsors = computed(() => {
    return [...sponsorRecords]
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
