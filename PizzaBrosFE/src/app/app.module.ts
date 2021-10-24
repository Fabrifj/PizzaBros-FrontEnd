import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './modules/home/home.component';
import { ActiveOrdersComponent } from './modules/orders/active-orders/active-orders.component';
import { ClientDataComponent } from './modules/orders/client-data/client-data.component';
import { DoOrderComponent } from './modules/orders/do-order/do-order.component';
import { OrdersHistoryComponent } from './modules/orders/orders-history/orders-history.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { PBRoutersModule } from './pb-router/PB-routers.module';
import { MainButtonsComponent } from './modules/orders/main-buttons/main-buttons.component';

import { ListObjectComponent } from './modules/orders/list-object/list-object.component';
import { ModalModule } from './modules/orders/modal/modal.module';
import { ReusableTableComponent } from './modules/orders/reusable-table/reusable-table.component';
import { HttpClientModule } from '@angular/common/http';



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
    MainButtonsComponent,
    ListObjectComponent,
    ReusableTableComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PBRoutersModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
