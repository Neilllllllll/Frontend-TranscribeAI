// À installer avant :
// npm install docx jspdf

import { Document, Packer, Paragraph } from "docx";
import { jsPDF } from "jspdf";
// Class pour exporter du texte en différent format
export class FileExporter {
  // Méthode utilitaire privée pour déclencher le téléchargement
  static #downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /**
   * Export en .txt
   * @param {string} filename - Nom du fichier (avec ou sans extension)
   * @param {string} text - Contenu texte
   */
  exportTxt(filename, text) {
    const finalName = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });

    FileExporter.#downloadBlob(blob, finalName);
  }

  /**
   * Export en .docx (Word)
   * @param {string} filename - Nom du fichier (avec ou sans extension)
   * @param {string} text - Contenu texte (multi-lignes supporté)
   */
  async exportDocx(filename, text) {
    const finalName = filename.endsWith(".docx") ? filename : `${filename}.docx`;

    const paragraphs = text
      .split("\n")
      .map((line) => new Paragraph(line));

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    FileExporter.#downloadBlob(blob, finalName);
  }

  /**
   * Export en .pdf
   * @param {string} filename - Nom du fichier (avec ou sans extension)
   * @param {string} text - Contenu texte
   */
  exportPdf(filename, text) {
    const finalName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;

    const pdf = new jsPDF();
    const marginLeft = 10;
    const marginTop = 10;
    const maxWidth = 180; // largeur max du texte sur la page

    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, marginLeft, marginTop);
    pdf.save(finalName);
  }
}
