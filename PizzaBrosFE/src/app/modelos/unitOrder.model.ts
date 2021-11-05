export class UnitOrderModel {
    public Id: number;
    public Nombre: string;
    public Tamano: string;
    public Precio: number;
    public PrecioT: number;
    public Cantidad: number;
  
    constructor(id: number, name: string, tam : string, precio: number, precioT:number, amount:number) {
      this.Id = id;
      this.Nombre = name;
      this.Tamano = tam;
      this.Precio = precio;
      this.PrecioT = precioT;
      this.Cantidad = amount;

    }
  }