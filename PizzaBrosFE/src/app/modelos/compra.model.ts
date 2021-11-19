import { ArticuloModel } from "./articulo.model";

export class ingredienteModel {
    public Id: number;
    public Fecha: string;
    public Total: number;
    public ListaIngredientes: ArticuloModel[];

  
    constructor(id: number, fecha:string,total:number, ListaIngredientes: ArticuloModel[]) {
      this.Id = id;
      this.Fecha = fecha;
      this.Total = total;
      this.ListaIngredientes = ListaIngredientes;

    }
  }