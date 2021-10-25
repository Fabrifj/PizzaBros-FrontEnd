import { UnitOrderModel } from "./unitOrder.model";

export class FinalOrderModel {
    public id: number;
    public IdEmpleado: number;
    public Fecha: string;
    public NombreCliente: string;
    public NITCliente: number;
    public Estado: string;
    public Detalle: UnitOrderModel[];
  
    constructor(id:number, idEmpleado: number, fecha:string, nombreCliente:string, nITCliente:number, estado:string, detalle: UnitOrderModel[]) {
      this.id = id;
      this.IdEmpleado = idEmpleado;
      this.Fecha = fecha;
      this.NombreCliente = nombreCliente;
      this.NITCliente = nITCliente;
      this.Estado = estado;
      this.Detalle = detalle;
    }
  }