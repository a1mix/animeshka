<template>
  <div>
    <h1>Episodes</h1>
    <ul>
      <li v-for="episode in episodes" :key="episode.id" @click="handleEpisodeClick(episode)">
        {{ episode.episode_number }} - {{ episode.title }}
      </li>
    </ul>
    <div v-if="selectedEpisode">
      <h2>{{ selectedEpisode.title }}</h2>
      <video controls>
        <source :src="`/episodes/${selectedEpisode.id}`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <h2>Create New Episode</h2>
    <form @submit.prevent="createEpisode">
      <div>
        <label for="episode_number">Episode Number:</label>
        <input id="episode_number" v-model="newEpisodeNumber" type="number" required>
      </div>
      <div>
        <label for="anime_id">Anime ID:</label>
        <input id="anime_id" v-model="newAnimeId" type="number" required>
      </div>
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="newTitle" type="text" required>
      </div>
      <div>
        <label for="file">Episode File:</label>
        <input id="file" type="file" @change="onFileChange" required>
      </div>
      <button type="submit">Create Episode</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EpisodesFormView",
  data() {
    return {
      episodes: [],
      selectedEpisode: null,
      newEpisodeNumber: null,
      newAnimeId: null,
      newTitle: '',
      newFile: null
    }
  },
  created() {
    this.fetchEpisodes()
  },
  methods: {
    async fetchEpisodes() {
      try {
        const response = await axios.get('http://localhost:5000/episodes/')
        this.episodes = response.data
      } catch (error) {
        console.error('Error fetching episodes:', error)
      }
    },
    async handleEpisodeClick(episode) {
      try {
        const response = await axios.get(`http://localhost:5000/episodes/${episode.id}`)
        this.selectedEpisode = episode
      } catch (error) {
        console.error('Error fetching episode video:', error)
      }
    },
    onFileChange(event) {
      this.newFile = event.target.files[0]
    },
    async createEpisode() {
      try {
        const formData = new FormData()
        formData.append('episode_number', this.newEpisodeNumber)
        formData.append('anime_id', this.newAnimeId)
        formData.append('title', this.newTitle)
        formData.append('file', this.newFile)
        console.log(this.newFile)

        await axios.post('http://localhost:5000/episodes/', formData)
        this.fetchEpisodes()
        this.resetNewEpisodeForm()
      } catch (error) {
        console.error('Error creating episode:', error)
      }
    },
    resetNewEpisodeForm() {
      this.newEpisodeNumber = null
      this.newAnimeId = null
      this.newTitle = ''
      this.newFile = null
    }
  }
}
</script>
