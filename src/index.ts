import { Busta } from "./busta";
const fs = require("fs");
const pdf = require("pdf-parse");

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
}

// extractBusta("resources/22-05.pdf");
extractBusta("resources/22-06.pdf");
extractBusta("resources/22-07.pdf");
extractBusta("resources/22-07-bis.pdf");
extractBusta("resources/22-08.pdf");
