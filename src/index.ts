import { Busta } from "./busta";

//const fs = require("fs");
//const pdf = require("pdf-parse");

//let dataBuffer = fs.readFileSync("resources/2022-giugno.pdf");

import { PDFExtract, PDFExtractOptions, PDFExtractText } from "pdf.js-extract";

/**
 * usually the json object next to the one with the key contains the value
 * [{
    "x": 26.8352,
    "y": 28.395700000000033,
    "str": "CodicesAzienda",
    "dir": "ltr",
    "width": 36.465300000000006,
    "height": 6,
    "fontName": "Helvetica"
  },
  {
    "x": 25.45,
    "y": 37.450000000000045,
    "str": "000176",
    "dir": "ltr",
    "width": 26.711999999999996,
    "height": 7,
    "fontName": "g_d0_f2"
  },...]
 * @param key: name of the value to be found
 */
function findValue(key: string, orderedData: PDFExtractText[]): string {
  let val = "";
  for (let index = 0; index < orderedData.length; index++) {
    if (orderedData[index].str === key) {
      if (orderedData[index].str === key) {
        if (orderedData[index + 1].str !== " ") {
          val = orderedData[index + 1].str;
          break;
        } else if (orderedData[index + 2]) {
          val = orderedData[index + 2].str;
          break;
        }
      }
    }
  }
  return val;
}
let orderedPdfData;
const pdfExtract = new PDFExtract();
const options: PDFExtractOptions = {}; /* see below */
pdfExtract
  .extract("resources/2022-giugno.pdf", options)
  .then((data) => {
    orderedPdfData = data.pages[0].content.sort((a, b) => {
      return a.x - b.x + a.y - b.y;
    });

    const datiAz: Azienda = {
      codiceAzienda: Number(findValue("CodicesAzienda", orderedPdfData)),
      ragioneSociale: findValue("RagionesSociale", orderedPdfData),
    };

    //console.log(JSON.stringify(orderedPdfData));
  })
  .catch((err) => console.log(JSON.stringify(err)));

/*
let bustaMaggio;
pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log(data.numpages);
  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  console.log(data.text);
  const arr = data.text.split("\n");
  const datiAz: Azienda = { codiceAzienda: arr[51], ragioneSociale: arr[52] };
  const datiDip: Dipendente = {
    codiceDipendente: arr[59],
    codiceFiscale: arr[61],
    // for Abebe Ahadu Tsegaye me it does not work
    cognome: arr[60].split(" ")[0],
    nome: arr[60].split(" ").slice(-1)[0],
    dataDiAssunzione: arr[63],
    dataDiNascita: arr[62],
    livello: arr[65],
  };
  const lavInps: TempoInps = {
    giorni: arr[66].substring(1, 3),
    settimane: arr[66].substring(0, 1),
  };
  const lavMinimale: TempoMinimale = {
    giorni: arr[66].substring(3, 5),
    ore: 0,
  };
  const lavoroSvolto: Lavoro = {
    giorniDetrazioni: arr[66].substring(5, 7),
    inps: lavInps,
    minimale: lavMinimale,
  };
  const datiRetrib: Retribuzione = {
    contingenza: arr[71],
    pagaBase: arr[68],
    pattoDiNonConcorrenza: arr[75],
    prossimoScatto: arr[69],
    terzoElemento: arr[73],
    totale: arr[76],
  };

  const vociVariabili: VoceVariabile[] = [
    {
      codice: arr[86].substring(2),
      descrizione: arr[87],
      importoBase: arr[88],
      riferimento: arr[89],
      trattenute: 0,
      competenze: arr[90],
      soggetto: {
        INPS: arr[86].substring(0, 1) === "*",
        IRPEF: arr[86].substring(1, 2) === "*",
      },
    },
    {
      codice: arr[86].substring(2),
      descrizione: arr[87],
      importoBase: arr[88],
      riferimento: arr[89],
      trattenute: 0,
      competenze: arr[90],
      soggetto: {
        INPS: arr[86].substring(0, 1) === "*",
        IRPEF: arr[86].substring(1, 2) === "*",
      },
    },
  ];

  bustaMaggio = new Busta(
    datiAz,
    datiDip,
    lavoroSvolto,
    datiRetrib,
    vociVariabili
  );
});
*/
