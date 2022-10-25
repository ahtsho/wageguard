import { Busta } from "@prisma/client";
import * as stats from "simple-statistics";
import { findAll } from "../persistence/bustaPersistence";

export function valuesByKey(key: string, buste: Busta[]): number[] {
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
  if (values) return values;
  return [0];
}

export function calcGlobalStats(values: number[]) {
  return {
    min: stats.min(values),
    max: stats.max(values),
    avg: stats.average(values),
    median: stats.median(values),
    mean: stats.mean(values),
  };
}

export async function calcQuantileRank(busta: Busta) {
  const buste = await findAll();

  const quantile = {
    netto: stats.quantileRank(
      valuesByKey("netto", buste),
      parseFloat(busta.nettoDelMese)
    ),
    /*,
    trattenuta: calcGlobalStats(valuesByKey("trattenute", buste)),
    arrotondamento: calcGlobalStats(valuesByKey("arrotondamento", buste)),
    competenze: calcGlobalStats(valuesByKey("competenze", buste)),*/
  };
  return quantile;

  return {};
}
