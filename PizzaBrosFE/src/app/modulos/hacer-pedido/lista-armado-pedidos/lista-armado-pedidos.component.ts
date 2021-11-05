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
  constructor( private hacerPedidoServicio:HacerPedidoService ) { }

  pedidos: UnitOrderModel[]=[];
  cantidadPedidos: number = 0;
  totalPrecio:number =0; 

  ngOnInit(): void {
    this.pedidos= this.hacerPedidoServicio.obtenerPedidos();
    this.hacerPedidoServicio.ordersChanged.subscribe(
      (newOrders:  UnitOrderModel[])=>{
        this.pedidos = newOrders;
        this.calcularActualizacion();

      }
    )
<<<<<<< HEAD
=======
    
>>>>>>> ac495eed9853406e0720b3250b662340bd4711e4
  }
   //asdasdasda
  ngOnChanges(){
    this.pedidos = this.hacerPedidoServicio.obtenerPedidos();
    this.calcularActualizacion();
    console.log("on changes listado");
    console.log(this.pedidos);



  }
  calcularActualizacion(){
    this.cantidadPedidos = 0;
    this.totalPrecio =0; 
    for (let index = 0; index < this.pedidos.length; index++) {
      this.cantidadPedidos += this.pedidos[index].Cantidad;
      console.log(this.cantidadPedidos);
      this.totalPrecio += this.pedidos[index].PrecioT;  
    }
  }

  saveOrders(item:any){
    this.pedidos = item;

  }
  cambioCantidad(i:number ){
    this.pedidos[i].Cantidad = +this.amount.nativeElement.value;
    this.pedidos[i].PrecioT = this.pedidos[i].Cantidad * this.pedidos[i].Precio; 
    this.calcularActualizacion();
  }
  
  

}
