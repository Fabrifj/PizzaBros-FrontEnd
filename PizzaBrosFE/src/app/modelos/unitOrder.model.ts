export class UnitOrderModel {
    public id: number;
    public Nombre: string;
    public Tamano: string;
    public Precio: number;
    public PrecioT: number;
    public Cantidad: number;
  
    constructor(id: number, name: string, tam : string, precio: number, precioT:number, amount:number) {
      this.id = id;
      this.Nombre = name;
      this.Tamano = tam;
      this.Precio = precio;
      this.PrecioT = precioT;
      this.Cantidad = amount;

    }
  }