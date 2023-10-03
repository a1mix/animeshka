<template>
  <navigation-bar />
  <section class="main-container">
    <router-view/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/NavigationBar.vue';
export default defineComponent({
  components: {
    NavigationBar
  }
})
</script>

<style>
* {
	padding: 0px;
	margin: 0px;
	border: none;
  color: rgb(205, 205, 205);
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: 600;
  color: #bebebe;
  box-sizing: border-box;
  background-color: black;
}

body {
  background-color: black;
}

.main-container {
  padding-top: 70px;
}

@media screen and (max-width: 768px) {
  .main-container {
    padding-top: 50px;
  }
}
</style>
