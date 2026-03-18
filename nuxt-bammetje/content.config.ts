import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    site: defineCollection({
      type: 'data',
      source: 'site.json',
      schema: z.object({
        title: z.string(),
        tagline: z.string(),
        date: z.string(),
        location: z.string(),
        address: z.string(),
        coordinates: z.tuple([z.number(), z.number()]),
        slogan: z.string(),
        subtitle: z.string(),
        eventDate: z.string(),
        eventDay: z.string(),
        eventTime: z.string(),
        admission: z.string(),
        admissionNote: z.string(),
        freeEntry: z.object({
          title: z.string(),
          location: z.string(),
          description: z.string()
        }),
        about: z.object({
          title: z.string(),
          intro: z.string(),
          points: z.array(z.object({
            title: z.string(),
            description: z.string()
          }))
        }),
        footer: z.object({
          brand: z.string(),
          text: z.string(),
          quote: z.string()
        }),
        meta: z.object({
          description: z.string(),
          ogDescription: z.string(),
          ogImage: z.string(),
          ogImageAlt: z.string()
        }),
        links: z.object({
          bamFestival: z.string(),
          route: z.string(),
          hengelo: z.string(),
          hartVanZuid: z.string()
        })
      })
    }),
    artists: defineCollection({
      type: 'data',
      source: 'artists/*.json',
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        bodytext: z.string().optional(),
        tags: z.array(z.string()).default([]),
        spotify: z.string().optional(),
        youtube: z.string().optional(),
        image_landscape: z.string(),
        image_landscape_alt: z.string(),
        image_square: z.string(),
        image_square_alt: z.string(),
        stage: z.enum(['Hoofdpodium', 'De Tent', 'Tommy-Loods']),
        starttime: z.string().optional(),
        endtime: z.string().optional(),
        theme: z.enum(['dark', 'light', 'night', 'gold']).default('dark'),
      })
    }),
    performances: defineCollection({
      type: 'data',
      source: 'performances/*.json',
      schema: z.object({
        artist: z.string(),
        stage: z.enum(['Hoofdpodium', 'De Tent', 'Tommy-Loods']),
        starttime: z.string(),
        endtime: z.string().optional(),
        date: z.string().optional(),
      })
    }),
    sponsors: defineCollection({
      type: 'data',
      source: 'sponsors/*.json',
      schema: z.object({
        title: z.string(),
        logo: z.string(),
        logo_alt: z.string(),
        link: z.string(),
      })
    }),
  }
})
