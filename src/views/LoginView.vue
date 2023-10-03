<template>
    <form action="submit">
        <input type="text" v-model="login">
        <p>{{ login }}</p>
        <input type="password" v-model="password">
        <p>{{ password }}</p>
        <button>in the process of developing</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoginView",
    data() {
        return {
            login: '',
            password: ''
        }
    }
})

</script>