import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Order} from "../dto/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly BaseUrl = environment.mainUrl + 'oders';
  constructor(private http:HttpClient) { }

  getOrderID(): Observable<String> {
    return this.http.get<String>(this.BaseUrl);
  }

  SaveOrders(orders:Order) : Observable<null>{
    return this.http.post<null>(this.BaseUrl, orders);
  }

}
