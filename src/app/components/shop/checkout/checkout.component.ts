import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../models/Address';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { UserOrder } from 'src/app/models/UserOrder';
import { UserOrderService } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  logged: boolean = false;
  proceed: boolean = false;

  addressForm: FormGroup;

  addressObj: Address;

  products = [];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private userOrderService: UserOrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();

    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  get name() {
    return this.addressForm.get('name');
  }

  get surname() {
    return this.addressForm.get('surname');
  }

  get phone() {
    return this.addressForm.get('phone');
  }

  get address() {
    return this.addressForm.get('address');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get zipCode() {
    return this.addressForm.get('zipCode');
  }

  get country() {
    return this.addressForm.get('country');
  }

  proceedToAddressForm() {
    var token = localStorage.getItem('token');
    this.userService.autoLogin(token).subscribe(
      (res) => {
        this.logged = true;
        this.getAddress();
      },
      (err) => {
        this.logged = false;
      }
    );
    this.proceed = true;
  }

  getAddress() {
    var token = localStorage.getItem('token');

    this.userService.getAddress(token).subscribe(
      (res: Address) => {
        this.addressObj = res;
        this.fillForm();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fillForm() {
    if (
      this.addressObj.name != '' &&
      this.addressObj.surname != '' &&
      this.addressObj.phone != '' &&
      this.addressObj.address != '' &&
      this.addressObj.city != '' &&
      this.addressObj.zipCode != '' &&
      this.addressObj.country != ''
    ) {
      this.name.setValue(this.addressObj.name);
      this.surname.setValue(this.addressObj.surname);
      this.phone.setValue(this.addressObj.phone);
      this.address.setValue(this.addressObj.address);
      this.city.setValue(this.addressObj.city);
      this.zipCode.setValue(this.addressObj.zipCode);
      this.country.setValue(this.addressObj.country);
    }
  }

  matchValuesToObject() {
    this.addressObj = new Address(
      this.name.value,
      this.surname.value,
      this.phone.value,
      this.address.value,
      this.city.value,
      this.zipCode.value,
      this.country.value
    );
  }

  getTotalPrice() {
    let sum = 0;
    this.products.forEach((element) => {
      sum += parseInt(element.price) * parseInt(element.quantity);
    });

    return sum;
  }

  getUserProductsPrice(userProds) {
    let sum = 0;
    userProds.forEach((element) => {
      sum += parseInt(element.price) * parseInt(element.quantity);
    });

    return sum;
  }

  createOrder() {
    this.matchValuesToObject();

    let userOrders = [];
    let userProducts = [];

    userProducts = this.products.filter((prod) => prod.sellerId !== undefined);
    this.products = this.products.filter((prod) => prod.sellerId == undefined);

    userProducts.forEach((prod) => {
      if (!userOrders.find((ord) => ord.sellerId == prod.sellerId)) {
        let sameSellersProds = userProducts.filter(
          (p) => p.sellerId == prod.sellerId
        );

        var orderedProducts = '';
        sameSellersProds.forEach((pr) => {
          orderedProducts += pr.id + ',';
        });

        var price = this.getUserProductsPrice(sameSellersProds);

        var newOrder = new UserOrder(
          this.addressObj,
          'Isporučeno',
          price.toString(),
          new Date(),
          orderedProducts,
          prod.sellerId
        );

        userOrders.push(newOrder);
      }
    });

    var price = this.getTotalPrice();

    var orderedProducts = '';
    
    this.products.forEach((prod) => {
      orderedProducts +=
        prod.quantity + ',' + prod.chosenSize + ',' + prod.id + ';';
    });

    var order = new Order(
      this.addressObj,
      'Isporučeno',
      price.toString(),
      new Date(),
      orderedProducts
    );

    var token = localStorage.getItem('token');

    if (!this.logged) {
      token = 'none';
    }

    this.orderService.createOrder(order, token).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log('err je ' + err);
      }
    );

    userOrders.forEach((ord) => {
      this.userOrderService.createOrder(ord, token).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('err je ' + err);
        }
      );
    });
  }
}
