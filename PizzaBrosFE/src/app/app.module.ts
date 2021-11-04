import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PBRoutersModule } from './pb-router/PB-routers.module';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpService } from './servicios/app-http.service';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { InventarioComponent } from './modulos/inventario/inventario.component';
import { ComprasComponent } from './modulos/inventario/compras/compras.component';
import { IngredientesComponent } from './modulos/inventario/ingredientes/ingredientes.component';
import { ProductosComponent } from './modulos/inventario/productos/productos.component';
import { BienesComponent } from './modulos/inventario/bienes/bienes.component';
import { ListaArmadoPedidosComponent } from './modulos/hacer-pedido/lista-armado-pedidos/lista-armado-pedidos.component';
import { InicioComponent } from './modulos/inicio/inicio.component';
import { InfoClienteComponent } from './modulos/hacer-pedido/info-cliente/info-cliente.component';
import { HacerPedidoComponent } from './modulos/hacer-pedido/hacer-pedido.component';
import { MostrarProductosComponent } from './modulos/hacer-pedido/mostrar-productos/mostrar-productos.component';
import { ListaProductosComponent } from './modulos/hacer-pedido/mostrar-productos/lista-productos/lista-productos.component';
import { ListSubMenuComponent } from './shared-modules/list-sub-menu/list-sub-menu.component';
import { ComSubMenuComponent } from './shared-modules/list-sub-menu/com-sub-menu/com-sub-menu.component';
import { TablaReusableComponent } from './modulos/pedidos/tabla-reusable/tabla-reusable.component';
import { PedidosActivosComponent } from './modulos/pedidos/pedidos-activos/pedidos-activos.component';
import { PedidosHistorialComponent } from './modulos/pedidos/pedidos-historial/pedidos-historial.component';
import { ModalModule } from './modulos/pedidos/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TablaReusableComponent,
    ListaArmadoPedidosComponent,
    InicioComponent,
    PedidosComponent,
    HacerPedidoComponent,
    InfoClienteComponent,
    MostrarProductosComponent,
    ListaProductosComponent,
    InventarioComponent,
    ComprasComponent,
    IngredientesComponent,
    ProductosComponent,
    BienesComponent,
    ListSubMenuComponent,
    ComSubMenuComponent,
    PedidosActivosComponent,
    PedidosHistorialComponent
   
    
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PBRoutersModule,
    ModalModule
  ],
  
  providers: [AppHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
