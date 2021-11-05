import { Cliente } from "./cliente";
import { UnitOrderModel } from "./unitOrder.model";

export class FinalOrderModel {
    public id: number;
    public cliente: Cliente;
    public IdEmpleado: number;
    public Fecha: string;
    public Estado: string;
    public Detalle: UnitOrderModel[];
  
    constructor(id:number, idEmpleado: number, cliente:Cliente, fecha:string, estado:string, detalle: UnitOrderModel[]) {
      this.id = id;
      this.IdEmpleado = idEmpleado;
      this.cliente = cliente;
      this.Fecha = fecha;
      this.Estado = estado;
      this.Detalle = detalle;
    }
  }