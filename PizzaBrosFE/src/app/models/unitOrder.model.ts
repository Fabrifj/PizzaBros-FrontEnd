export class UnitOrderModel {
    public id: number;
    public Nombre: string;
    public Precio: number;
    public Cantidad: number;
  
    constructor(id: number, name: string, precio: number, amount:number) {
      this.id = id;
      this.Nombre = name;
      this.Precio = precio;
      this.Cantidad = amount;
    }
  }