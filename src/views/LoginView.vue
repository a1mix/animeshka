<template>
  <div style="height: 100vh">
    <v-sheet width="400" class="mx-auto bg-black">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field v-model="password" label="Password"></v-text-field>

        <span>Don't have any account? </span>
      <router-link to="/registration"> Register</router-link>

        <v-btn type="submit" block class="mt-2" color="#9142b9">Log in</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      password: '',
      email: ''
    }
  },
  methods: {
    ...mapMutations(['setUser', 'updateIsAuth']),
    async login() {
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          password: this.password, 
          email: this.email
        })
        console.log(response)
        this.updateIsAuth(true)
        this.setUser({
          id: response.data.payload.id,
          email: response.data.payload.email,
          roles: response.data.payload.roles,
          animes: response.data.payload.animes
        })
        localStorage.setItem('token', response.data.token.token)
        this.$router.push({path: 'user/account'})
        
      } catch (error:any) {
        alert(error.response.data.message)
      }
    }
  }
})

</script>