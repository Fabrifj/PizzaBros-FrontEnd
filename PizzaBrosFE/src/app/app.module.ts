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
import { TablaReusableComponent } from './shared-modules/tabla-reusable/tabla-reusable.component';
import { PedidosActivosComponent } from './modulos/pedidos/pedidos-activos/pedidos-activos.component';
import { PedidosHistorialComponent } from './modulos/pedidos/pedidos-historial/pedidos-historial.component';
import { ModalModule } from './shared-modules/modal/modal.module';
import { DatePipe } from '@angular/common';
import { HacerCompraComponent } from './modulos/hacer-compra/hacer-compra.component';
import { ListaArmadaComprasComponent } from './modulos/hacer-compra/lista-armada-compras/lista-armada-compras.component';
import { MostrarIngredientesComponent } from './modulos/hacer-compra/mostrar-ingredientes/mostrar-ingredientes.component';
import { ListaIngredientesComponent } from './modulos/hacer-compra/mostrar-ingredientes/lista-ingredientes/lista-ingredientes.component';
import { EmpleadosComponent } from './modulos/empleados/empleados.component';
import { SueldosEmpleadosComponent } from './modulos/empleados/sueldos-empleados/sueldos-empleados.component';
import { TurnosEmpleadosComponent } from './modulos/empleados/turnos-empleados/turnos-empleados.component';
import { DetallesEmpleadosComponent } from './modulos/empleados/detalles-empleados/detalles-empleados.component';
import { CreacionProductosComponent } from './modulos/inventario/productos/creacion-productos/creacion-productos.component';
import { CreacionCategoriasComponent } from './modulos/inventario/productos/creacion-categorias/creacion-categorias.component';
import { VerProductosComponent } from './modulos/inventario/productos/ver-productos/ver-productos.component';
import { BotonesCategoriaComponent } from './modulos/hacer-pedido/mostrar-productos/botones-categoria/botones-categoria.component';
import { BtnsSeleccionadosComponent } from './modulos/empleados/turnos-empleados/btns-seleccionados/btns-seleccionados.component';
import { FormsModule } from '@angular/forms';


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
    PedidosHistorialComponent,
    HacerCompraComponent,
    ListaArmadaComprasComponent,
    MostrarIngredientesComponent,
    ListaIngredientesComponent,
    EmpleadosComponent,
    SueldosEmpleadosComponent,
    TurnosEmpleadosComponent,
    DetallesEmpleadosComponent,
    CreacionProductosComponent,
    CreacionCategoriasComponent,
    VerProductosComponent,
    BotonesCategoriaComponent,
    BtnsSeleccionadosComponent
   
    
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PBRoutersModule,
    ModalModule,
    FormsModule
  ],
  
  providers: [AppHttpService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
