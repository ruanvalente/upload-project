<template>
  <v-container>
    <h2 class="text-center">Form Upload - Example</h2>
    <v-file-input
      label="Selecione o arquivo"
      outlined
      v-model="selectedFile"
      @change="handleFileChange"
    />

    <v-btn
      @click="uploadFile"
      :loading="sendLoadingFile"
      :disabled="!selectedFile"
    >Enviar</v-btn>

    <v-btn @click="downloadFile">Download</v-btn>
  </v-container>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
export default {
  name: "HomePage",
  data: () => ({
    selectedFile: null,
    fileUrl: null,
    sendLoadingFile: false,
  }),
  methods: {
    handleFileChange() {
      // this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },

    async uploadFile() {
      this.sendLoadingFile = true;
      if (this.selectedFile) {
        const supabase = createClient(
          "https://sdcxdvhqgfyhuluywlfq.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkY3hkdmhxZ2Z5aHVsdXl3bGZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Mzc2MTc2MiwiZXhwIjoxOTk5MzM3NzYyfQ.LiEgbTpqg-L3lsUzfXQ7tfFBrF74Oo9TIaQKKlpQsQI"
        );
        const { data, error } = await supabase.storage
          .from("uploads")
          .upload("files", `${this.selectedFile}.png`);

        console.log(data);

        if (error) {
          console.error(error);
          this.sendLoadingFile = false;
        } else {
          console.log("Arquivo enviado com sucesso!");
          this.sendLoadingFile = false;
        }
      }
    },

    async downloadFile() {
      const supabase = createClient(
        "https://sdcxdvhqgfyhuluywlfq.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkY3hkdmhxZ2Z5aHVsdXl3bGZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Mzc2MTc2MiwiZXhwIjoxOTk5MzM3NzYyfQ.LiEgbTpqg-L3lsUzfXQ7tfFBrF74Oo9TIaQKKlpQsQI"
      );
      const { error, data } = await supabase.storage
        .from("uploads")
        .createSignedUrl("files", 60); // Defina a duração do link em segundos

      console.log(data);
      if (error) {
        console.error(error);
      } else {
        const downloadUrl = data.signedURL;

        // Fazer o download do arquivo usando o método fetch
        const response = await fetch(downloadUrl);
        const blob = await response.blob();

        // Criar um link de download para o arquivo
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.png"); // Substitua pelo nome desejado do arquivo e sua extensão
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