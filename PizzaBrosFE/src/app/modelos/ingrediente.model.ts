export class ingredienteModel {
    public Id: number;
    public Nombre: string;
    // public lengt: string
    public UnidadMedida: string;
    public Cantidad: number;
    public CostoUnidad: number;

  
    constructor(id: number, name: string, UM: string, cantidad:number,costo: number) {
      this.Id = id;
      this.Nombre = name;
      this.UnidadMedida = UM;
      this.Cantidad = cantidad;
      this.CostoUnidad = costo;

    }
  }
