import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/User';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost/ClothesShopApi/user';
  user = new User('', '');
  users: User[];
  address = new Address('', '', '', '', '', '', '');

  constructor(private http: HttpClient) {}

  updateAddress(address: Address, token: string) {
    return this.http
      .post(`${this.baseUrl}/address/create`, {
        data: address,
        token: token,
      })
      .pipe((res) => {
        return res;
      });
  }

  getAddress(token: string) {
    return this.http
      .get(`${this.baseUrl}/address/list`, {
        params: { token: token },
      })
      .pipe(
        map((res) => {
          this.address = res['data'];
          return this.address;
        })
      );
  }

  login(user: User) {
    return this.http.post(`${this.baseUrl}/login`, { data: user }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // auto login (if token is valid)
  autoLogin(token: string) {
    return this.http
      .get(`${this.baseUrl}/automaticLogin`, { params: { token: token } })
      .pipe(
        map((res) => {
          return res;
        })
        // catchError(this.handleError)
      );
  }

  // register method
  store(user: User): Observable<User[]> {
    return this.http.post(`${this.baseUrl}/create`, { data: user }).pipe(
      map(() => {
        return this.users;
      }),
      catchError(this.handleError)
    );
  }

  // get email of the user
  getEmail(id) {
    return this.http
      .get(`${this.baseUrl}/getEmail`, { params: { id: id } })
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
