import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActiveOrdersComponent } from './modules/orders/active-orders/active-orders.component';
import { OrdersHistoryComponent } from './modules/orders/orders-history/orders-history.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { PBRoutersModule } from './pb-router/PB-routers.module';
import { MainButtonsComponent } from './modules/orders/main-buttons/main-buttons.component';
import { ModalModule } from './modules/orders/modal/modal.module';
import { ReusableTableComponent } from './modules/orders/reusable-table/reusable-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaArmadoPedidosComponent } from './modulos/hacer-pedido/lista-armado-pedidos/lista-armado-pedidos.component';
import { AppHttpService } from './servicios/app-http.service';
import { InicioComponent } from './modulos/inicio/inicio.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { HacerPedidoComponent } from './modulos/hacer-pedido/hacer-pedido.component';
import { InfoClienteComponent } from './modulos/hacer-pedido/info-cliente/info-cliente.component';
import { MostrarProductosComponent } from './modulos/hacer-pedido/mostrar-productos/mostrar-productos.component';
import { ListaProductosComponent } from './modulos/hacer-pedido/mostrar-productos/lista-productos/lista-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrdersComponent,
    ActiveOrdersComponent,
    OrdersHistoryComponent,
    MainButtonsComponent,
    ReusableTableComponent,
    ListaArmadoPedidosComponent,
    InicioComponent,
    PedidosComponent,
    HacerPedidoComponent,
    InfoClienteComponent,
    MostrarProductosComponent,
    ListaProductosComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PBRoutersModule,
    ModalModule  ],
  providers: [AppHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
