import { Busta } from "@prisma/client";
import * as stats from "simple-statistics";

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

export function calcStats(values: number[]) {
  return {
    min: stats.min(values),
    max: stats.max(values),
    avg: Math.floor(stats.average(values)),
    median: stats.median(values),
    mean: stats.mean(values),
  };
}
