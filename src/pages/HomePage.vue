<template>
  <v-container container>
    <h2 class="text-center my-8">Form Upload - Example</h2>
    <v-file-input
      label="Selecione o arquivo"
      outlined
      v-model="selectedFile"
    />

    <div class="ma-8">
      <v-btn
        color="primary"
        @click="uploadFile"
        :loading="sendLoadingFile"
        :disabled="!selectedFile"
      >Enviar</v-btn>
      <v-btn
        class="ml-5"
        color="primary"
        @click="downloadFile"
        :disabled="!isFileUpload"
      >Download</v-btn>
    </div>
    <v-snackbar
      :color="snackBar.color"
      v-model="snackBar.openSnackBar"
    >
      <span class="text-body-2">{{  snackBar.snackBarMessage }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          fab
          text
          rounded
          v-bind="attrs"
          @click="snackBar.openSnackBar = false"
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
import { sanitizeText } from "@/helpers/sanitizeText";

export default {
  name: "HomePage",
  data: () => ({
    selectedFile: null,
    fileUrl: null,
    sendLoadingFile: false,
    isFileUpload: false,
    snackBar: {
      openSnackBar: false,
      snackBarMessage: null,
      color: "success",
    },
  }),
  methods: {
    async uploadFile() {
      this.sendLoadingFile = true;
      const santizeFile = sanitizeText(this.selectedFile.name);
      if (this.selectedFile) {
        const supabase = createClient(
          process.env.VUE_APP_SUPABASE_URL,
          process.env.VUE_APP_SUPABASE_KEY
        );
        const { error } = await supabase.storage
          .from("uploads")
          .upload(santizeFile, this.selectedFile);

        if (error) {
          this.snackBar.openSnackBar = true;
          this.snackBar.snackBarMessage = error.message;
          this.sendLoadingFile = false;
          this.snackBar.color = "error";
          this.isFileUpload = false;
        } else {
          this.snackBar.openSnackBar = true;
          this.snackBar.color = "success";
          this.sendLoadingFile = false;
          this.snackBar.snackBarMessage = "Arquivo enviado com sucesso!";
          this.isFileUpload = true;
        }
      }
    },

    async downloadFile() {
      const supabase = createClient(
        process.env.VUE_APP_SUPABASE_URL,
        process.env.VUE_APP_SUPABASE_KEY
      );
      const { error, data } = await supabase.storage
        .from("uploads")
        .createSignedUrl(sanitizeText(this.selectedFile.name), 60);

      if (error) {
        console.error(error);
      } else {
        const downloadUrl = data.signedUrl;

        const response = await fetch(downloadUrl);
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.selectedFile.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  },
};
</script>


<style lang="sass" scoped>
</style>