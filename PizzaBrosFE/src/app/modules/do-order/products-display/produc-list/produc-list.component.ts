import { Component, Input, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import { DoOrderService } from '../../do-order.service';

@Component({
  selector: 'app-produc-list',
  templateUrl: './produc-list.component.html',
  styleUrls: ['./produc-list.component.css']
})
export class ProducListComponent implements OnInit {
  constructor(private doOrderService:DoOrderService) { }
  

  @Input() product!: productModel;
  @Input() index=0; 
  

  ngOnInit(): void {
  }
  addProduct(){
    this.doOrderService.addOrder(this.product,1);
  }
}
