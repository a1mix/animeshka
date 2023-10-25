<template>
  <div style="height: 100vh">
    <v-sheet width="400" class="mx-auto bg-black">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
      v-model="email"
      :error-messages="v$.email.$errors.map((e: any)=> e.$message)"
      label="Email"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>
        <v-text-field 
        v-model="password"
      :error-messages="v$.password.$errors.map((e: any)=> e.$message)"
      label="Password"
      required
      @input="v$.password.$touch"
      @blur="v$.password.$touch"
        >
        </v-text-field>

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
import { useVuelidate } from '../../node_modules/@vuelidate/core'
import { required, email } from '../../node_modules/@vuelidate/validators'

export default defineComponent({
  setup () {
    return { v$: useVuelidate() }
  },
  name: "LoginView",
  data() {
    return {
      password: '',
      email: '',
    }
  },
  validations () {
    return {
      email: { required, email },
      password: { required }
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