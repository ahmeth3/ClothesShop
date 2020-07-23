import { Injectable } from '@angular/core';
import { UserOrder } from '../models/UserOrder';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  baseUrl = 'http://localhost/ClothesShopApi/userOrder';

  orders: UserOrder[];

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

  getUsersOrders(token: string): Observable<UserOrder[]> {
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

  getOrdersOfMyProducts(token: string): Observable<UserOrder[]> {
    return this.http
      .post(`${this.baseUrl}/listOrdersOfMyProducts`, {
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
