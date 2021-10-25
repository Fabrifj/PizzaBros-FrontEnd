import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import { UnitOrderModel } from 'src/app/models/unitOrder.model';
import { AppHttpService } from 'src/app/services/app-http.service';
@Injectable({
  providedIn: 'root'
})
export class DoOrderService {

  constructor(private httpService: AppHttpService){
    this.getProductsHttp();
  }

  ordersChanged = new EventEmitter<UnitOrderModel[]>();
  products:productModel[]=[];
  orders :UnitOrderModel[] = [];
  ngOnInit(): void {
    this.getProductsHttp();
    
  }
  getProductsHttp(){
    this.httpService.getProducts()
    .subscribe((jsonFile)=>{
      console.log(jsonFile);
      this.products = <productModel[]>jsonFile;
      console.log(this.products[0]);

    } )
  }
  getProducts(){
    return this.products.slice();
  }
  getOrders() 
  { 
    return this.orders.slice();
  }
  addOrder(newOrder:productModel,amount:number){

    this.orders.push(new UnitOrderModel(newOrder.id,newOrder.Nombre,(newOrder.Precio * amount),amount));
    this.ordersChanged.emit(this.getOrders());
  }
}


