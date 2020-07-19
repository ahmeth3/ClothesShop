import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/models/Address';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  activeContent: number = 2;

  addressForm: FormGroup;

  addressObj: Address;

  orders: Order[];
  products = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    this.getAddress();
    this.getOrders();
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

  setActiveContent(contentType: number) {
    this.activeContent = contentType;
  }

  updateAddress() {
    this.matchValuesToObject();
    var token = localStorage.getItem('token');

    this.userService.updateAddress(this.addressObj, token).subscribe(
      () => {
        // console.log(res);
      },
      () => {
        // console.log('err je ' + err);
      }
    );
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

  getOrders(): void {
    var token = localStorage.getItem('token');

    this.orderService.getUsersOrders(token).subscribe(
      (res: Order[]) => {
        this.orders = res;
        this.orders = this.orders.sort((a, b) => b.id - a.id);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
}
