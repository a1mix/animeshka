import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: () => ({
    login: '',
    password: '',
    animes: [],
    mangas: [],
    typesOfAnime: ['all', 'tv', 'movie', 'ova', 'special', 'music'],
    totalAnimePages: 1,
    isLoading: false,
    isResult: true
  }),
  getters: {
    allAnimes(state) {
      return state.animes
    },
    allMangas(state) {
      return state.mangas
    },
    animeTypes(state) {
      return state.typesOfAnime
    },
    totalAnimePages(state) {
      return state.totalAnimePages
    },
    isLoading(state) {
      return state.isLoading
    },
    isResult(state) {
      return state.isResult
    }
  },
  mutations: {
    updateAnimes(state, animes) {
      state.animes = animes
    },
    updateTotalAnimePages(state, pages) {
      state.totalAnimePages = pages
    },
    updateIsLoading(state, value) {
      state.isLoading = value
    },
    updateIsResult(state, value) {
      state.isResult = value
    }
  },
  actions: {
    async fetchAnimes(context, payload) {
      context.commit('updateIsResult', true)
      context.commit('updateIsLoading', true)
      console.log(payload)

      const { s: searchParams, f: flag } = payload

      let res;

      /// flag === 0: fetching from v-pagination 
      /// flag === 1: fetching from v-btn
      /// flag === 2: fetching from mounted()

      if (flag === 2) {
        if (context.state.animes.length > 0) {
          return context.commit('updateIsLoading', false)
        }
        try {
          console.log("fetching")
          res = await axios.get(`https://api.jikan.moe/v4/anime`, {
            params: {
              limit: 15,
              page: 1,
              order_by: 'score',
              sort: 'desc'
            }
          })
        }
        catch (err) {
          console.error(err)
        }
      }
      else {
        if (flag === 1) {
          searchParams.page = 1
        }
        try {
          if (searchParams.selectedType == '' || searchParams.selectedType == 'all') {
            console.log("fetching")
            res = await axios.get(`https://api.jikan.moe/v4/anime`, {
              params: {
                q: searchParams.searchQuery,
                page: searchParams.page,
                limit: searchParams.limit,
                order_by: 'score',
                sort: 'desc',
              }
            })
          }
          else {
            console.log("fetching")
            res = await axios.get(`https://api.jikan.moe/v4/anime`, {
              params: {
                q: searchParams.searchQuery,
                page: searchParams.page,
                limit: searchParams.limit,
                order_by: 'score',
                sort: 'desc',
                type: searchParams.selectedType
              }
            })
          }
        }
        catch (e) {
          console.log(e)
        }
      }

      let totalAnimePages = res?.data.pagination.last_visible_page

      if (totalAnimePages == 1) { totalAnimePages = 0 }

      context.commit('updateTotalAnimePages', totalAnimePages)

      if (res?.data.data.length) {
        context.commit('updateAnimes', res.data.data)
        context.commit('updateIsResult', true)
      }
      else {
        context.commit('updateIsResult', false)
      }
      context.commit('updateIsLoading', false)
    }
  }
})
