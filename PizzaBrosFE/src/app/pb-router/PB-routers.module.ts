import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoOrderComponent } from '../modules/do-order/do-order.component';
import { HomeComponent } from '../modules/home/home.component';
import { ActiveOrdersComponent } from '../modules/orders/active-orders/active-orders.component';
import { ListObjectComponent } from '../modules/orders/list-object/list-object.component';
import { OrdersHistoryComponent } from '../modules/orders/orders-history/orders-history.component';
import { OrdersComponent } from '../modules/orders/orders.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      { path: 'orders-history', component: OrdersHistoryComponent },
      { path: 'active-orders', component: ActiveOrdersComponent,
          children:[
            {path: 'list-object',component: ListObjectComponent}

          ]  
      }  
     ]
  },
  {
    path: 'do-order',
    component: DoOrderComponent,
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
