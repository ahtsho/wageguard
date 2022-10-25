import { PrismaClient } from "@prisma/client";
import { Busta } from "../dao/busta";

const prisma = new PrismaClient();

export async function insert(busta: Busta) {
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

export async function findFirst(year: number, month: string) {
  const busta = await prisma.busta.findFirst({
    where: {
      anno: year,
      mese: month,
    },
  });
  console.log(`${JSON.stringify(busta)}`);
  return busta;
}

export async function findAll() {
  return await prisma.busta.findMany();
}
