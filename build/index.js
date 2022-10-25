"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wager_1 = require("./bus/wager");
const bustaPersistence_1 = require("./persistence/bustaPersistence");
const fastify_1 = __importDefault(require("fastify"));
const bustaPersistence_2 = require("./persistence/bustaPersistence");
const statistics_1 = require("./bus/statistics");
async function persistBusta(path) {
    const busta = await Promise.resolve((0, wager_1.extractWage)(path));
    if (busta !== null) {
        return (0, bustaPersistence_1.insert)(busta);
    }
}
const server = (0, fastify_1.default)({});
// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: {
//         type: "object",
//         properties: {
//           pong: {
//             type: "string",
//           },
//         },
//       },
//     },
//   },
// };
const ROOT = "/busta";
server.get(`${ROOT}/list`, {}, async (request, reply) => {
    return (0, bustaPersistence_2.findAll)();
});
server.post(`${ROOT}/add`, {}, async (request, reply) => {
    return persistBusta(request.body.filePath);
});
server.get(`${ROOT}/stats/global`, {}, async (request, reply) => {
    const buste = await (0, bustaPersistence_2.findAll)();
    const statistics = {
        netto: (0, statistics_1.calcGlobalStats)((0, statistics_1.valuesByKey)("netto", buste)),
        trattenuta: (0, statistics_1.calcGlobalStats)((0, statistics_1.valuesByKey)("trattenute", buste)),
        arrotondamento: (0, statistics_1.calcGlobalStats)((0, statistics_1.valuesByKey)("arrotondamento", buste)),
        competenze: (0, statistics_1.calcGlobalStats)((0, statistics_1.valuesByKey)("competenze", buste)),
    };
    return statistics;
});
server.get(`${ROOT}/stats/quantileRank/:month`, {}, async (request, reply) => {
    var _a;
    if ((_a = request.params) === null || _a === void 0 ? void 0 : _a.month) {
        const b = await (0, bustaPersistence_1.findFirst)(2022, request.params.month);
        console.log(b);
        return (0, statistics_1.calcQuantileRank)(b);
    }
    return "Not found";
});
const start = async () => {
    try {
        await server.listen({ port: 3000 });
        const address = server.server.address();
        const port = typeof address === "string" ? address : address === null || address === void 0 ? void 0 : address.port;
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
