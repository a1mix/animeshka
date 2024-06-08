<template>
  <navigation-bar />
  <section class="main-container">
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex';
import NavigationBar from './components/NavigationBar.vue';
export default defineComponent({
  components: {
    NavigationBar
  },
  async created() {
    this.auth()
  },
  methods: {
    ...mapActions(['auth'])
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');


* {
  padding: 0px;
  margin: 0px;
  border: none;
  color: rgb(0, 0, 0);
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: 400;
  color: #000000;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
}

body {
  background-color: rgb(255, 255, 255);
}

.main-container {
  padding-top: 70px;
}

@media screen and (max-width: 768px) {
  .main-container {
    padding-top: 50px;
  }
}

*::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
*::-webkit-scrollbar-thumb {
  background-color: rgb(70, 70, 73);
  border-radius: 5px;
  border: 3px solid rgb(70, 70, 73);
}

</style>
