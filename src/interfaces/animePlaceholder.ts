import { IAnime } from './IAnime';

let animePlaceholder: IAnime = {
    mal_id: 0,
    url: '',
    images: {
        jpg: {
            image_url: '',
            small_image_url: '',
            large_image_url: 'https://placehold.co/400x600'
        },
        webp: {
            image_url: '',
            small_image_url: '',
            large_image_url: 'https://placehold.co/400x600'
        }
    },
    trailer: {
        embed_url: 'https://placehold.co/600x400',
        youtube_id: '',
        url: ''
    },
    title: '',
    type: '',
    episodes: 0,
    status: '',
    score: 0,
    synopsis: '',
    videos: [],
    year: 0,
    genres: [],
    streaming: [],
    approved: false,
    titles: [],
    title_english: '',
    title_japanese: '',
    title_synonyms: [],
    source: '',
    airing: false,
    aired: {
        from: '',
        to: '',
        prop: {
            from: {
                day: 0,
                month: 0,
                year: 0
            },
            to: {
                day: 0,
                month: 0,
                year: 0
            },
            string: ''
        }
    },
    duration: '',
    rating: '',
    scored_by: 0,
    rank: 0,
    popularity: 0,
    members: 0,
    favorites: 0,
    background: '',
    season: '',
    broadcast: {
        day: '',
        time: '',
        timezone: '',
        string: ''
    },
    producers: [],
    licensors: [],
    studios: [],
    explicit_genres: [],
    themes: [],
    demographics: [],
    relations: [],
    theme: {
        openings: [],
        endings: []
    },
    external: [],
    characters: [{
        role: '',
        character: {
            mal_id: 0,
            url: '',
            images: {
                jpg: {
                    image_url: 'https://placehold.co/200x300',
                    small_image_url: '',
                    large_image_url: ''
                },
                webp: {
                    image_url: '',
                    small_image_url: '',
                    large_image_url: ''
                }
            },
            name: ''
        },
        voice_actors: [
            
        ]
    }]
}

export default animePlaceholder