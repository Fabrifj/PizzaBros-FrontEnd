import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HacerPedidoComponent } from '../modulos/hacer-pedido/hacer-pedido.component';
import { InicioComponent } from '../modulos/inicio/inicio.component';
import { BienesComponent } from '../modulos/inventario/bienes/bienes.component';
import { ComprasComponent } from '../modulos/inventario/compras/compras.component';
import { IngredientesComponent } from '../modulos/inventario/ingredientes/ingredientes.component';
import { InventarioComponent } from '../modulos/inventario/inventario.component';
import { ProductosComponent } from '../modulos/inventario/productos/productos.component';
import { PedidosActivosComponent } from '../modulos/pedidos/pedidos-activos/pedidos-activos.component';
import { PedidosHistorialComponent } from '../modulos/pedidos/pedidos-historial/pedidos-historial.component';
import { PedidosComponent } from '../modulos/pedidos/pedidos.component';
import { TablaReusableComponent } from '../modulos/pedidos/tabla-reusable/tabla-reusable.component';



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
  {
    path: 'inventario',
    component: InventarioComponent,
    children: [
      { path: 'compras', component: ComprasComponent },
      { path: 'bienes', component: BienesComponent},
      { path: 'productos', component: ProductosComponent },
      { path: 'ingredientes', component: IngredientesComponent }
  

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
