import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products = [];

  constructor() {}

  addToCart(product) {
    this.products.push(product);
  }

  removeFromCart(product) {
    var index = this.products.indexOf(product);
    this.products.splice(index, 1 );
  }

  getProducts() {
    return this.products;
  }

  clearCart() {
    this.products = [];

    return this.products;
  }
}
