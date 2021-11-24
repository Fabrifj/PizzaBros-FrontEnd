export class ArticuloCompradoModel {
    public Id: number;
    public Marca: string;
    public Nombre: string;
    public CantidadMedida: number;

    public Cantidad: number;
    public Precio:number;
    
    constructor(id:number,marca:string, nombre:string,caM:number, cantidad:number, precio:number) {
      this.Id =id ;
      this.Nombre = nombre;
      this.Marca = marca;
      this.CantidadMedida = caM;

      this.Cantidad = cantidad;
      this.Precio = precio;
    }
  }