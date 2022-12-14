"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcQuantileRank = exports.calcGlobalStats = exports.valuesByKey = void 0;
const stats = __importStar(require("simple-statistics"));
const bustaPersistence_1 = require("../persistence/bustaPersistence");
function valuesByKey(key, buste) {
    const values = buste.map((b) => {
        switch (key) {
            case "netto":
                return parseFloat(b.nettoDelMese);
            case "arrotondamento":
                return parseFloat(b.arrotondamento.toString().replace(",", "."));
            case "trattenute":
                return parseFloat(b.totaleTrattenute);
            case "competenze":
                return parseFloat(b.totaleCompetenze);
        }
    });
    if (values)
        return values;
    return [0];
}
exports.valuesByKey = valuesByKey;
function calcGlobalStats(values) {
    return {
        min: stats.min(values),
        max: stats.max(values),
        avg: stats.average(values),
        median: stats.median(values),
        mean: stats.mean(values),
    };
}
exports.calcGlobalStats = calcGlobalStats;
async function calcQuantileRank(busta) {
    const buste = await (0, bustaPersistence_1.findAll)();
    const quantile = {
        netto: stats.quantileRank(valuesByKey("netto", buste), parseFloat(busta.nettoDelMese)),
        /*,
        trattenuta: calcGlobalStats(valuesByKey("trattenute", buste)),
        arrotondamento: calcGlobalStats(valuesByKey("arrotondamento", buste)),
        competenze: calcGlobalStats(valuesByKey("competenze", buste)),*/
    };
    return quantile;
    return {};
}
exports.calcQuantileRank = calcQuantileRank;
