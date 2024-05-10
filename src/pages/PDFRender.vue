<template>
  <div class="mt-8">
    <iframe
      v-if="pdfUrl"
      :src="pdfUrl"
      width="100%"
      height="600px"
      :download="pdfFileName"
    ></iframe>
    <v-btn
      class="text-none ms-4 text-white"
      color="blue-darken-4"
      variant="flat"
      @click="gerarPDF"
      >Gerar PDF</v-btn
    >
  </div>
</template>

<script>
import { PDFDocument, rgb, Helvetica } from "pdf-lib";

export default {
  data() {
    return {
      pdfUrl: null,
      pdfFileName: "relatorio",
      imageUrl: "https://example.com/logo.png", // URL do logo da empresa
    };
  },
  methods: {
    async gerarPDF() {
      try {
        // Cria um novo documento PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        console.log(page);
        // Adiciona título do documento
        const titulo = "Relatório de Gastos " + new Date().toLocaleDateString();
        page.drawText(titulo, {
          x: 50,
          y: height - 50,
          size: 18,
          font: Helvetica, // Usar a fonte Helvetica em negrito
          color: rgb(0, 0, 0),
        });

        // Adiciona tabela com informações
        const tableData = [
          ["Data", "Vendas", "Despesas"],
          ["01/01/2024", "R$ 1000", "R$ 500"],
          ["01/02/2024", "R$ 1200", "R$ 600"],
          ["01/03/2024", "R$ 800", "R$ 400"],
          ["01/03/2024", "R$ 800", "R$ 400"],
          ["01/03/2024", "R$ 800", "R$ 400"],
          ["01/03/2024", "R$ 800", "R$ 400"],
          // Adicione mais linhas conforme necessário
        ];

        const cellPadding = 50;
        const cellWidth = (width - cellPadding * 2) / 3;
        const rowHeight = 20; // Altura da linha
        tableData.forEach((row, rowIndex) => {
          let x = 50; // Posição x inicial da tabela
          let y = height - 150 - rowIndex * rowHeight; // Posição y da linha da tabela
          row.forEach((cell, cellIndex) => {
            // Adiciona cor de fundo alternada para linhas pares e ímpares
            const backgroundColor =
              rowIndex % 2 === 0 ? rgb(1, 1, 1) : rgb(0.9, 0.9, 0.9);
            // Adiciona bordas à célula
            page.drawRectangle({
              x: x + cellIndex * cellWidth,
              y: y,
              width: cellWidth,
              height: rowHeight,
              color: backgroundColor,
              borderColor: rgb(0, 0, 0), // Cor da borda
              borderWidth: 1, // Largura da borda
            });

            // Adiciona texto na célula centralizando verticalmente e horizontalmente
            const fontSize = 12;
            const estimatedTextWidth = cell.length * (fontSize * 0.6); // Estimativa da largura do texto
            const textHeight = 10; // Estimativa da altura do texto
            page.drawText(cell, {
              x:
                x +
                cellIndex * cellWidth +
                (cellWidth - estimatedTextWidth) / 2,
              y: y + (rowHeight - textHeight) / 2,
              size: fontSize,
              font: Helvetica,
              color: rgb(0, 0, 0),
            });
          });
        });

        // Adiciona rodapé com nome da empresa e slogan
        const nomeEmpresa = "Empresa X";
        const slogan = "Slogan Teste PDF";
        page.drawText(nomeEmpresa, {
          x: 50,
          y: 50,
          size: 12,
          font: Helvetica,
          color: rgb(0, 0, 0),
        });
        page.drawText(slogan, {
          x: width - 150,
          y: 50,
          size: 12,
          font: Helvetica,
          color: rgb(0, 0, 0),
        });

        // Salva o documento PDF em um Blob
        const pdfBytes = await pdfDoc.save();

        // Converte o Blob em uma URL de objeto para exibição no iframe
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        this.pdfUrl = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
      }
    },
  },
};
</script>
