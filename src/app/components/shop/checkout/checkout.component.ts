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
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZČĆĐŠŽčćžđš ]+$')],
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZČĆĐŠŽčćžđš ]+$')],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
      address: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZČĆĐŠŽčćžđš0-9 ]+$')],
      ],
      city: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZČĆĐŠŽčćžđš ]+$')],
      ],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      country: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZČĆĐŠŽčćžđš ]+$')],
      ],
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
    if (this.products.length == 0) {
      alert('Korpa je prazna!');
    } else {
      var token = localStorage.getItem('token');
      this.userService.loginDecide(token).subscribe(
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
      (res) => {},
      (err) => {
        console.log('err je ' + err);
      }
    );

    userOrders.forEach((ord) => {
      this.userOrderService.createOrder(ord, token).subscribe(
        (res) => {},
        (err) => {
          console.log('err je ' + err);
        }
      );
    });

    this.succesfullDialog();
    this.cartService.clearCart();
    this.router.navigate(['/product-page/men']);
  }

  navigateToShop() {}

  succesfullDialog() {
    document.getElementById('dialogMessage').style.display = 'block';

    setTimeout(this.hideSucessfullDialog, 3500);
    clearTimeout();
  }

  hideSucessfullDialog() {
    document.getElementById('dialogMessage').style.display = 'none';
  }

  showErrorDialog($event) {
    if (this.addressForm.invalid) {
      var xOffset = $event.pageX + 5;
      var yOffset = $event.pageY - 42;

      document.getElementById('dialogErrorMessage').style.display = 'block';
      document.getElementById('dialogErrorMessage').style.left = xOffset + 'px';
      document.getElementById('dialogErrorMessage').style.top = yOffset + 'px';
    }
  }

  hideErrorDialog() {
    document.getElementById('dialogErrorMessage').style.display = 'none';
  }
}
