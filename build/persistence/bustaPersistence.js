"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.findFirst = exports.insert = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function insert(busta) {
    const bins = await prisma.busta.create({
        data: {
            anno: busta.retribuzione.periodoRetribuzione.anno,
            mese: busta.retribuzione.periodoRetribuzione.mese,
            arrotondamento: busta.retribuzione.arrotondamento,
            nettoDelMese: busta.retribuzione.nettoDelMese,
            totaleCompetenze: busta.retribuzione.totaleCompetenze,
            totaleTrattenute: busta.retribuzione.totaleTrattenute,
        },
    });
    return bins;
}
exports.insert = insert;
async function findFirst(year, month) {
    const busta = await prisma.busta.findFirst({
        where: {
            anno: year,
            mese: month,
        },
    });
    console.log(`${JSON.stringify(busta)}`);
    return busta;
}
exports.findFirst = findFirst;
async function findAll() {
    return await prisma.busta.findMany();
}
exports.findAll = findAll;
