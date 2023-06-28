<template>
  <navbar-layout>
    <v-main>
      <home-page />
    </v-main>
  </navbar-layout>
</template>

<script>
import NavbarLayout from "./layouts/NavbarLayout.vue";
import HomePage from "./pages/HomePage.vue";

export default {
  name: "App",
  components: {
    HomePage,
    NavbarLayout,
  },
};
</script>
