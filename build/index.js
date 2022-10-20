"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_js_extract_1 = require("pdf.js-extract");
function extractPortionXYRange(data, yMin, yMax, xMin, xMax) {
    const portion = [];
    for (const line of data) {
        if (line.y >= yMin &&
            line.y <= yMax &&
            line.x >= xMin &&
            line.x <= xMax &&
            line.str.trim().length > 0) {
            portion.push(line);
        }
    }
    return portion.sort((a, b) => {
        return a.y - b.y;
    });
}
function extractTitles(data) {
    return data.filter((d) => {
        return d.fontName === "Helvetica";
    });
}
function extractValues(data) {
    return data.filter((d) => {
        return d.fontName === "g_d0_f2";
    });
}
function findValueByProximity(key, data) {
    let minDiffXY = 10000;
    let value;
    for (const dPt of data) {
        if (key.x !== dPt.x &&
            key.y !== dPt.y &&
            Math.abs(dPt.y - key.y) < 15 &&
            Math.abs(key.x - dPt.x) + Math.abs(key.y - dPt.y) < minDiffXY) {
            minDiffXY = Math.abs(key.x - dPt.x) + Math.abs(key.y - dPt.y);
            value = dPt;
        }
    }
    return value === null || value === void 0 ? void 0 : value.str;
}
function group(data) {
    const result = new Map();
    for (const { y, ...other } of data) {
        if (!result.has(y)) {
            result.set(y, []);
        }
        else {
            let arr = result.get(y);
            arr.push({ ...other });
            /*
            arr = arr.filter((a: PDFExtractText) => {
              return a.str.trim().length > 0;
            });
      */
            arr.sort((a, b) => {
                return a.x - b.x;
            });
            result.set(y, arr);
        }
    }
    console.log(result);
    const sortedRes = [...result];
    // .filter(([key, value]) => {
    //   return value.length > 0;
    // })
    // .sort(([key1, val1], [key2, val2]) => {
    //   return key1 - key2;
    // });
    return sortedRes;
}
const pdfExtract = new pdf_js_extract_1.PDFExtract();
const options = {}; /* see below */
pdfExtract
    .extract("resources/2022-giugno.pdf", options)
    .then((data) => {
    const df = data.pages[0].content.filter((d) => {
        return d.str.trim().length > 0;
    });
    // console.log(
    //   JSON.stringify(
    //     df.sort((a, b) => {
    //       return a.y - b.y;
    //     })
    //   )
    // );
    // max y = 818.18
    const top = extractPortionXYRange(data.pages[0].content, 0, 1000, 0, 1000);
    const topTitles = extractTitles(top);
    const topValues = extractValues(top);
    for (const title of topTitles) {
        const val = findValueByProximity(title, topValues);
        console.log(`${title.str} = ${val}`);
    }
    //findValueByProximity();
    /*const datiAz: Azienda = {
      codiceAzienda: Number(findValue("CodicesAzienda", top)),
      ragioneSociale: findValue("RagionesSociale", top),
    };*/
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
