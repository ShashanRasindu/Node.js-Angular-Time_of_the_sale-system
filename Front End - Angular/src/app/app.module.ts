import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./routing.module";

import {ManageCustomerComponent} from "./manage-customer/manage-customer.component";
import {ManageItemsComponent} from "./manage-items/manage-items.component";
import {ManageOrdersComponent} from "./manage-orders/manage-orders.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageCustomerComponent,
    ManageItemsComponent,
    ManageOrdersComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
