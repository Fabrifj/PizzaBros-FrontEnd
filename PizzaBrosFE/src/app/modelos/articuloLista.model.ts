export class ArticuloListaModel {
    public Costo: number;
    public CantidadMedida: number;
    public Marca: string;


    constructor(Costo:number,caM:number, Marca:string,) {
      this.Costo =Costo ;
      this.CantidadMedida = caM;
      this.Marca = Marca;


    }
  }