<template>
  <v-app>
    <v-app-bar
      app
      color="success"
      dark
    >
      <div class="d-flex align-center">
        <h2>FormUpload - Example</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/ruanvalente/upload-project"
        target="_blank"
        text
      >
        <span class="mr-4">know more
        </span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <slot></slot>
  </v-app>
</template>

<script>
export default {
  name: "NavbarLayout",
};
</script>

<style lang="scss" scoped></style>