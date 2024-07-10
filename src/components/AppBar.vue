<template>
  <!-- Shows a application bar -->
  <v-app-bar 
    color="teal-accent-4"
    scroll-behavior="inverted fade-image"
    prominent
    
    >
      <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Vue.Js App</v-app-bar-title>
      <!-- Button to navigate to home route / -->
      <v-btn icon="mdi-home" to="/"></v-btn>
      <!-- Button to add a menu options -->
      <v-btn icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>

  <NavDrawer v-model="drawer" ></NavDrawer>

</template>

<script>

import NavDrawer from './NavDrawer.vue'

export default {
  name: "AppBar",
  components: {
    NavDrawer
  },
  data(){
    return{
      drawer: false,
      group: null,
    }
  },
 /*  watch: {
    group () {
      this.drawer = false
    }
  } */
}
</script>
