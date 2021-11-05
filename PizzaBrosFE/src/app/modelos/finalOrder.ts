import { Cliente } from "./cliente";
import { UnitOrderModel } from "./unitOrder.model";

export class FinalOrderModel {
    public Id: number;
    public Cliente: Cliente;
    public IdEmpleado: number;
    public Fecha: string;
    public Estado: string;
    public Detalle: UnitOrderModel[];
  
    constructor(id:number, idEmpleado: number, cliente:Cliente, fecha:string, estado:string, detalle: UnitOrderModel[]) {
      this.Id = id;
      this.IdEmpleado = idEmpleado;
      this.Cliente = cliente;
      this.Fecha = fecha;
      this.Estado = estado;
      this.Detalle = detalle;
    }
  }