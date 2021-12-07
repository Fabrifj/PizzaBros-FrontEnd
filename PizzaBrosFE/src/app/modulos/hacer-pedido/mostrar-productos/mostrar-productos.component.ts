import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/modelos/product.model';
import { productCatModel } from 'src/app/modelos/productCat.model';
import { HacerPedidoService } from '../hacer-pedido.service';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.css']
})
export class MostrarProductosComponent implements OnInit {

  constructor(private hacerPedidoServicio :HacerPedidoService ) { }


  products: productModel[]=[]; 
  productsAux : productModel[]=[];
  nombres: string[]=[];
  categoria ="Pizzas";
  ngOnInit(): void {
    this.products = this.hacerPedidoServicio.obtenerProductos();
  }
  cambiarCategoria(newCategory:string,products:productCatModel[]){
    this.categoria= newCategory;
    this.productsAux = [];
    
    this.nombres = products.map((prod)=>{
      return prod['NombreProducto']
    })
    
    this.products = this.hacerPedidoServicio.obtenerProductos();
    this.products = this.products.filter((prod)=>{return this.nombres.includes(prod.Nombre)})
  }
}