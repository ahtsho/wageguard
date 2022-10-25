export class Busta {
  public retribuzione: TotaleRetribuzione;
  private datiAziendali?: Azienda;
  private datiDipendente?: Dipendente;
  private datiRetribuzione?: Retribuzione;
  private lavoroSvolto?: Lavoro;
  private vociVariabili?: VoceVariabile[];
  private progressivi?: Progressivi;

  constructor(retibTot: TotaleRetribuzione) {
    this.retribuzione = retibTot;
  }
}
