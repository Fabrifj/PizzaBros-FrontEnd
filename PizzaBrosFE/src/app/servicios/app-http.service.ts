import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  getOrderB2datesAll(body : any){
    var inicio = body[0];
    var final = body[1];
    var path = "/api/pedidos2Fechas/" + inicio + "/"+ final;
    return this.http.get(paths.getPedidosBetween2Dates,body)
  }
  getOrderB2datesCli(body : any){
    
    return this.http.get(paths.getPedidosBetween2DatesClientNIT,body)
  }
  getOrder1dayClient(body:any){

    return this.http.get(paths.getPedidoFechaNIT,body)
  }
  obtenerPedidosCliente(nitCliente:any){
    let path = paths.getPedidosCliente + nitCliente;
    console.log(path);
    return this.http.get(path )
  }


}
