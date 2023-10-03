<template>
    <div class="container">
        <AnimeCard 
            v-for="anime in animeList"
            :key="anime.mal_id"
            :anime="anime"
         />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AnimeCard from './AnimeCard.vue';

export default defineComponent({
    name: 'AnimeList',
    props: ['animeList'],
    components: {
        AnimeCard
    }
}) 
</script>

<style scoped> 

</style>