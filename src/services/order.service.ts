import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  serverUrl = environment.serverUrl;
  uniqueItemId = 0;

  constructor(private httpClient: HttpClient) {}

  placeOrder(order: Order): Observable<any> {
    return this.httpClient.post<any>(`${this.serverUrl}api/Orders`, order);
  }
}
