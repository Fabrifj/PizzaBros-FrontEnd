import { Component, OnInit } from '@angular/core';
import { UnitOrderModel } from 'src/app/models/unitOrder.model';
import { DoOrderService } from '../do-order.service';

@Component({
  selector: 'app-lista-armado-pedidos',
  templateUrl: './lista-armado-pedidos.component.html',
  styleUrls: ['./lista-armado-pedidos.component.css']
})
export class ListaArmadoPedidosComponent implements OnInit {

  constructor( private doOrderService:DoOrderService) { }

  orders: UnitOrderModel[]=[];
  ngOnInit(): void {
    this.orders = this.doOrderService.getOrders();

  }

}
