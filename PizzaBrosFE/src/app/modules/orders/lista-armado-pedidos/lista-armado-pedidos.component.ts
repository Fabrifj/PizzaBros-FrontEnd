import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-armado-pedidos',
  templateUrl: './lista-armado-pedidos.component.html',
  styleUrls: ['./lista-armado-pedidos.component.css']
})
export class ListaArmadoPedidosComponent implements OnInit {


  datos = ['hey','heo'];
  constructor() { }

  ngOnInit(): void {
  }

}
