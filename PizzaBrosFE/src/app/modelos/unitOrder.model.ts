export class UnitOrderModel {
    public id: string;
    public Nombre: string;
    public Tamano: string;
    public Precio: number;
    public PrecioT: number;
    public Cantidad: number;
  
    constructor(id: string, name: string, tam : string, precio: number, precioT:number, amount:number) {
      this.id = id;
      this.Nombre = name;
      this.Tamano = tam;
      this.Precio = precio;
      this.PrecioT = precioT;
      this.Cantidad = amount;

    }
  }