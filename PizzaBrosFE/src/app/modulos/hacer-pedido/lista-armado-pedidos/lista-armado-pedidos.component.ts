import { Component, OnInit ,OnChanges } from '@angular/core';
import { UnitOrderModel } from 'src/app/modelos/unitOrder.model';
import { HacerPedidoService } from '../hacer-pedido.service';

@Component({
  selector: 'app-lista-armado-pedidos',
  templateUrl: './lista-armado-pedidos.component.html',
  styleUrls: ['./lista-armado-pedidos.component.css']
})
export class ListaArmadoPedidosComponent implements OnInit,OnChanges {


  datos = ['hey','heo'];
  
  subscription :any;
  constructor( private hacerPedidoServicio:HacerPedidoService ) { }

  pedidos: UnitOrderModel[]=[];

  ngOnInit(): void {
    this.pedidos= this.hacerPedidoServicio.obtenerPedidos();
    this.hacerPedidoServicio.ordersChanged.subscribe(
      (newOrders:  UnitOrderModel[])=>{
        this.pedidos = newOrders;
      }
    )
    
  }
   //asdasdasda
  ngOnChanges(){
    this.pedidos = this.hacerPedidoServicio.obtenerPedidos();
    console.log("on changes listado");
    console.log(this.pedidos);



  }
  saveOrders(item:any){
    this.pedidos = item;

  }

  
  

}
