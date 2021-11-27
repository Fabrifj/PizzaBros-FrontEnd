export class ArticuloModel {
    public Id: number;
    public CantidadMedida: number;
    public Nombre: string;


    constructor(id:number,caM:number, nombre:string,) {
      this.Id =id ;
      this.CantidadMedida = caM;
      this.Nombre = nombre;


    }
  }