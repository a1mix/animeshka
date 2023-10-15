export interface IAnime {
  mal_id: number
  url: string
  images: Images
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: Broadcast
  producers: Producer[]
  licensors: Licensor[]
  studios: Studio[]
  genres: Genre[]
  explicit_genres: ExplicitGenre[]
  themes: Theme[]
  demographics: Demographic[]
  relations: Relation[]
  theme: Theme2
  external?: External[]
  streaming?: Streaming[],
  characters?: RootCharacter[]
}

interface Images {
  jpg: Jpg
  webp: Webp
}

interface Jpg {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface Webp {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
}

interface Title {
  type: string
  title: string
}

interface Aired {
  from: string
  to: string
  prop: Prop
}

interface Prop {
  from: From
  to: To
  string: string
}

interface From {
  day: number
  month: number
  year: number
}

interface To {
  day: number
  month: number
  year: number
}

interface Broadcast {
  day: string
  time: string
  timezone: string
  string: string
}

interface Producer {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Licensor {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Studio {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

interface ExplicitGenre {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Theme {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Demographic {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Relation {
  relation: string
  entry: Entry[]
}

interface Entry {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Theme2 {
  openings: string[]
  endings: string[]
}

interface External {
  name: string
  url: string
}

interface Streaming {
  name: string
  url: string
}

interface RootCharacter {
  character: Character
  role: string
  voice_actors: VoiceActor[]
}

interface Character {
  mal_id: number
  url: string
  images: Images
  name: string
}

interface VoiceActor {
  person: Person
  language: string
}

interface Person {
  mal_id: number
  url: string
  images: Images
  name: string
}
