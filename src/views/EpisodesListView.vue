<template>
    <div>
      <h1>Episodes</h1>
      <table>
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
              <button @click="editEpisode(episode)">Edit</button>
              <button @click="deleteEpisode(episode.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showCreateForm = true">Создать эпизод</button>
      <episode-form v-if="showCreateForm" @save="createEpisode" @cancel="showCreateForm = false" />
      <episode-form v-if="editedEpisode" :episode="editedEpisode" @save="updateEpisode" @cancel="editedEpisode = null" />
    </div>
  </template>
  
  <script>
  import EpisodeForm from './EpisodeForm.vue';
  
  export default {
    components: {
      EpisodeForm,
    },
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
      fetchEpisodes() {
        // Fetch episodes from the server
        this.episodes = [
          // Example data
          { id: 1, episode_number: 1, title: 'The Beginning', episode_path: 'episode1.mp3', anime_id: 1 },
          { id: 2, episode_number: 2, title: 'The Middle', episode_path: 'episode2.mp3', anime_id: 1 },
          { id: 3, episode_number: 3, title: 'The End', episode_path: 'episode3.mp3', anime_id: 1 },
        ];
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
      deleteEpisode(id) {
        // Delete the episode from the server
        this.episodes = this.episodes.filter((e) => e.id !== id);
      },
    },
  };
  </script>
  