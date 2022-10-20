interface Azienda {
  codiceAzienda: number;
  ragioneSociale: string;
}
interface Dipendente {
  codiceDipendente: number;
  cognome: string;
  nome: string;
  codiceFiscale: string;
  matricola?: string;
  dataDiNascita: Date;
  dataDiAssunzione: Date;
  dataDiCessazione?: Date;
  livello: string;
}
interface Lavoro {
  inps: TempoInps;
  minimale: TempoMinimale;
  lavorato?: TempoLavorato;
  giorniDetrazioni: number;
}
interface TempoInps {
  settimane: number;
  giorni: number;
  ore?: number;
}
interface TempoMinimale {
  giorni: number;
  ore: number;
}
interface TempoLavorato {
  giorni: number;
  oreOrdinarie?: number;
  oreStraordinarie?: number;
}
interface Retribuzione {
  pagaBase: number;
  contingenza: number;
  terzoElemento: number;
  pattoDiNonConcorrenza: number;
  totale: number;
  prossimoScatto: Date;
}
interface TotaleRetribuzione {
  periodoRetribuzione: { mese: string; anno: number };
  totaleCompetenze: string;
  totaleTrattenute: string;
  arrotondamento: string;
  nettoDelMese: string;
}
interface Ente {
  INPS: boolean;
  IRPEF: boolean;
}
interface VoceVariabile {
  soggetto: Ente;
  codice: string;
  descrizione: string;
  importoBase: number;
  riferimento: number;
  trattenute: number;
  competenze: number;
}
interface Conguaglio {}
interface Progressivi {
  impInps: number;
  impInail: number;
  impIrpef: number;
  irpefPagata: number;
}
interface TFR {
  fdo: Date;
  rivalutazione?: number;
  impRivalutazione?: number;
  quotaAnno: number;
  TFRAFondi?: number;
  anticipi?: number;
}
interface Rateo {
  titolo: "Ferie" | "PermessiEX-Fs";
  maturatoOre: number;
  godutoOre: number;
  residuoOre: number;
  residuoAPOre: number;
}
