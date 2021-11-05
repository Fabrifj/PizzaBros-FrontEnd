import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { FinalOrderModel } from 'src/app/modelos/finalOrder';
import { productModel } from 'src/app/modelos/product.model';
import { UnitOrderModel } from 'src/app/modelos/unitOrder.model';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class HacerPedidoService {

  constructor(private httpService: AppHttpService,private datepipe: DatePipe) {
    this.obtenerProductosHttp();
  }

  ordersChanged = new EventEmitter<UnitOrderModel[]>();
  productos: productModel[] = [];
  pedidos: UnitOrderModel[] = [];
  ngOnInit(): void {
    this.obtenerProductosHttp();

  }
  
  obtenerProductosHttp() {
    this.httpService.obtenerProductos()
      .subscribe((jsonFile) => {
        console.log(jsonFile);
        this.productos = <productModel[]>jsonFile;
        console.log(this.productos[0]);

      });
  }
  crearPedidoHttp(pedidoFinal: FinalOrderModel){
    console.log(pedidoFinal);
    this.httpService.crearPedidos(pedidoFinal);
  }
  obtenerProductos() {
    return this.productos.slice();
  }
  obtenerPedidos() {
    console.log("get orders en accions");
    console.log(this.pedidos);


    return this.pedidos.slice();
  }
  addOrder(newOrder: productModel, amount: number) {

    this.pedidos.push(new UnitOrderModel(newOrder.id, newOrder.Nombre, newOrder.Tamano, newOrder.Precio, (newOrder.Precio * amount), amount));
    console.log("add order");
    this.ordersChanged.emit(this.obtenerPedidos());

  }
  crearPedido( cliente:Cliente){
    let today=new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    let pedidoFinal = new FinalOrderModel(1,123,cliente,date,"Preparando",this.pedidos);
    this.crearPedidoHttp(pedidoFinal);
  }
}
