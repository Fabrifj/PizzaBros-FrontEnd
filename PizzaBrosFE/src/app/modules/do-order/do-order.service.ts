import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { productModel } from 'src/app/models/product';
import { UnitOrderModel } from 'src/app/models/unitOrder.model';

@Injectable({
  providedIn: 'root'
})
export class DoOrderService {

  ordersChanged = new EventEmitter<UnitOrderModel[]>();
  products:productModel[] = [
    new productModel(100,"Pizza-Simple", "Pequena", 15,10, "ssssss"),
    new productModel(101,"Pizza-Simple", "Mediana", 25,15,"ssssss"),
    new productModel(102,"Pizza-Simple", "Grande", 35,20, "ssssss")
  ];
  orders :UnitOrderModel[] = [];

  getProducts(){
    return this.products.slice();
  }
  getOrders() 
  { 
    console.log("get orders en accions")
    console.log(this.orders);

   
    return this.orders.slice();
  }
  addOrder(newOrder:productModel,amount:number){

    this.orders.push(new UnitOrderModel(newOrder.id,newOrder.Nombre,(newOrder.Precio * amount),amount));
    console.log("add order");
    this.ordersChanged.emit(this.getOrders());

  }
}
