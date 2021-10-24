import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './modules/home/home.component';
import { ActiveOrdersComponent } from './modules/orders/active-orders/active-orders.component';
import { ClientDataComponent } from './modules/orders/client-data/client-data.component';
import { DoOrderComponent } from './modules/do-order/do-order.component';
import { OrdersHistoryComponent } from './modules/orders/orders-history/orders-history.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { PBRoutersModule } from './pb-router/PB-routers.module';
import { ListSubMenuComponent } from './shared-modules/list-sub-menu/list-sub-menu.component';
import { ComSubMenuComponent } from './shared-modules/list-sub-menu/com-sub-menu/com-sub-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    OrdersComponent,
    ActiveOrdersComponent,
    ClientDataComponent,
    DoOrderComponent,
    OrdersHistoryComponent,
    ListSubMenuComponent,
    ComSubMenuComponent,
    


  ],
  imports: [
    BrowserModule,
    PBRoutersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
