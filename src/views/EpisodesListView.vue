<template>
  <div class="episodes-view">
    <h1 class="title">Эпизоды</h1>
    <table class="episodes-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Номер эпизода</th>
          <th>Описание</th>
          <th>Путь эпизода</th>
          <th>Аниме ID</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="episode in episodes" :key="episode.id">
          <td>{{ episode.id }}</td>
          <td>{{ episode.episode_number }}</td>
          <td>{{ episode.title }}</td>
          <td>{{ episode.episode_path }}</td>
          <td>{{ episode.anime_id }}</td>
          <td>
            <button class="delete-btn" @click="deleteEpisode(episode.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link :to="{ name: 'episodesForm' }">
      <button class="create-btn">Создать эпизод</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import EpisodesFormView from './EpisodesFormView.vue';

export default {
  components: {
    EpisodesFormView,
  },
  name: "EpisodesListView",
  data() {
    return {
      episodes: [],
      showCreateForm: false,
      editedEpisode: null,
    };
  },
  created() {
    this.fetchEpisodes();
  },
  methods: {
    async fetchEpisodes() {
      const episodes = await axios.get("http://localhost:5000/episodes").then(res => res.data)
      this.episodes = episodes;
    },
    createEpisode(episode) {
      // Create a new episode on the server
      this.episodes.push(episode);
      this.showCreateForm = false;
    },
    editEpisode(episode) {
      this.editedEpisode = { ...episode };
    },
    updateEpisode(episode) {
      // Update the episode on the server
      const index = this.episodes.findIndex((e) => e.id === episode.id);
      this.episodes.splice(index, 1, episode);
      this.editedEpisode = null;
    },
    async deleteEpisode(id) {
      await axios.delete("http://localhost:5000/episodes/" + id, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => res.data)
      this.episodes = this.episodes.filter((e) => e.id !== id);
    },
  },
};
</script>

<style scoped>
.episodes-view {
  padding: 2rem;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.episodes-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.2rem;
}

.episodes-table th,
.episodes-table td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.episodes-table th {
  background-color: #f2f2f2;
}

.edit-btn,
.delete-btn,
.create-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.create-btn {
  display: block;
  margin: 2rem auto 0 auto;
  background-color: #2196F3;
  color: white;
}

.form-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
