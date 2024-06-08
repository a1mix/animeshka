<template>
  <v-sheet width="600" class="mx-auto bg-white">
    <v-form ref="form" @submit.prevent="fetchAnimes({ s: searchParams, f: 1 })" class="d-block">
      <v-text-field :model-value="searchParams.searchQuery" @update:model-value="setSearchQuery(searchParams.searchQuery = $event)" label="Поиск...">
      </v-text-field>
      <v-autocomplete clearable label="Типы" :model-value="searchParams.selectedType" @update:model-value="setSelectedType(searchParams.selectedType = $event)" :items="animeTypes">
      </v-autocomplete>
      <v-btn type="submit" color="#9142b9" class="d-block mx-auto">
      Поиск
    </v-btn>
    </v-form>
  </v-sheet>
  
  <div class="text-center">
    <v-pagination :model-value="searchParams.page" @update:model-value="setPage(searchParams.page = $event)" :length="totalAnimePages" :total-visible="7" prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right" @click="fetchAnimes({ s: searchParams, f: 0 })"></v-pagination>
  </div>
  <v-progress-circular
      indeterminate
    v-if="isLoading"
    ></v-progress-circular>
  <div class="animeList" v-if="isResult">
    <AnimeCard v-for="anime in allAnimes" :key="anime.mal_id" :anime="anime" />
  </div>
  <h2 v-if="!isResult">
    Результатов не найдено
  </h2>

  <div class="text-center">
    <v-pagination :model-value="searchParams.page" @update:model-value="setPage(searchParams.page = $event)" :length="totalAnimePages" :total-visible="7" prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right" @click="fetchAnimes({ s: searchParams, f: 0 });toTop()"></v-pagination>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import AnimeCard from '@/components/AnimeCard.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default defineComponent({
  name: 'AnimesView',
  components: {
    AnimeCard
  },
  computed: mapGetters(['allAnimes', 'animeTypes', 'totalAnimePages', 'isLoading', 'isResult', 'searchParams']),
  methods: {
    ...mapMutations(['setSelectedType', 'setSearchQuery', 'setLimit', 'setPage']),
    ...mapActions(['fetchAnimes']),
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
  async created() {
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