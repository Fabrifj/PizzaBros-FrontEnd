import { Component, Input, OnInit } from '@angular/core';
import { productModel } from 'src/app/modelos/product.model';
import { HacerPedidoService } from '../../hacer-pedido.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(private hacerPedidoServicio:HacerPedidoService) { }
  

  @Input() product!: productModel;
  @Input() index=0; 
  

  ngOnInit(): void {
  }
  anhadirProducto(){
    this.hacerPedidoServicio.addOrder(this.product,2);
  }
}