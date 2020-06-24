import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-page-cart',
  templateUrl: './full-page-cart.component.html',
  styleUrls: ['./full-page-cart.component.css'],
})
export class FullPageCartComponent implements OnInit {
  productsShow: boolean = false;
  products = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();

    if (this.products.length === 0) this.productsShowHide();
    else this.productsShowActive();
  }

  loadProductsPage() {
    this.router.navigate(['/product-page', 'men']);
  }

  clearCart() {
    this.products = this.cartService.clearCart();
    this.productsShow = false;
  }

  removeProduct(product) {
    this.cartService.removeFromCart(product);

    if (this.products.length === 0) this.productsShow = false;
  }

  getTotalQuantity() {
    let sum = 0;
    this.products.forEach((element) => {
      sum += parseInt(element.quantity);
    });

    return sum;
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
