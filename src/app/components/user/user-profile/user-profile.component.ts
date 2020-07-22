import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/models/Address';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { UserProduct } from 'src/app/models/UserProduct';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  activeContent: number = 4;

  addressForm: FormGroup;

  addressObj: Address;

  orders: Order[];

  maleCategoryActive: boolean = true;
  femaleCategoryActive: boolean = true;

  productForm: FormGroup;

  genders: any = ['Muško', 'Žensko'];

  categories: any = [];
  maleCategories: any = ['Košulje', 'Jakne'];
  femaleCategories: any = ['Haljine', 'Košulje'];
  translatedMaleCategories: any = ['Shirts', 'Jackets'];
  translatedFemaleCategories: any = ['Dresses', 'Shirts'];

  colors: any = [
    'bela',
    'siva',
    'crna',
    'plava',
    'zelena',
    'crvena',
    'braon',
    'žuta',
    'narandžasta',
    'pink',
    'ljubičasta',
  ];
  translatedColors: any = [
    'white',
    'gray',
    'black',
    'blue',
    'green',
    'red',
    'brown',
    'yellow',
    'orange',
    'pink',
    'purple',
  ];

  product = new Product('', null, '', '', '', '', '', '');
  maleProducts: Product[];
  femaleProducts: Product[];

  avatar: File;
  avatarName = '';
  productDetailsImages: File[] = [];

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

    this.productForm = this.fb.group({
      nameOfProduct: ['', [Validators.required]],
      price: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      size: ['', [Validators.required]],
      caption: ['', [Validators.required]],
      composition: ['', [Validators.required]],
    });

    this.getAddress();
    this.getOrders();

    this.setActiveContent(this.activeContent);
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

  get nameOfProduct() {
    return this.productForm.get('nameOfProduct');
  }

  get price() {
    return this.productForm.get('price');
  }

  get gender() {
    return this.productForm.get('gender');
  }

  get category() {
    return this.productForm.get('category');
  }

  get color() {
    return this.productForm.get('color');
  }

  get size() {
    return this.productForm.get('size');
  }

  get caption() {
    return this.productForm.get('caption');
  }

  get composition() {
    return this.productForm.get('composition');
  }

  changeGender(e) {
    var selectedValue = e.target.value;
    selectedValue = selectedValue.split(' ')[1];

    this.gender.setValue(selectedValue, { onlySelf: true });

    if (this.gender.value == 'Muško') this.categories = this.maleCategories;
    else if (this.gender.value == 'Žensko')
      this.categories = this.femaleCategories;
  }

  changeCategory(e) {
    var selectedValue = e.target.value;
    selectedValue = selectedValue.split(' ')[1];

    this.category.setValue(selectedValue, { onlySelf: true });
  }

  changeColor(e) {
    var selectedValue = e.target.value;
    selectedValue = selectedValue.split(' ')[1];

    this.color.setValue(selectedValue, { onlySelf: true });
  }

  processFile(imageInput: any) {
    var file = imageInput.files[0];

    var randomString = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;

    for (var i = 0; i < 5; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    var randomNumber = Math.floor(Math.random() * 1000000 + 1);
    var fileName = randomNumber.toString() + randomString + '.jpg';
    var fileForUpload = new File([file], fileName);

    this.avatar = fileForUpload;
    this.avatarName = imageInput.files[0].name;
  }

  processFiles(imageInput: any) {
    if (imageInput.target.files.length != 4) {
      window.alert('Izaberite 4 slike!');
    } else {
      // Deleting the first images user selected in order to place the new ones
      this.productDetailsImages = [];

      for (var i = 0; i < 4; i++) {
        var file = imageInput.target.files[i];
        var fileName = 'productdetails' + (i + 1).toString() + '.jpg';
        var renamedFile = new File([file], fileName);
        this.productDetailsImages.push(renamedFile);
      }
    }
  }

  showErrorDialog($event) {
    if (
      this.productForm.invalid ||
      this.avatar == null ||
      this.productDetailsImages.length != 4
    ) {
      var xOffset = $event.pageX + 2;
      var yOffset = $event.pageY - 42;

      document.getElementById('dialogErrorMessage').style.display = 'block';
      document.getElementById('dialogErrorMessage').style.left = xOffset + 'px';
      document.getElementById('dialogErrorMessage').style.top = yOffset + 'px';
    }
  }

  hideErrorDialog() {
    document.getElementById('dialogErrorMessage').style.display = 'none';
  }

  createProduct() {
    if (
      !this.productForm.invalid &&
      this.avatar != null &&
      this.productDetailsImages.length == 4
    ) {
      this.matchValuesToProduct();

      var token = localStorage.getItem('token');

      this.productService
        .createUserProduct(
          this.product,
          this.avatar,
          this.productDetailsImages,
          token.toString()
        )
        .subscribe((res) => {
          // console.log(res);
        });
    }
  }

  matchValuesToProduct() {
    this.product.name = this.nameOfProduct.value;
    this.product.price = this.price.value;

    var category;
    var index;
    if (this.gender.value == 'Muško') {
      this.product.gender = 'M';

      var index = this.maleCategories.findIndex(
        (cat) => cat == this.category.value
      );
      category = this.translatedMaleCategories[index];
    } else {
      this.product.gender = 'F';

      var index = this.femaleCategories.findIndex(
        (cat) => cat == this.category.value
      );
      category = this.translatedFemaleCategories[index];
    }

    this.product.category = category;

    var index = this.colors.findIndex((color) => color == this.color.value);
    this.product.color = this.translatedColors[index];

    this.product.size = this.size.value;
    this.product.caption = this.caption.value;
    this.product.composition = this.composition.value;
  }

  getProducts() {
    var token = localStorage.getItem('token');

    this.productService.getAllUserProducts(token).subscribe(
      (res: UserProduct[]) => {
        this.products = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setActiveContent(contentType: number) {
    this.activeContent = contentType;

    if (this.activeContent === 4) {
      this.getProducts();
    }
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
