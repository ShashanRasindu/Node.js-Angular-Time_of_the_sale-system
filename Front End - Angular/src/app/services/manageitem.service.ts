import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Items} from '../dto/items';
import {Customers} from "../dto/customers";
import {CustomerPage} from "../dto/customer-page";
import {ItemPage} from "../dto/item-page";

@Injectable({
  providedIn: 'root'
})
export class ManageitemService {
  readonly BaseUrl = environment.mainUrl + 'items';

  constructor(private http: HttpClient) {
  }

  getAllItem(): Observable<Items[]> {
    return this.http.get<Items[]>(this.BaseUrl);
  }
  deleteItem(Icode: string): Observable<null> {
    return this.http.delete<null>(this.BaseUrl + `/${Icode}`);
  }
  saveItem(item: Items): Observable<null> {
    return this.http.post<null>(this.BaseUrl, item);
  }
  updateCustomer(item: Items): Observable<null> {
    return this.http.put<null>(this.BaseUrl + `/${item.code}`, item);
  }

  getItemPage(page: number, size: number) : Observable<ItemPage>{
    return this.http.get<ItemPage>(this.BaseUrl, {
      params: new HttpParams().set('page', page + '').set('size', size + '')
    });
  }
}
