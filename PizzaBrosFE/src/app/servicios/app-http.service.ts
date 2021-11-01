import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import paths from './config.json';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor( private http: HttpClient) { }

  defUrl = "/api/";
  getProducts() {
    console.log(paths.getProducts)
    return this.http.get(paths.getProducts)
  }
  getOrders() {
    return this.http.get(paths.getPedidos)
  }
  postOrders(body:undefined) {
    return this.http.get(paths.postPedido,body)
  }
  
  getOrderStatePreparing(){
    ///api/getPedidosEstado/:estado
    return this.http.get(this.defUrl+"getPedidosEstado/Preparando")
  }

  // "updatePedidoEstado":"/api/updatePedidoEstado",
  updateOrderState( body: any){
    let path = this.defUrl+"updatePedidoEstado"
    this.http.post(path,body)
  }


}
