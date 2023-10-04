<!-- <template>
  <v-sheet width="700" class="mx-auto bg-black">
    <v-form ref="form">
      <v-text-field v-model="searchParams.searchQuery" label="Search...">
      </v-text-field>
      <v-select clearable v-model="searchParams.selectedType" :items="MangaTypes" label="Types"
        color="#000000"></v-select>
    </v-form>
    <v-btn @click.prevent="searchMangas(searchParams)" class="bg-purple-darken-2 d-block mx-auto" width="600">
      Search
    </v-btn>
  </v-sheet>

  <div class="MangaList" v-if="isResult">
    <MangaCard v-for="Manga in allMangas" :key="Manga.mal_id" :Manga="Manga" />
  </div>
  <h2 v-else>
    No results found
  </h2>
</template> -->

<script lang="ts">
import { defineComponent } from 'vue';
import MangaCard from '@/components/MangaCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'MangasView',
  components: {
    MangaCard
  },
  data() {
    return {
      searchParams: {
        selectedType: '',
        searchQuery: ''
      },
      isResult: true
    }
  },
  computed: mapGetters(['allMangas', 'MangaTypes']),
  methods: mapActions(['fetchMangas', 'searchMangas']),
  async mounted() {
    this.fetchMangas();
  }
})

</script>

<style scoped>
.MangaList {
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