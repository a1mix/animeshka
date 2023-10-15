<template>
     <v-progress-circular
      indeterminate
    v-if="isLoading"
    ></v-progress-circular>
    <div v-if="isResult">
        <AnimeCard v-for="anime in animeList" :key="anime.mal_id" :anime="anime"></AnimeCard>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AnimeCard from '@/components/AnimeCard.vue';
import animePlaceholder from '@/interfaces/animePlaceholder';
import { IAnime } from '@/interfaces/IAnime';

export default defineComponent({
    components: { AnimeCard },
    async mounted() {
        this.getUserAnimes()
    },
    data() {
        return {
            animeList: [] as IAnime[],
            isResult: false,
            isLoading: true
        }
    },
    computed: mapGetters(['currentUser']),
    methods: {
        ...mapMutations(['setUserAnimes']),
        async getUserAnimes() {
            try {
                const response = await axios.get<{id: number, title: string}[]>(`http://localhost:5000/users/anime/${this.currentUser.id}`,
                {
                   headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                if (response.data.length > 0) {
                    this.setUserAnimes(response.data)
                }
                response.data.forEach(async (element) => {
                    const anime = await axios.get(`https://api.jikan.moe/v4/anime/${element.id}`)
                        .then(data => data.data)
                    if(anime) {
                        console.log(anime)
                        this.animeList.push(anime.data)
                    }
                })
                this.isResult = true
                this.isLoading = false
            } catch (error: any) {
                alert(error.response.data.message)
            }
        },
    }
})
</script>

<style scoped></style>