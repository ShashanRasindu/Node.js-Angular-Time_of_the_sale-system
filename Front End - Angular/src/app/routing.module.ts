import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";

import {ManageItemsComponent} from "./manage-items/manage-items.component";
import {ManageCustomerComponent} from "./manage-customer/manage-customer.component";
import {ManageOrdersComponent} from "./manage-orders/manage-orders.component";

const routes: Routes = [
  {
    component:  DashboardComponent,
    path: 'dashboard'
  },
  {
    component:  ManageCustomerComponent,
    path: 'customer'
  },
  {
    component:  ManageItemsComponent,
    path: 'items'
  },
  {
    component:  ManageOrdersComponent,
    path: 'orders'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
