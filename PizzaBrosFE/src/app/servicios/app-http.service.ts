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
  crearPedidos(body:undefined) {
    return this.http.get(paths.postPedido,body)
  }
  obtenerPedidos() {
    return this.http.get(paths.obtenerPedidos)
  }
  
  
  obtenerPedidoEstadoPr(){
    ///api/getPedidosEstado/:estado
    return this.http.get(paths.obtenerPedidoEstado+"Preparando")
  }

  // "updatePedidoEstado":"/api/updatePedidoEstado",
  actualizarPedidoEstado( body: any){
    let path = paths.actualizarPedidoEstado;
    return this.http.post(path,body)
  }
  obtenerPedido2DiasT(body : any){
    var inicio = body[0];
    var final = body[1];
    var path = paths.obtenerPedidos2D + inicio + "/"+ final;
    return this.http.get(path,body)
  }
  obtenerPedido2DiasCli(body : any){
    var inicio = body[0];
    var final = body[1];
    var cli = body[2];
    var path = paths.obtenerPedidos2DCli + inicio + "/"+ final + "/" + cli ;
    return this.http.get(path,body)
  }
  obtenerPedido1DiaCli(body:any){
    var fecha = body[0];
    var cli = body[1];
    var path = paths.obtenerPedidosFechaNit + fecha + "/"+ cli ;
    return this.http.get(path,body)
  }
  obtenerPedidosCliente(nitCliente:any){
    let path = paths.obtenerPedidosCliente+ nitCliente;
    
    return this.http.get(path )
  }


}
