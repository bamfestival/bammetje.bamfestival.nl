export type ArtistTheme = 'dark' | 'light' | 'night' | 'gold'

export type StageKey = 'hoofdpodium' | 'tommy-loods'

export interface ArtistPerformance {
  stage: StageKey
  starttime: string
  endtime?: string
}

export interface ArtistRecord {
  title: string
  subtitle: string
  bio?: string
  tags?: string[]
  weight?: number
  published: boolean
  performances: ArtistPerformance[]
  theme?: ArtistTheme
  image_landscape: string
  image_square?: string
  image_landscape_alt?: string
  image_square_alt?: string
  spotify?: string
  youtube?: string
  website?: string
  instagram?: string
  facebook?: string
}
