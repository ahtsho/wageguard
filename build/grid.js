"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const pdf_js_extract_1 = require("pdf.js-extract");
var PDFDocument = require("pdfkit");
let pdf;
async function loadBusta() {
    let busta;
    const pdfExtract = new pdf_js_extract_1.PDFExtract();
    const options = {}; /* see below */
    pdfExtract
        .extract("resources/2022-giugno.pdf", options)
        .then((data) => {
        debugger;
        busta = data.pages[0].content;
        return busta;
    })
        .catch((err) => console.log(JSON.stringify(err)));
    return undefined;
}
async function printLinesToPDF() {
    return new Promise(async (resolve) => {
        pdf = new PDFDocument({
            size: "A4",
            info: {
                Title: "Example file",
                Author: "Me",
            },
        });
        const step = 10;
        for (let y = 0; y < 100; y++) {
            pdf.moveTo(0, y * step).lineTo(800, y * step);
            pdf.moveTo(y * step, 0).lineTo(y * step, 1000);
        }
        pdf.stroke();
        pdf.fontSize(5);
        for (let y = 0; y < 100; y++) {
            pdf.text(`${y * step}`, y * step, 0);
            pdf.text(`${y * step}`, 0, y * step);
        }
        var stream = fs_1.default.createWriteStream("./example.pdf");
        pdf.pipe(stream);
        pdf.flushPages();
        pdf.end();
        stream.on("finish", function () {
            resolve();
        });
    });
}
const busta = await loadBusta();
printLinesToPDF().then(() => {
    console.log("All done");
});
