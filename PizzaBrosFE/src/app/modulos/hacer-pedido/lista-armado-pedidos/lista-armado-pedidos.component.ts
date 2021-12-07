import { Component, OnInit ,OnChanges, ElementRef, ViewChild } from '@angular/core';
import { UnitOrderModel } from 'src/app/modelos/unitOrder.model';
import { HacerPedidoService } from '../hacer-pedido.service';

@Component({
  selector: 'app-lista-armado-pedidos',
  templateUrl: './lista-armado-pedidos.component.html',
  styleUrls: ['./lista-armado-pedidos.component.css']
})
export class ListaArmadoPedidosComponent implements OnInit,OnChanges {
  @ViewChild('amountInput', { static: false }) amount: ElementRef ;

  datos = ['hey','heo'];
  
  subscription :any;
  constructor( public hacerPedidoServicio:HacerPedidoService ) { }

  cantidadPedidos: number = 0;
  totalPrecio:number =0; 

  ngOnInit(): void {
    this.hacerPedidoServicio.pedidos= this.hacerPedidoServicio.obtenerPedidos();
    this.hacerPedidoServicio.ordersChanged.subscribe(
      (newOrders:  UnitOrderModel[])=>{
        this.hacerPedidoServicio.pedidos = newOrders;
        this.calcularActualizacion();

      }
    )
    
  }
   //asdasdasda
  ngOnChanges(){
    this.hacerPedidoServicio.pedidos = this.hacerPedidoServicio.obtenerPedidos();
    this.calcularActualizacion();
  }
  calcularActualizacion(){
    this.cantidadPedidos = 0;
    this.totalPrecio =0; 
    for (let index = 0; index < this.hacerPedidoServicio.pedidos.length; index++) {
      this.cantidadPedidos += this.hacerPedidoServicio.pedidos[index].Cantidad;
      this.totalPrecio += this.hacerPedidoServicio.pedidos[index].PrecioT;  
    }
  }

  cambioCantidad(i:number ){
    this.hacerPedidoServicio.pedidos[i].Cantidad = +this.amount.nativeElement.value;
    this.hacerPedidoServicio.pedidos[i].PrecioT = this.hacerPedidoServicio.pedidos[i].Cantidad * this.hacerPedidoServicio.pedidos[i].Precio; 
    this.calcularActualizacion();
  }

  eliminarPedido(i:number){
    let foo_object  = this.hacerPedidoServicio.pedidos[i]// Item to remove
    this.hacerPedidoServicio.pedidos = this.hacerPedidoServicio.pedidos.filter(obj => obj !== foo_object);
    alert('Elimino un elemento');
    this.calcularActualizacion();
  }

}
