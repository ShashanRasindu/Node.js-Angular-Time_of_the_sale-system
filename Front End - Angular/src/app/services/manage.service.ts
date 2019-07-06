import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customers} from '../dto/customers';
import {CustomerPage} from "../dto/customer-page";

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  readonly BaseUrl = environment.mainUrl + 'customers';

  constructor(private http: HttpClient) {
  }

  getAllCustomer(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.BaseUrl);
  }

  deleteCustomer(CusID: string): Observable<null> {
    return this.http.delete<null>(this.BaseUrl + `/${CusID}`);
  }

  saveCustomer(customer: Customers): Observable<null> {
    return this.http.post<null>(this.BaseUrl, customer);
  }

  updateCustomer(customer: Customers): Observable<null> {
    return this.http.put<null>(this.BaseUrl + `/${customer.id}`, customer);
  }

  getCustomersPage(page: number, size: number): Observable<CustomerPage> {
    return this.http.get<CustomerPage>(this.BaseUrl, {
      params: new HttpParams().set('page', page + '').set('size', size + '')
    });
  }
}
