import { Component, OnInit } from '@angular/core';
import { RutaTituloModel } from 'src/app/modelos/rutaTitulo.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  today= new Date(); ;
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  
  constructor() { }
  subMenus : RutaTituloModel[] = [
    {Ruta: "hacer-pedidos",Nombre: "Realizar Pedido"},
    {Ruta: "pedidos-historial",Nombre: "Historial Pedidos"},
    {Ruta: "pedidos-activos",Nombre: "Pedidos Actuales"}
    
  ];
  ngOnInit(): void {
  }

}
