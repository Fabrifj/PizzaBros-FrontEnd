import { Injectable } from '@angular/core';
import { CajaModel } from 'src/app/modelos/caja.model';
import { AppHttpService } from 'src/app/servicios/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  transacciones:CajaModel[] = [ 
    new CajaModel(new Date("12-05-2000"),"Egreso","Pago de sueldos",2000),
    new CajaModel(new Date("12-05-2000"),"Ingreso","Venta de papas",2000),
    new CajaModel(new Date("12-05-2000"),"Egreso","Pago de sueldos2",2000)

  ]
  constructor(private httpService:AppHttpService) { 
    this
  }



  getTransacciones(){
    return this.transacciones;
  }

}
