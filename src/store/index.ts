import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    login: '',
    password: '',
    animes: []
  }),
  getters: {
    allAnimes(state) {
      return state.animes
    }
  },
  mutations: {
    updateAnimes(state, animes) {
      state.animes = animes
    }
  },
  actions: {
    async fetchAnimes(context) {
      if (context.state.animes.length == 0) {
        console.log("fetching")
        const res = await fetch(`https://api.jikan.moe/v4/anime?limit=20&order_by=score&sort=desc`)
        .then(res => res.json())
        .then(data => data.data)
        context.commit('updateAnimes', res)
      }
    },
    async searchAnimes(context, searchParams) {
      if (searchParams.selectedType == '' || searchParams.selectedType == 'all') {
        console.log("fetching")
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchParams.searchQuery}&order_by=score&sort=desc`)
        .then(res => res.json())
        .then(data => data.data)
        context.commit('updateAnimes', res)
      }
      else {
        console.log("fetching")
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchParams.searchQuery}&type=${searchParams.selectedType}&order_by=score&sort=desc`)
        .then(res => res.json())
        .then(data => data.data)
        context.commit('updateAnimes', res)
      }
    }
  }
})
