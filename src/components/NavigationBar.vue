<template>
  <nav>
    <router-link to="/anime">
      <h1>animeshka.</h1>
    </router-link>
    <div>
      <!-- <router-link to="/">Home</router-link> -->
      <router-link to="/anime">Аниме</router-link>

      <router-link v-if="!isAuth" to="/login">Логин</router-link>

      <router-link v-if="isAuth" to="/user/favorites">Избранное</router-link>
      <router-link v-if="isAuth" to="/user/account">Аккаунт</router-link>
      
      
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
  background: #6c6b7494;
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
  color: #ffffff;
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