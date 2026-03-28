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
        hero: z.object({
          eyebrow: z.string(),
          label: z.string(),
          title: z.string(),
          bannerAriaLabel: z.string(),
          imageAlt: z.string(),
          primaryActionLabel: z.string(),
          primaryActionTarget: z.string(),
          secondaryActionLabel: z.string(),
          secondaryActionTarget: z.string(),
          detailsAriaLabel: z.string(),
          details: z.array(z.object({
            value: z.string(),
            label: z.string(),
          })),
        }).optional(),
        eventDate: z.string(),
        eventDay: z.string(),
        eventTime: z.string(),
        admission: z.string(),
        admissionNote: z.string(),
        freeEntry: z.object({
          title: z.string(),
          location: z.string(),
          ariaLabel: z.string().optional(),
          description: z.string()
        }).optional(),
        about: z.object({
          title: z.string(),
          intro: z.string(),
          points: z.array(z.object({
            title: z.string(),
            description: z.string()
          }))
        }).optional(),
        lineUp: z.object({
          title: z.string(),
          heading: z.string(),
          intro: z.string(),
        }).optional(),
        timetableSection: z.object({
          title: z.string(),
          heading: z.string(),
          intro: z.string(),
          fallbackTimeLabel: z.string().optional(),
          timeLabelSuffix: z.string().optional(),
          blocks: z.object({
            hoofdpodium: z.object({
              tag: z.string(),
              note: z.string(),
            }),
            'de-tent': z.object({
              tag: z.string(),
              note: z.string(),
            }),
            'tommy-loods': z.object({
              tag: z.string(),
              note: z.string(),
            }),
          }),
        }).optional(),
        infoSection: z.object({
          title: z.string(),
          heading: z.string(),
          intro: z.string(),
          items: z.object({
            date: z.object({
              label: z.string(),
              value: z.string(),
              description: z.string(),
            }),
            time: z.object({
              label: z.string(),
              value: z.string(),
              description: z.string(),
            }),
            admission: z.object({
              label: z.string(),
              value: z.string(),
              description: z.string(),
            }),
          }),
          locationTitle: z.string(),
          locationHeading: z.string(),
          locationDescription: z.string(),
          routeLabel: z.string(),
          bamFestivalLabel: z.string(),
        }).optional(),
        sponsorsSection: z.object({
          title: z.string(),
          heading: z.string(),
          intro: z.string(),
          article: z.object({
            headline: z.string(),
            paragraphs: z.array(z.string()),
            credit: z.string(),
          }).optional(),
        }).optional(),
        footer: z.object({
          brand: z.string(),
          text: z.string(),
          quote: z.string(),
          address: z.string().optional(),
          bamFestival: z.object({
            name: z.string(),
            url: z.string(),
            address: z.string(),
          }).optional(),
          social: z.object({
            instagram: z.string(),
            facebook: z.string(),
            youtube: z.string(),
            linkedin: z.string(),
          }).optional(),
        }).optional(),
        meta: z.object({
          description: z.string(),
          ogDescription: z.string(),
          ogImage: z.string(),
          ogImageAlt: z.string()
        }).optional(),
        links: z.record(z.string()).optional(),
        ui: z.object({
          skipLinkLabel: z.string(),
          mainNavAriaLabel: z.string(),
          mobileNavAriaLabel: z.string(),
          menuButtonLabel: z.string(),
          backToTopLabel: z.string(),
          nav: z.object({
            lineUp: z.string(),
            timetable: z.string(),
            info: z.string(),
            location: z.string(),
            freeEntry: z.string(),
          }).optional(),
          navItems: z.array(z.object({
            label: z.string(),
            href: z.string(),
          })).optional(),
          socialLabels: z.object({
            instagram: z.string(),
            linkedin: z.string(),
            youtube: z.string(),
            facebook: z.string(),
          }),
          artistCard: z.object({
            closeLabel: z.string(),
            youtubeLabel: z.string(),
            spotifyLabel: z.string(),
            instagramAriaLabel: z.string(),
            youtubeAriaLabel: z.string(),
            spotifyAriaLabel: z.string(),
            facebookAriaLabel: z.string(),
            websiteAriaLabel: z.string(),
            detailsAriaLabel: z.string(),
          }),
        }).optional(),
        stages: z.record(z.object({
          name: z.string(),
          description: z.string(),
        })).optional(),
      })
    }),
    artists: defineCollection({
      type: 'data',
      source: 'artists/*.json',
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        bio: z.string().optional(),
        bodytext: z.string().optional(),
        tags: z.array(z.string()).default([]),
        spotify: z.string().optional(),
        youtube: z.string().optional(),
        website: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        image_landscape: z.string(),
        image_landscape_alt: z.string(),
        image_square: z.string(),
        image_square_alt: z.string(),
        performances: z.array(z.object({
          stage: z.enum(['hoofdpodium', 'de-tent', 'tommy-loods']),
          starttime: z.string(),
          endtime: z.string().optional(),
        })).default([]),
        weight: z.number().int().min(0).max(5).default(0),
        theme: z.enum(['dark', 'light', 'night', 'gold']).default('dark'),
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
        weight: z.number().int().min(0).max(5).default(0),
      })
    }),
  }
})
