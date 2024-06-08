<template>
    <div>
      <h2>{{ episode ? 'Edit Episode' : 'Create Episode' }}</h2>
      <form @submit.prevent="saveEpisode">
        <div>
          <label for="episode-number">Номер эпизода:</label>
          <input id="episode-number" v-model="episode.episode_number" type="number" required />
        </div>
        <div>
          <label for="title">Описание:</label>
          <input id="title" v-model="episode.title" type="text" />
        </div>
        <div>
          <label for="episode-path">Путь эпизода:</label>
          <input id="episode-path" v-model="episode.episode_path" type="text" required />
        </div>
        <div>
          <label for="anime-id">Аниме ID:</label>
          <input id="anime-id" v-model="episode.anime_id" type="number" required />
        </div>
        <div>
          <button type="submit">Сохранить</button>
          <button type="button" @click="cancelEpisode">Отмена</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      episode: {
        type: Object,
        default: () => ({
          episode_number: null,
          title: '',
          episode_path: '',
          anime_id: null,
        }),
     },
 },
    methods: {
        saveEpisode() {
            this.$emit('Сохранить', { ...this.episode });
        },
        cancelEpisode() {
            this.$emit('Отмена');
        },
    },
};
</script>