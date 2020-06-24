import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost/ClothesShopApi/user';
  user = new User('', '');
  users: User[];

  constructor(private http: HttpClient) {}

  login(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.get(`${this.baseUrl}/login`, { params: params }).pipe(
      map((res) => {
        this.user = res['data'];
        return this.user;
      })
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

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
