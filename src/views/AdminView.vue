<template>
    <div class="main-container" v-if="users">
        <h1>Все пользователи: </h1>
        <div v-for="user in users">
            <span>{{ user.email }}</span><span><v-btn color="red">Ban</v-btn></span>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            users: []
        }
    },
    async mounted() {
        this.getUsers()
    },
    methods: {
        async getUsers() {
            const users = await axios.get('http://localhost:5000/users',
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            this.users = users.data
        }
    }
})
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
}
</style>