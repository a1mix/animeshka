<template>
  <div style="height: 100vh">
    <v-sheet width="400" class="mx-auto bg-black">
      <v-form fast-fail @submit.prevent="registration" bg-color="black">
        <v-text-field v-model="email" label="Email">
        </v-text-field>

        <v-text-field v-model="password" label="Password">
        </v-text-field>

        <v-btn type="submit" color="#9142b9" block class="mt-2">Register</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "RegistrationView",
  data() {
    return {
      password: '',
      email: ''
    }
  },
  methods: {
    async registration() {
      try {
        const response = await axios.post("http://localhost:5000/auth/registration", {
          password: this.password, 
          email: this.email
        })
        console.log(response)
        this.$router.push({path: 'login'})
      } catch (error: any) {
        alert(error.response.data.message)
      }
    }
  }
})

</script>