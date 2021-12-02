import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HacerPedidoComponent } from '../modulos/hacer-pedido/hacer-pedido.component';
import { InicioComponent } from '../modulos/inicio/inicio.component';
import { BienesComponent } from '../modulos/inventario/bienes/bienes.component';
import { IngredientesComponent } from '../modulos/inventario/ingredientes/ingredientes.component';
import { InventarioComponent } from '../modulos/inventario/inventario.component';
import { ProductosComponent } from '../modulos/inventario/productos/productos.component';
import { PedidosActivosComponent } from '../modulos/pedidos/pedidos-activos/pedidos-activos.component';
import { PedidosHistorialComponent } from '../modulos/pedidos/pedidos-historial/pedidos-historial.component';
import { PedidosComponent } from '../modulos/pedidos/pedidos.component';
import { ComprasComponent } from '../modulos/inventario/compras/compras.component';
import { HacerCompraComponent } from '../modulos/hacer-compra/hacer-compra.component';
import { EmpleadosComponent } from '../modulos/empleados/empleados.component';
import { DetallesEmpleadosComponent } from '../modulos/empleados/detalles-empleados/detalles-empleados.component';
import { SueldosEmpleadosComponent } from '../modulos/empleados/sueldos-empleados/sueldos-empleados.component';
import { TurnosEmpleadosComponent } from '../modulos/empleados/turnos-empleados/turnos-empleados.component';
import { CreacionProductosComponent } from '../modulos/inventario/productos/creacion-productos/creacion-productos.component';
import { CreacionCategoriasComponent } from '../modulos/inventario/productos/creacion-categorias/creacion-categorias.component';
import { VerProductosComponent } from '../modulos/inventario/productos/ver-productos/ver-productos.component';
import { CajaComponent } from '../modulos/caja/caja.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'caja',
    component: CajaComponent,
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
      { path: 'productos', component: ProductosComponent ,
      children:[
        {path: 'ver-productos',component: VerProductosComponent},
        { path: 'creacion-productos', component: CreacionProductosComponent },
        { path: 'creacion-categorias', component: CreacionCategoriasComponent}
        
      ]
    
    },
      { path: 'ingredientes', component: IngredientesComponent }
  

     ]
  },
  {
    path: 'hacer-compra',
    component: HacerCompraComponent,
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
    children: [
      { path: 'detalles-empleados', component: DetallesEmpleadosComponent },
      { path: 'sueldos-empleados', component: SueldosEmpleadosComponent},
      { path: 'turnos-empleados', component: TurnosEmpleadosComponent }
    ]
    }

]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class PBRoutersModule { }
