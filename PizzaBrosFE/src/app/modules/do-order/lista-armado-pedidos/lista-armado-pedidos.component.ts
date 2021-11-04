import { Component, OnInit ,OnChanges } from '@angular/core';
import { UnitOrderModel } from 'src/app/models/unitOrder.model';
import { DoOrderService } from '../do-order.service';

@Component({
  selector: 'app-lista-armado-pedidos',
  templateUrl: './lista-armado-pedidos.component.html',
  styleUrls: ['./lista-armado-pedidos.component.css']
})
export class ListaArmadoPedidosComponent implements OnInit,OnChanges {


  datos = ['hey','heo'];
  
  subscription :any;
  constructor( private doOrderService:DoOrderService ) { }

  orders: UnitOrderModel[]=[];

  ngOnInit(): void {
    this.orders= this.doOrderService.getOrders();
    this.doOrderService.ordersChanged.subscribe(
      (newOrders:  UnitOrderModel[])=>{
        this.orders = newOrders;
      }
    )
  }
  ngOnChanges(){
    this.orders = this.doOrderService.getOrders();
    console.log("on changes listado");
    console.log(this.orders);



  }
  saveOrders(item:any){
    this.orders = item;

  }

  updateCantidad()
  {
    var x = document.getElementById("id_cantidad");
    console.log(x)
  }

  

}
