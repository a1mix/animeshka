<template>
  <v-sheet width="700" class="mx-auto bg-black">
    <v-form ref="form">
      <v-text-field v-model="searchParams.searchQuery" label="Search...">
      </v-text-field>
      <v-autocomplete clearable label="Types" v-model="searchParams.selectedType" :items="animeTypes">
      </v-autocomplete>
    </v-form>
    <v-btn @click.prevent="fetchAnimes({ s: searchParams, f: 1 })" class="bg-purple-darken-2 d-block mx-auto" width="600">
      Search
    </v-btn>
  </v-sheet>
  <h2 v-if="isLoading">
    Loading...
  </h2>
  <div class="animeList" v-if="isResult">
    <AnimeCard v-for="anime in allAnimes" :key="anime.mal_id" :anime="anime" />
  </div>
  <h2 v-if="!isResult">
    No results found
  </h2>

  <div class="text-center">
    <v-pagination v-model="searchParams.page" :length="totalAnimePages" :total-visible="7" prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right" @click="fetchAnimes({ s: searchParams, f: 0 })"></v-pagination>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import AnimeCard from '@/components/AnimeCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'AnimesView',
  components: {
    AnimeCard
  },
  data() {
    return {
      searchParams: {
        selectedType: '',
        searchQuery: '',
        limit: 15,
        page: 1
      }
    }
  },
  computed: mapGetters(['allAnimes', 'animeTypes', 'totalAnimePages', 'isLoading', 'isResult']),
  methods: mapActions(['fetchAnimes', 'fetchAnimes']),
  async mounted() {
    this.fetchAnimes({
      s: {
        limit: 15,
        page: 1
      }, f: 2
    });
  }
})

</script>

<style scoped>
.animeList {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  flex-direction: column;
  margin-top: 20px;
}

form {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

input {
  border: 1px solid rgb(255, 255, 255);
  padding: 5px;
  border-radius: 7px;
}

svg {
  width: 16px;
  height: 16px;
}

@media screen and (max-width: 768px) {
  input {
    padding: 3px;
    width: 60%;
  }
}
</style>