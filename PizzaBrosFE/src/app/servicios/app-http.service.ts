import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, throttleTime } from 'rxjs/operators';

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
    
    return this.http.post(paths.crearProducto , body)
  }
  obtenerProductoId(Id:any) {
    var path = paths.obtenerProductoId + Id;
    return this.http.get(path)
  }
  actualizarProducto(Id:any,body:any) {
    var path = paths.actualizarProducto + Id;
    return this.http.put(path,body)
  }
  


  //pedidos
  crearPedido(body:any) {
    console.log("ssss");
    return  this.http.post(paths.crearPedido,body)
   

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
  //compras
  obtenerCompras(){
    ///api/getPedidosEstado/:estado
    return this.http.get(paths.obtenerPedidoEstado+"Preparando")
  }
  
  

   
  ///elementos
  obtenerIngredientes() {
    return this.http.get(paths.obtenerIngredientes)
  }
  obtenerBien(){
    return this.http.get(paths.obtenerBienes)

  }
  obtenerElementos(){

    return this.http.get(paths.obtenerElementos);
  }
  obtenerElementoId(id:any){
    var path = paths.obtenerElementoId + id;
    return this.http.get(path)
  }
  crearElemento(body:any) {
    return this.http.post(paths.crearElemento,body)
  }
  eliminarElemento(id:any){
    var path = paths.eliminarElemento + id;
    return this.http.delete(path);
  }
  actualizarElemento(id:any,body:any){
    var path = paths.actualizarElemento + id;
    return this.http.put(path,body);
  }
  actualizarElemAgregarInv(id:any,body:any){

    var path = paths.actualizarElemAgregarInv + id + "/agregarInv";
    return this.http.put(path ,body)
  }

  

  //categoria
  crearCategoria(body:any){
    return this.http.post(paths.crearCategoria,body)

  }
  obtenerCategorias(){
    console.log(paths.obtenerCategorias)
    return this.http.get(paths.obtenerCategorias)
  }
  obtenerProdCatNombre(nombreCat:any){
    var path = paths.obtenerProdCatNombre + nombreCat + '/productos';
    return this.http.get(path)
  }
  eliminarCategoria(idCat:any){
    var path = paths.eliminarCategoria + idCat
    return this.http.delete(path)
  }
  actualizarCategoria(idCat:any, cat:any){
    var path = paths.actualizarCategoria + idCat
    return this.http.put(path,cat)
  }



  //empleados  
  obtenerEmpleados(){
    
    return this.http.get(paths.obtenerEmpleados)
  }
  crearEmpleado(body:any){
    return this.http.post(paths.crearEmpleado,body)

  }
  actualizarEmpleado(id:any , body:any){
    var path = paths.actualizarEmpleado + id
    return this.http.put(path,body)

  }
  
  

  obtenerEmpleado(idEmp:any){
    var path = paths.obtenerEmpleado + idEmp
    return this.http.get(path)
  }

}
