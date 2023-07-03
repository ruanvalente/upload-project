<template>
  <navbar-layout>
    <v-main>
      <home-page />
      <combobox-page />
    </v-main>
  </navbar-layout>
</template>

<script>
import NavbarLayout from "./layouts/NavbarLayout.vue";
import HomePage from "./pages/HomePage.vue";
import ComboboxPage from "./pages/ComboboxPage.vue";

export default {
  name: "App",
  components: {
    HomePage,
    NavbarLayout,
    ComboboxPage,
  },
};
</script>
