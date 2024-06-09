<template>
  <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
  <div class="container" v-if="!notFound && !isLoading">
    <div class="photoAndEpisodeBtn">
      <img :src="anime.images.jpg.large_image_url" alt="" class="anime-image">
      <router-link v-if="isUserAdmin" :to="{ name: 'episodesForm', query: { id: anime.mal_id } }">
        <v-btn color="#2D74CF">Добавить эпизод</v-btn>
      </router-link>
    </div>
    <div class="info">
      <h1>{{ anime.title }}</h1>
      <div class="rating" v-if="anime.score">
        <svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" stroke="#ffffff">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <rect id="Icons" x="-512" y="-192" width="1280" height="800" style="fill:none;"></rect>
            <g id="Icons1" serif:id="Icons">
              <g id="Strike"> </g>
              <g id="H1"> </g>
              <g id="H2"> </g>
              <g id="H3"> </g>
              <g id="list-ul"> </g>
              <g id="hamburger-1"> </g>
              <g id="hamburger-2"> </g>
              <g id="list-ol"> </g>
              <g id="list-task"> </g>
              <g id="trash"> </g>
              <g id="vertical-menu"> </g>
              <g id="horizontal-menu"> </g>
              <g id="sidebar-2"> </g>
              <g id="Pen"> </g>
              <g id="Pen1" serif:id="Pen"> </g>
              <g id="clock"> </g>
              <g id="external-link"> </g>
              <g id="hr"> </g>
              <g id="info"> </g>
              <g id="warning"> </g>
              <g id="plus-circle"> </g>
              <g id="minus-circle"> </g>
              <g id="vue"> </g>
              <g id="cog"> </g>
              <g id="logo"> </g>
              <path id="star"
                d="M32.001,9.188l5.666,17.438l18.335,0l-14.833,10.777l5.666,17.438l-14.834,-10.777l-14.833,10.777l5.666,-17.438l-14.834,-10.777l18.335,0l5.666,-17.438Z">
              </path>
              <g id="radio-check"> </g>
              <g id="eye-slash"> </g>
              <g id="eye"> </g>
              <g id="toggle-off"> </g>
              <g id="shredder"> </g>
              <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g>
              <g id="react"> </g>
              <g id="check-selected"> </g>
              <g id="turn-off"> </g>
              <g id="code-block"> </g>
              <g id="user"> </g>
              <g id="coffee-bean"> </g>
              <g id="coffee-beans">
                <g id="coffee-bean1" serif:id="coffee-bean"> </g>
              </g>
              <g id="coffee-bean-filled"> </g>
              <g id="coffee-beans-filled">
                <g id="coffee-bean2" serif:id="coffee-bean"> </g>
              </g>
              <g id="clipboard"> </g>
              <g id="clipboard-paste"> </g>
              <g id="clipboard-copy"> </g>
              <g id="Layer1"> </g>
            </g>
          </g>
        </svg>
        <span class="score">{{ anime.score }}</span>
      </div>
      <p class="synopsis" v-if="anime.synopsis">{{ anime.synopsis }}</p>
      <span class="episodes" v-if="anime.episodes">Эпизоды: {{ anime.episodes }}</span>
      <span class="duration" v-if="anime.duration">Описание: {{ anime.duration }}</span>
      <span>Статус: {{ anime.status ? anime.status : 'no status' }}</span>
      <div class="genres" v-if="anime.genres.length > 0">
        <span>Жанры: </span>
        <div v-for="(genre, i) in anime.genres" :key="genre.mal_id">
          <span>{{ genre.name }}{{ i < anime.genres.length - 1 ? ',' : '' }}</span>
        </div>
      </div>

      <div class="trailer" v-if="anime.trailer.embed_url">
        <p>Трейлер: </p>
        <iframe width="500" height="300" :src="anime.trailer.embed_url" frameborder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      </div>
      <div class="btn-ep-num">
        <div v-for="(video, i) in anime.videos" :key="video.episode_number">
          <router-link :to="{ name: 'watch', params: { filename: video.episode_path } }">
            <button> {{ video.episode_number }} серия</button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="anime.characters" class="characters item2">
      <h3 v-if="anime.characters" class="characters-title">Главные герои</h3>
      <div v-for="character in anime.characters" :key="character.character.mal_id">
        <img :src="character.character.images.jpg.image_url" alt="" class="character-img">
        <h3>{{ character.character.name }}</h3>
      </div>
    </div>

    <div v-if="anime.relations" class="relations item2">
      <h3 class="relations-title">Связанные релизы</h3>
      <div v-for="relation in anime.relations" :key="relation.relation">
        <h3>{{ relation.relation }}</h3>
        <div v-for="entry in relation.entry" :key="entry.mal_id">
          <a :href="'/anime/' + entry.mal_id" v-if="entry.type = 'anime'">{{ entry.name }}</a>
          <p v-else>{{ entry.name }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="notFound">
    Не найдено
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'
import animePlaceholder from '@/interfaces/animePlaceholder'
import { IAnime } from '@/interfaces/IAnime';
import ReviewCard from '@/components/ReviewCard.vue'

export default defineComponent({
  name: 'AnimeView',
  data() {
    return {
      anime: {} as IAnime,
      notFound: false,
      isLoading: true
    }
  },
  components: { ReviewCard },
  async mounted() {
    this.fetchAnime()
  },
  computed: {
    ...mapGetters(['allAnimes', 'isAuth', 'currentUser']),
    isUserAdmin() {
      if (this.currentUser.roles) {
        const admin = this.currentUser.roles.find((role: any) => role.value === "ADMIN")
        if (admin) return true
        else return false
      }
    }
  },

  methods: {
    ...mapMutations(['updateIsAuth', 'setUser']),
    async fetchAnime() {
      this.notFound = false
      this.isLoading = true
      this.anime = animePlaceholder
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${this.$route.params.id}/full`)
          .then(res => res.ok ? res.json() : this.notFound = true)
          .then(data => data.data)

        if (response) {
          this.anime = response
          const characters = await fetch(`https://api.jikan.moe/v4/anime/${this.$route.params.id}/characters`)
            .then(res => res.ok ? res.json() : this.notFound = true)
            .then(data => data.data)
          const mainCharacters = characters.filter((character: any) => {
            if (character.role === "Main") return true
            else return false
          })
          if (characters) {
            this.anime.characters = mainCharacters
          }

          

          const episodes = await axios.get(`http://localhost:5000/episodes/${this.$route.params.id}`)
            .then(res => res.data)

          if (episodes) {
            this.anime.videos = episodes
          }

        }
        else {
          this.notFound = true
        }
        this.isLoading = false
      }
      catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 10px 20px;
  width: 100%;
}

.anime-image {
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.item2 {
  padding-top: 20px;
  grid-column: span 2;
}

svg {
  width: 24px;
  height: 24px;
}

a {
  text-decoration: none;
}

p {
  text-align: left;
}

button {
  padding: 10px;
  margin: 5px;
  background-color: #7b1fa2;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.btn-ep-num {
  display: flex;
  flex-wrap: wrap;
}

.title {
  font-size: 28px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  fill: black;
}

.score {
  font-size: 24px;
}

.synopsis {
  color: #a4a4a4;
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding-left: 20px;
}

.genres {
  display: flex;
}

.character {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
}

.character-img {
  max-width: 300px;
  border-radius: 10px;
}

.characters {
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto auto auto;
}

.relations {
  display: grid;
  grid-template-columns: auto auto auto;
}

.relations-title {
  grid-column: span 3;
}

.characters-title {
  grid-column: span 4;
}

@media screen and (max-width: 768px) {
  img {
    width: 33%;
  }

  .title {
    font-size: 16px;
  }

  .info {
    gap: 3px
  }

  svg {
    width: 14px;
    height: 14px;
  }

  .score {
    font-size: 14px;
  }


  .synopsis {
    font-size: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .episodes {
    font-size: 10px;
  }
}
</style>