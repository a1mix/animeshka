<template>
  <div class="episodes-form-view" v-if="!isResult">
    <h2 class="form-title">Create New Episode</h2>
    <form @submit.prevent="createEpisode" class="episode-form">
      <div class="form-group">
        <label for="episode_number" class="form-label">Episode Number:</label>
        <input id="episode_number" v-model="newEpisodeNumber" type="number" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="anime_id" class="form-label">Anime ID:</label>
        <input id="anime_id" v-model="newAnimeId" type="number" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="title" class="form-label">Title:</label>
        <input id="title" v-model="newTitle" type="text" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="file" class="form-label">Episode File:</label>
        <input id="file" type="file" @change="onFileChange" required class="form-input" />
      </div>
      <button type="submit" class="form-submit-button" v-if="!isLoading">
        Добавить
      </button>
      <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
    </form>
  </div>
  <div v-if="isResult">
    <h2>Эпизод добавлен!</h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EpisodesFormView",
  data() {
    return {
      newEpisodeNumber: null,
      newAnimeId: null,
      newTitle: '',
      newFile: null,
      isLoading: false,
      isResult: false,
    }
  },
  created() {
    this.newAnimeId = this.$route.query.id;
  },
  methods: {
    onFileChange(event) {
      this.newFile = event.target.files[0]
    },
    async createEpisode() {
      try {
        this.isLoading = true
        const formData = new FormData()
        formData.append('episode_number', this.newEpisodeNumber)
        formData.append('anime_id', this.newAnimeId)
        formData.append('title', this.newTitle)
        formData.append('file', this.newFile, this.newFile.name);

        await axios.post('http://localhost:5000/episodes/', formData).then(res => {
          this.isLoading = false
          this.isResult = true
        })
        // this.fetchEpisodes()
        // this.resetNewEpisodeForm()
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

<style scoped>
.episodes-form-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.episode-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: bold;
  color: #555;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-submit-button {
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit-button:hover {
  background-color: #3a7cc2;
}
</style>
