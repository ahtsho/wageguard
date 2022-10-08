export class Busta {
  private datiAziendali: Azienda;
  private datiDipendente: Dipendente;
  private datiRetribuzione: Retribuzione;
  private lavoroSvolto: Lavoro;
  private vociVariabili: VoceVariabile[];
  private progressivi: Progressivi;
  constructor(
    datiAz: Azienda,
    datiDip: Dipendente,
    lavoro: Lavoro,
    retrib: Retribuzione,
    vv: VoceVariabile[],
    con?: Conguaglio,
    prog?: Progressivi,
    tfr?: TFR,
    ratei?: Rateo[],
    tot?: TotaleRetribuzione
  ) {
    this.datiAziendali = datiAz;
    this.datiDipendente = datiDip;
    this.lavoroSvolto = lavoro;
    this.datiRetribuzione = retrib;
    this.vociVariabili = vv;
  }
}
