import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';

import { ModalModule } from '../modal/modal.module';


@Component({
  selector: 'app-list-object',
  templateUrl: './list-object.component.html',
  styleUrls: ['./list-object.component.css']
})
export class ListObjectComponent implements OnInit {


  tableTitle1: string | undefined;
  tableTitle2: string | undefined;
  pedidoData:any=[
    {num:"Pedido 1",descripcion:"Sarmiento",estado:"pendiente"},
    {num:"Pedido 2",descripcion:"Sanchez",estado:"pendiente"},
    {num:"Pedido 3",descripcion:"Perez",estado:"entregado"},
    {num:"Pedido 4",descripcion:"Nava",estado:"pendiente"},
    {num:"Pedido 5",descripcion:"Duran",estado:"entregado"},
    {num:"Pedido 6",descripcion:"Allende",estado:"pendiente"},
  
  ];



  pedidoNum:any;
  pedidoDescripcion:any;
  pedidoEstado: any;

  
  constructor(public modalService:ModalService) { }

  ngOnInit(): void {
    this.tableTitle1 = "Nro. Pedido";
    this.tableTitle2 = "Cliente"
  }

  changeStateOrder(pedido:any){
    console.log("Presionó el boton");
    console.log(pedido.estado);
  }
  seeOrder(pedido:any){
    console.log("Presionó el boton");
    console.log(pedido.descripcion);
  }
  rellenarPedido(pedido:any){
    this.pedidoNum = pedido.num;
    console.log("click 2")
    this.pedidoEstado = pedido.estado;
    this.pedidoDescripcion = pedido.descripcion;


  }
}
