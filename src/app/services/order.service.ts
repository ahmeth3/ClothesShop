import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost/ClothesShopApi/order';

  orders: Order[];

  constructor(private http: HttpClient) {}

  createOrder(order: Order, token: string) {
    return this.http
      .post(`${this.baseUrl}/create`, {
        data: order,
        token: token,
      })
      .pipe((res) => {
        return res;
      });
  }

  getUsersOrders(token: string): Observable<Order[]> {
    return this.http
      .post(`${this.baseUrl}/list`, {
        token: token,
      })
      .pipe(
        map((res) => {
          this.orders = res['data'];
          return this.orders;
        }),
        catchError(this.handleError)
      );
  }

  getAllOrders(token: string) {
    return this.http
      .post(`${this.baseUrl}/listAll`, {
        token: token,
      })
      .pipe(
        map((res) => {
          this.orders = res['data'];
          return this.orders;
        }),
        catchError(this.handleError)
      );
  }

  updateStatus(token: string, id: string, status: string) {
    return this.http
      .post(`${this.baseUrl}/updateStatus`, {
        token: token,
        data: { id: id, status: status },
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
