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


  //productos
  obtenerProductos() {
    console.log("path:",paths.obtenerProductos)
    return this.http.get(paths.obtenerProductos)
  }
  crearProducto(body:any) {
    console.log(paths.obtenerProductos)
    return this.http.post(paths.creaProducto , body)
  }

  crearPedido(body:any) {
    console.log("ssss");
    return  this.http.post(paths.crearPedido,body)
   

  }
  obtenerPedidos() {
    return this.http.get(paths.obtenerPedidos)
  }
  obtenerCompras(){
    ///api/getPedidosEstado/:estado
    return this.http.get(paths.obtenerPedidoEstado+"Preparando")
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
    
    var path = paths.obtenerPedidos2D + inicio + "/"+ final  ;
    return this.http.get(path)
  }
  
  obtenerPedido2DiasCli(body : any){
    var inicio = body[0];
    var final = body[1];
    var cli = body[2];
    var path = paths.obtenerPedidos2DCli + inicio + "/"+ final + "/" + cli ;
    return this.http.get(path)
  }
  obtenerPedido1DiaCli(body:any){
    var fecha = body[0];
    var cli = body[1];
    var path = paths.obtenerPedidoFechaNit + fecha + "/"+ cli ;
    console.log(path);
    return this.http.get(path)
  }
  obtenerPedidosCliente(nitCliente:any){
    let path = paths.obtenerPedidosCliente+ nitCliente;
    
    return this.http.get(path )
  }

   
  ///ingredientrs
  obtenerIngredientes() {
    return this.http.get(paths.obtenerIngredientes)
  }
  crearIngrediente(body:any) {
    return this.http.post(paths.crearIngrediente,body)
  }

  //bienes
  obtenerBien(){
    return this.http.get(paths.obtenerBien)

  }
  crearBien(body:any){
    return this.http.post(paths.crearBien,body)
  }
  ///no implementado obtener bien nombre ni acutalizar bien
  
  
}
