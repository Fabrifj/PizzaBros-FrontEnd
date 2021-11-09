import { EventEmitter, Injectable } from '@angular/core';
import { ingredienteModel } from 'src/app/modelos/ingrediente.model';

@Injectable({
  providedIn: 'root'
})
export class HacerCompraService {

  comprasCambio = new EventEmitter<ingredienteModel[]>();

  ingredintes:ingredienteModel[] =[] ; 
  constructor() { }
  addIngrediente(newOrder: ingredienteModel, amount: number) {

    this.ingredintes.push(newOrder);
    console.log("add order");
    this.comprasCambio.emit(this.obtenerListaCompras());

  }
  obtenerListaCompras() {
    return this.ingredintes.slice();
  }
  registrarCompra(){
    
  }

}
