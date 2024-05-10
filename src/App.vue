<template>
  <navbar-layout>
    <v-main>
      <!-- <datalist-page />
      <home-page />
      <combobox-page /> -->
      <p-d-f-render />
    </v-main>
  </navbar-layout>
</template>

<script>
import NavbarLayout from "./layouts/NavbarLayout.vue";
// import HomePage from "./pages/HomePage.vue";
// import ComboboxPage from "./pages/ComboboxPage.vue";
// import DatalistPage from "./pages/Datalist.vue";
import PDFRender from "./pages/PDFRender.vue";

export default {
  name: "App",
  components: {
    // HomePage,
    NavbarLayout,
    // ComboboxPage,
    // DatalistPage,
    PDFRender,
  },
};
</script>
