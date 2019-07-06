import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ManageCustomerComponent} from "../manage-customer/manage-customer.component";
import {ManageItemsComponent} from "../manage-items/manage-items.component";

@Injectable({
  providedIn: 'root'
})
export class CanDeativateGuard implements CanDeactivate<ManageCustomerComponent | ManageItemsComponent> {
  canDeactivate(component: ManageCustomerComponent | ManageItemsComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component instanceof ManageCustomerComponent) {
      if (component.frmCustomer.dirty) {
        if (!confirm('There are some unsaved changes, do you really want to exit?')) {
          return false;
        }
      }
    } else {
      if (component.frmItem.dirty) {
        if (!confirm('There are some unsaved changes, do you really want to exit?')) {
          return false;
        }
      }
    }
    return true;
  }


  
}
