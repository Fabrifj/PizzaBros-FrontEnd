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
<<<<<<< HEAD:PizzaBrosFE/src/app/modules/do-order/lista-armado-pedidos/lista-armado-pedidos.component.ts
    }
=======
  }
   //asdasdasda
>>>>>>> 51727b9f8585b403e0ce00225bdf3154508d793c:PizzaBrosFE/src/app/modulos/hacer-pedido/lista-armado-pedidos/lista-armado-pedidos.component.ts
  ngOnChanges(){
    this.pedidos = this.hacerPedidoServicio.obtenerPedidos();
    console.log("on changes listado");
    console.log(this.pedidos);



  }
  saveOrders(item:any){
    this.pedidos = item;

  }

  
  

}
