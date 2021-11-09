export class ingredienteModel {
    public Id: number;
    public Fecha: string;
    public Total: number;
    public ListaIngredientes: ingredienteModel[];

  
    constructor(id: number, fecha:string,total:number, ListaIngredientes: ingredienteModel[]) {
      this.Id = id;
      this.Fecha = fecha;
      this.Total = total;
      this.ListaIngredientes = ListaIngredientes;

    }
  }