<template>
  <form @submit.prevent="searchAnimes(searchParams)"> 
    <input type="text" name="" id="" v-model="searchParams.searchQuery">
    <button><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15.716,4.354a8.031,8.031,0,1,0-2.7,13.138l3.58,3.581A3.164,3.164,0,0,0,21.073,16.6l-3.58-3.58A8.046,8.046,0,0,0,15.716,4.354ZM10.034,16.069A6.033,6.033,0,1,1,14.3,14.3,6,6,0,0,1,10.034,16.069Zm9.625,1.943a1.165,1.165,0,0,1-1.647,1.647l-3.186-3.186a8.214,8.214,0,0,0,.89-.757,8.214,8.214,0,0,0,.757-.89Z"></path></g>
    </svg></button>
    

    <select v-model="searchParams.selectedType">
      <option disabled value="">Please select type</option>
      <option>all</option>
      <option>tv</option>
      <option>movie</option>
      <option>ova</option>
      <option>special</option>
      <option>ona</option>
      <option>music</option>
    </select>

  </form>
  <div class="animeList" v-if="isResult">
    <AnimeCard 
    v-for="anime in allAnimes"
    :key="anime.mal_id"
    :anime="anime" 
  />
  </div>
  <h2 v-else>
    No results found 
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AnimeList from '@/components/AnimeList.vue';
import AnimeCard from '@/components/AnimeCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    AnimeList,
    AnimeCard
  },
  data(){
    return {
      searchParams: {
        selectedType: '',
        searchQuery: ''
      },
      isResult: true,
    }
  },
  computed: mapGetters(['allAnimes']),
  methods: mapActions(['fetchAnimes', 'searchAnimes']),
  async mounted() {
    this.fetchAnimes();
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