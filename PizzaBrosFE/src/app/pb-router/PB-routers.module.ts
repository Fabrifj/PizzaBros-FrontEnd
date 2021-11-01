import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveOrdersComponent } from '../modules/orders/active-orders/active-orders.component';
import { OrdersHistoryComponent } from '../modules/orders/orders-history/orders-history.component';
import { OrdersComponent } from '../modules/orders/orders.component';
import { HacerPedidoComponent } from '../modulos/hacer-pedido/hacer-pedido.component';
import { InicioComponent } from '../modulos/inicio/inicio.component';
import { PedidosActivosComponent } from '../modulos/pedidos/pedidos-activos/pedidos-activos.component';
import { PedidosHistorialComponent } from '../modulos/pedidos/pedidos-historial/pedidos-historial.component';
import { PedidosComponent } from '../modulos/pedidos/pedidos.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    children: [
      { path: 'pedidos-activos', component: PedidosActivosComponent },
      { path: 'pedidos-historial', component: PedidosHistorialComponent}  
     ]
  },
  {
    path: 'hacer-pedidos',
    component: HacerPedidoComponent,
    children: [
    ]
  },
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class PBRoutersModule { }
