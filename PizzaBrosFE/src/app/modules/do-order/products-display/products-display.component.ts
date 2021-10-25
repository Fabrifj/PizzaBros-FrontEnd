import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product';
import { DoOrderService } from '../do-order.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {

  constructor(private doOrderService :DoOrderService ) { }


  products: productModel[]=[]; 
  productsToShow : productModel[]=[];
  categoria ="Pizzas";
  ngOnInit(): void {
    this.products = this.doOrderService.getProducts();
  }
  toCategory(newCategory:string){
    this.categoria= newCategory;
    this.productsToShow = [];
    this.products.forEach(element => {
      this.productsToShow.push(element);
    });
  }
}
