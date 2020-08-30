import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-hover',
  templateUrl: './cart-hover.component.html',
  styleUrls: ['./cart-hover.component.css'],
})
export class CartHoverComponent implements OnInit {
  productsShow: boolean = false;

  products = [];
  recentlyAddedProducts = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.recentlyAddedProductsHandler();

    if (this.products.length === 0) this.productsShowHide();
    else this.productsShowActive();
  }

  loadCartPage() {
    this.router.navigate(['/cart']);
  }

  loadCheckoutPage() {
    this.router.navigate(['/checkout']);
  }

  removeProduct(product) {
    this.cartService.removeFromCart(product);
    this.recentlyAddedProductsHandler();

    if (this.products.length === 0) this.productsShow = false;
  }

  getTotalQuantity() {
    let sum = 0;
    this.products.forEach((element) => {
      sum += parseInt(element.quantity);
    });

    return sum;
  }

  recentlyAddedProductsHandler() {
    if (this.products.length === 1) {
      this.recentlyAddedProducts = [];
      this.recentlyAddedProducts.push(this.products[0]);
    } else if (this.products.length > 1) {
      this.recentlyAddedProducts = [];
      this.recentlyAddedProducts.push(this.products[this.products.length - 1]);
      this.recentlyAddedProducts.push(this.products[this.products.length - 2]);
    } else {
      this.recentlyAddedProducts = [];
    }
  }

  getTotalPrice() {
    let sum = 0;
    this.products.forEach((element) => {
      sum += parseInt(element.price) * parseInt(element.quantity);
    });

    return sum;
  }

  productsShowActive() {
    this.productsShow = true;
  }

  productsShowHide() {
    this.productsShow = false;
  }
}
