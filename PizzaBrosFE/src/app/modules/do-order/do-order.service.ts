import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DoOrderService {
  
  ordersChanged = new EventEmitter<String[]>();
  products= ["Pizza1","Pizza2","Pizza3","Pizza4"];
  orders :string[] = [];

  getProducts(){
    return this.products.slice();
  }
  getOrders(){
    return this.orders.slice();
  }
  addOrder(newOrder:string){
    this.orders.push(newOrder);
    this.ordersChanged.emit(this.getOrders());
  }
}
