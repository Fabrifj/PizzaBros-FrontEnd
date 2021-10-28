import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import * as doOrderService from '../do-order.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {

  constructor(private doOrderService :doOrderService.DoOrderService ) { }


  products: productModel[]=[]; 
  productsToShow : productModel[]=[];
  categoria ="Pizzas";
  ngOnInit(): void {
    console.log("Product Display inti");
    this.products = this.doOrderService.getProducts();
  }
  toCategory(newCategory:string){
    this.categoria= newCategory;
    this.products = this.doOrderService.getProducts();
  }
}
