"use strict";
const fs = require("fs");
const pdf = require("pdf-parse");
let dataBuffer = fs.readFileSync("resources/2022-Maggio.pdf");
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
    let map = new Map([["COGNOME_E_NOME", arr[60]]]);
    
    map.set("Codice_Azienda", arr[51]);
    map.set("Ragione_Sociale", arr[52]);
    map.set("Indirizzo", `${arr[53]} ${arr[54]}`);
    map.set("Codice_Fiscale_azienda", arr[55].substring(0,10));
    map.set("Posizione_Inps", arr[55].substring(11,27));
    map.set("P.A.T._Inail", arr[55].substring(28));
    map.set("PERIODO_DI_RETRIBUZIONE", arr[58]);
    map.set("Codice_dipendente", arr[59]);
    map.set("Codice_Fiscale_dipendente", arr[61]);
    map.set("Matricola", "");
    map.set("Data_di_Nascita", arr[62]);
    console.log(map);
});
