import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderItem } from 'src/models/orderItem';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  serverUrl = environment.serverUrl;
  orderItems: OrderItem[] = [];
  cartUpdated = new EventEmitter<OrderItem[]>();

  constructor(private httpClient: HttpClient) {}

  getPizzas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.serverUrl}api/Pizza`);
  }

  getPizzaIngredigents(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.serverUrl}api/Pizza/Ingredients`);
  }
}
