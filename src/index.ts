import { extractWage } from "./bus/wager";
import { findFirst, insert } from "./persistence/bustaPersistence";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { findAll } from "./persistence/bustaPersistence";
import {
  valuesByKey,
  calcGlobalStats,
  calcQuantileRank,
} from "./bus/statistics";

async function persistBusta(path: string) {
  const busta = await Promise.resolve(extractWage(path));
  if (busta !== null) {
    return insert(busta);
  }
}

const server: FastifyInstance = Fastify({});
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
  return findAll();
});

server.post(`${ROOT}/add`, {}, async (request, reply) => {
  return persistBusta(request.body.filePath);
});

server.get(`${ROOT}/stats/global`, {}, async (request, reply) => {
  const buste = await findAll();

  const statistics = {
    netto: calcGlobalStats(valuesByKey("netto", buste)),
    trattenuta: calcGlobalStats(valuesByKey("trattenute", buste)),
    arrotondamento: calcGlobalStats(valuesByKey("arrotondamento", buste)),
    competenze: calcGlobalStats(valuesByKey("competenze", buste)),
  };

  return statistics;
});

server.get(`${ROOT}/stats/quantileRank/:month`, {}, async (request, reply) => {
  if (request.params?.month) {
    const b = await findFirst(2022, request.params.month);
    console.log(b);
    return calcQuantileRank(b);
  }
  return "Not found";
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
