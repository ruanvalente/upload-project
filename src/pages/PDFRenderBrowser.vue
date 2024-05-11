<template>
  <v-container>
    <div class="container">
      <v-btn class="mb-4" color="primary" @click="generatePDF"
        >Gerar Relatório</v-btn
      >
    </div>
    <a ref="downloadLink" :download="fileName" style="display: none"></a>
    <iframe ref="pdfFrame" width="100%" height="800px" frameborder="0"></iframe>
  </v-container>
</template>

<script>
import html2pdf from "html2pdf.js";
import logo from "../assets/V.tal-01.jpg";

export default {
  data() {
    return {
      fileName: "",
      json: {
        template: `<div
      style="font-family: Verdana, Geneva, Tahoma, sans-serif;
      "
    >
      <h2 style="text-align: center; font-size: 2.5rem;">Termo de assinatura de RST Digital</h2>
      <p style="text-align: justify; margin-top: 2rem">
        Eu, <strong style="font-style: italic">Nome do usuário</strong> incrito
        no CPF sob o n [xxxxxx], Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Neque perspiciatis nisi dicta laudantium, nostrum
        dolorem id minus esse enim nulla explicabo doloremque alias quidem
        molestiae iusto animi hic error dignissimos!
      </p>
      <p style="text-align: justify">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, odio
        incidunt iusto nesciunt fugiat molestias debitis quasi dolor consequatur
        vitae, veritatis, illo laudantium sunt blanditiis expedita quos animi
        tempore mollitia!
      </p>
      <p style="text-align: left; margin-top: 40px">Local e data</p>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          margin-top: 40px;
        "
      >
        <span>Assinatura do usuário</span> <br />
        <span
          style="
            display: inline-block;
            width: 100%;
            font-size: 1rem;
            font-weight: 500;
            font-style: italic;
          "
        >
          <strong>John Doe Smith</strong>
        </span>
        <span
          style="
            display: inline-block;
            border-bottom: 1px solid black;
            width: 40%;
          "
        />
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          text-align: center;
          margin-top: 4rem;
        "
      >
      <h4>
          Data / hora de emissão:
          <span>${new Date().toLocaleDateString()}</span
          >&nbsp;
          <span>${new Date().toLocaleTimeString()}</span>
        </h4>
      </div>
      <div style="
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
          margin-top: 8rem;
          text-align: center;
      ">
        <img style="opacity: 0.5" width="200px" src=${logo} alt="Logo vtal" />
        <p>O futuro passa por aqui</p>
      </div>
    </div>`,
      },
    };
  },
  methods: {
    generatePDF() {
      const content = this.json.template;

      const currentDate = new Date();
      const formattedDate = currentDate
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");

      this.fileName = `rst_digital_${formattedDate}.pdf`;
      const options = {
        margin: 1,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        filename: this.fileName,
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(options)
        .from(content)
        .toPdf()
        .output("datauristring")
        .then((pdf) => {
          this.$refs.pdfFrame.src = pdf;
          this.downloadPDF(pdf);
        });
    },
    downloadPDF(pdf) {
      const blob = this.base64ToBlob(pdf);
      const url = window.URL.createObjectURL(blob);
      this.$refs.downloadLink.href = url;
      this.$refs.downloadLink.click();
      window.URL.revokeObjectURL(url);
    },
    base64ToBlob(base64) {
      const byteString = atob(base64.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "application/pdf" });
    },
  },
};
</script>
