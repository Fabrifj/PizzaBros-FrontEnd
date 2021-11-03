import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/modelos/product.model';
import { HacerPedidoService } from '../hacer-pedido.service';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.css']
})
export class MostrarProductosComponent implements OnInit {

  constructor(private hacerPedidoServicio :HacerPedidoService ) { }


  products: productModel[]=[]; 
  productsToShow : productModel[]=[];
  categoria ="Pizzas";
  ngOnInit(): void {
    console.log("Product Display inti");
    this.products = this.hacerPedidoServicio.obtenerProductos();
  }
  cambiarCategoria(newCategory:string){
    this.categoria= newCategory;
    this.products = this.hacerPedidoServicio.obtenerProductos();
  }
}