import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { HacerPedidoService } from '../hacer-pedido.service';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.css']
})
export class InfoClienteComponent implements OnInit {
  
  @ViewChild('nitInput', { static: false }) Nit: ElementRef ;
  @ViewChild('nombreInput', { static: false }) Nombre: ElementRef ;

  constructor(private hacerPedidoServicio: HacerPedidoService) {  
  }

  ngOnInit(): void {
  }

  registarPedido(){
    let name:string = this.Nombre.nativeElement.value;
    console.log(name);
    let nit: number = this.Nit.nativeElement.value;
    this.hacerPedidoServicio.crearPedido(new Cliente(name,nit));
  }

}
