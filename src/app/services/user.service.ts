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
  users: User[];

  constructor(private http: HttpClient) {}

  store(user: User): Observable<User[]> {
    return this.http.post(`${this.baseUrl}/create`, { data: user }).pipe(
      map((res) => {
        this.users.push(res['data']);
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
