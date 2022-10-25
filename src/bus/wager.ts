import { PDFExtract, PDFExtractOptions, PDFExtractText } from "pdf.js-extract";
import { Busta } from "../dao/busta";

function findValueByCoordinates(
  obj: PDFExtractText[],
  x: number,
  y: number
): string {
  for (const ext of obj) {
    if (ext.x === x && ext.y === y && ext.str.trim() !== "") {
      return ext.str;
    }
  }
  return "";
}

export async function extractWage(path: string): Promise<Busta | null> {
  const pdfExtract = new PDFExtract();
  const options: PDFExtractOptions = {};
  let orderedPdfData: PDFExtractText[];

  const res: Busta = await pdfExtract
    .extract(path, options)
    .then((data) => {
      orderedPdfData = data.pages[0].content.sort((a, b) => {
        return a.x - b.x + a.y - b.y;
      });

      const periodo = findValueByCoordinates(orderedPdfData, 430.5, 113.5);

      const totaleRetribuzione: TotaleRetribuzione = {
        periodoRetribuzione: {
          mese: periodo.split(" ")[0],
          anno: Number(periodo.split(" ")[1]),
        },
        totaleCompetenze: findValueByCoordinates(orderedPdfData, 546.75, 705.6),
        totaleTrattenute: findValueByCoordinates(orderedPdfData, 546.75, 718.4),
        arrotondamento: findValueByCoordinates(orderedPdfData, 562.33, 730.4),
        nettoDelMese: findValueByCoordinates(orderedPdfData, 510.21, 748.5),
      };
      const busta = new Busta(totaleRetribuzione);

      return busta;
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      return null;
    });
  return res;
}
