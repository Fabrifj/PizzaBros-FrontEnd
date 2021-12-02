import { Injectable } from '@angular/core';
import { CajaModel } from 'src/app/modelos/caja.model';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  transacciones:CajaModel[] = [ 
    new CajaModel(new Date("12-05-2000"),"Egreso","Pago de sueldos",2000),
    new CajaModel(new Date("12-05-2000"),"Ingreso","Venta de papas",2000),
    new CajaModel(new Date("12-05-2000"),"Egreso","Pago de sueldos2",2000)

  ]
  constructor() { }

  getTransacciones(){
    return this.transacciones;
  }
}
