"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWage = void 0;
const pdf_js_extract_1 = require("pdf.js-extract");
const busta_1 = require("../dao/busta");
function findValueByCoordinates(obj, x, y) {
    for (const ext of obj) {
        if (ext.x === x && ext.y === y && ext.str.trim() !== "") {
            return ext.str;
        }
    }
    return "";
}
async function extractWage(path) {
    const pdfExtract = new pdf_js_extract_1.PDFExtract();
    const options = {};
    let orderedPdfData;
    const res = await pdfExtract
        .extract(path, options)
        .then((data) => {
        orderedPdfData = data.pages[0].content.sort((a, b) => {
            return a.x - b.x + a.y - b.y;
        });
        const periodo = findValueByCoordinates(orderedPdfData, 430.5, 113.5);
        const totaleRetribuzione = {
            periodoRetribuzione: {
                mese: periodo.split(" ")[0],
                anno: Number(periodo.split(" ")[1]),
            },
            totaleCompetenze: findValueByCoordinates(orderedPdfData, 546.75, 705.6),
            totaleTrattenute: findValueByCoordinates(orderedPdfData, 546.75, 718.4),
            arrotondamento: findValueByCoordinates(orderedPdfData, 562.33, 730.4),
            nettoDelMese: findValueByCoordinates(orderedPdfData, 510.21, 748.5),
        };
        const busta = new busta_1.Busta(totaleRetribuzione);
        return busta;
    })
        .catch((err) => {
        console.log(JSON.stringify(err));
        return null;
    });
    return res;
}
exports.extractWage = extractWage;
