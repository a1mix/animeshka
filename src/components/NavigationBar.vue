<template>
  <nav>
    <router-link to="/">
      <h1>animeshka.</h1>
    </router-link>
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/anime">Anime</router-link>
      <router-link to="/manga">Manga</router-link>

      <router-link v-if="!isAuth" to="/about">About</router-link>
      <router-link v-if="!isAuth" to="/login">Login</router-link>

      <router-link v-if="isAuth" to="/user/favorites">My favorites</router-link>
      <router-link v-if="isAuth" to="/user/account">Account</router-link>
      
      <router-link v-if="isUserAdmin" to="/admin">Admin</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapGetters, mapMutations } from "vuex"

export default defineComponent({
  name: "NavigationBar",
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
  }
})

</script>

<style scoped>
nav {
  padding: 10px 50px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  width: 100vw;
  background: rgba(0, 0, 0, 0.731);
  backdrop-filter: blur(4px);
}

div {
  display: flex;
  gap: 20px;

}

nav a {
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #9142b9;
}

@media screen and (max-width: 768px) {
  a {
    font-size: 14px;
  }

  nav {
    padding: 10px;
  }
}
</style>