import { PDFExtract, PDFExtractOptions, PDFExtractText } from "pdf.js-extract";
import { Busta } from "./busta";
const fs = require("fs");

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

function extractBusta(path: string) {
  const pdfExtract = new PDFExtract();
  const options: PDFExtractOptions = {};
  let orderedPdfData: PDFExtractText[];

  pdfExtract
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
      console.log(JSON.stringify(busta, null, 2));
    })
    .catch((err) => console.log(JSON.stringify(err)));
}

// TODO remove old
/*
function extractBusta(path: string) {
  let busta;
  let dataBuffer = fs.readFileSync(path);
  pdf(dataBuffer)
    .then(function (data: any) {
      const arr = data.text.split("\n");
      const totaleRetribuzione: TotaleRetribuzione = {
        periodoRetribuzione: {
          mese: arr[58].split(" ")[0],
          anno: Number(arr[58].split(" ")[1]),
        },
        totaleCompetenze: arr[134 + 20], // 05 + 20 -> 08
        totaleTrattenute: arr[133 + 20],
        arrotondamento: arr[147 + 20],
        nettoDelMese: arr[148 + 20],
      };
      busta = new Busta(totaleRetribuzione);
      console.log(JSON.stringify(busta, null, 2));
    })
    .catch((error: any) => console.log(error));
}*/

extractBusta("resources/22-05.pdf");
extractBusta("resources/22-06.pdf");
extractBusta("resources/22-07.pdf");
extractBusta("resources/22-07-bis.pdf");
extractBusta("resources/22-08.pdf");
