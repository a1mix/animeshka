<template>
    <div class="user-container">
        <h1><strong>UserId: </strong>{{ currentUser.id }}</h1>
        <h2><strong>Email: </strong>{{ currentUser.email }}</h2>
        <h3><strong>Roles: </strong><span v-for="role in currentUser.roles">{{ role.value }}</span></h3>
        <router-link v-if="isUserAdmin" to="/episodes"><v-btn color="#2D74CF">Добавить эпизод</v-btn></router-link>
        <router-link v-if="isAuth" to="/login" @click="logout()"><v-btn color="#9142b9">Выйти</v-btn></router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
    name: "AccountView",
    computed: {
        ...mapGetters(['isAuth', 'currentUser']),
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
        logout() {
            this.updateIsAuth(false)
            this.setUser({})
            localStorage.removeItem('token')
        }
    },
})
</script>

<style scoped>
.user-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    gap: 20px;
}
</style>