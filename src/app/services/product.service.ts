import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/Product';
import { UserProduct } from '../models/UserProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost/ClothesShopApi/product';
  product = new Product('', null, '', '', '', '', '', '');
  products: Product[];

  userProductUrl = 'http://localhost/ClothesShopApi/userProduct';
  userProduct = new UserProduct('', null, '', '', '', '', '', '');
  userProducts: UserProduct[];

  constructor(private http: HttpClient) {}

  createProduct(
    product: Product,
    avatar: File,
    images: File[]
  ): Observable<Product> {
    const formData = new FormData();
    formData.append('avatar', avatar);
    for (let i = 0; i < images.length; i++) {
      formData.append('image[]', images[i]);
    }
    formData.append('data', JSON.stringify(product));
    return this.http.post(`${this.baseUrl}/create`, formData).pipe(
      map((res) => {
        this.product = res['data'];
        return this.product;
      }),
      catchError(this.handleError)
    );
  }

  // Gets all products from API
  getAll(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.products = res['data'];
        return this.products;
      }),
      catchError(this.handleError)
    );
  }

  // Gets all products from API based on filters
  getByFilters(
    gender: string,
    category: string,
    color: string,
    size: string
  ): Observable<Product[]> {
    return this.http
      .post(`${this.baseUrl}/listByFilters`, {
        data: { gender: gender, category: category, color: color, size: size },
      })
      .pipe(
        map((res) => {
          this.products = res['data'];
          return this.products;
        }),
        catchError(this.handleError)
      );
  }

  // Deletes product with given ID
  deleteProduct(id: number) {
    return this.http
      .get(`${this.baseUrl}/delete`, { params: { id: id.toString() } })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  // Create a product sold by customers
  createUserProduct(
    product: Product,
    avatar: File,
    images: File[],
    token: string
  ): Observable<UserProduct> {
    const formData = new FormData();

    formData.append('avatar', avatar);

    for (let i = 0; i < images.length; i++) {
      formData.append('image[]', images[i]);
    }

    formData.append('data', JSON.stringify(product));

    formData.append('token', token);

    return this.http.post(`${this.userProductUrl}/create`, formData).pipe(
      map((res) => {
        this.userProduct = res['data'];
        return this.userProduct;
      })
    );
  }

  // Gets all user products from API
  getAllUserProducts(token: string): Observable<UserProduct[]> {
    return this.http
      .get(`${this.userProductUrl}/listUsersProducts`, {
        params: { token: token },
      })
      .pipe(
        map((res) => {
          this.userProducts = res['data'];
          return this.userProducts;
        }),
        catchError(this.handleError)
      );
  }

  // Gets all products from API based on filters
  getUserProductsByFilters(
    gender: string,
    category: string,
    color: string,
    size: string
  ): Observable<UserProduct[]> {
    return this.http
      .post(`${this.userProductUrl}/listByFilters`, {
        data: { gender: gender, category: category, color: color, size: size },
      })
      .pipe(
        map((res) => {
          this.userProducts = res['data'];
          return this.userProducts;
        }),
        catchError(this.handleError)
      );
  }

  // Deletes product with given ID
  deleteUserProduct(id: number, token: string) {
    return this.http
      .get(`${this.userProductUrl}/delete`, {
        params: { id: id.toString(), token: token },
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
