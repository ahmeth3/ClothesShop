import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost/ClothesShopApi/product';
  product = new Product('', null, '', '', '', '');
  products: Product[];

  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.products = res['data'];
        return this.products;
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
