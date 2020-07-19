import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  activeContent: number = 3;
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

  orders: Order[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      size: ['', [Validators.required]],
      caption: ['', [Validators.required]],
      composition: ['', [Validators.required]],
    });

    this.setActiveContent(this.activeContent);
  }

  get name() {
    return this.productForm.get('name');
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

  setActiveContent(contentType: number) {
    document.getElementById(
      this.activeContent.toString()
    ).style.backgroundColor = 'rgb(247, 248, 249)';
    document.getElementById(this.activeContent.toString()).style.color =
      'black';

    this.activeContent = contentType;

    document.getElementById(
      this.activeContent.toString()
    ).style.backgroundColor = 'rgb(108, 117, 125)';
    document.getElementById(this.activeContent.toString()).style.color =
      'white';

    if (contentType === 2) {
      this.getAllProducts();
    }

    if (contentType === 3) {
      this.getOrders();
    }
  }

  scrollToggler(counter) {
    if (counter === 1) this.maleCategoryActive = !this.maleCategoryActive;
    if (counter === 2) this.femaleCategoryActive = !this.femaleCategoryActive;
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
      this.matchValuesToObject();
      this.productService
        .createProduct(this.product, this.avatar, this.productDetailsImages)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  matchValuesToObject() {
    this.product.name = this.name.value;
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

  getAllProducts() {
    this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.maleProducts = res.filter((prod) => prod.gender === 'M');
        this.femaleProducts = res.filter((prod) => prod.gender === 'F');
      },
      (err) => {}
    );
  }

  getOrders(): void {
    var token = localStorage.getItem('token');

    this.orderService.getAllOrders(token).subscribe(
      (res: Order[]) => {
        this.orders = res;
        this.orders = this.orders.sort((a, b) => b.id - a.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showMessageDialog($event, messageType: number) {
    var xOffset = $event.pageX + 2;
    var yOffset = $event.pageY - 42;

    document.getElementById('dialogMessage').style.display = 'block';
    document.getElementById('dialogMessage').style.left = xOffset + 'px';
    document.getElementById('dialogMessage').style.top = yOffset + 'px';

    if (messageType === 1) {
      document.getElementById('dialogMessage').innerHTML =
        "Promenite stanje u <b><em>'Izvršeno'</em></b>";
      document.getElementById('dialogMessage').style.width = '230px';
    }

    if (messageType === 2) {
      document.getElementById('dialogMessage').innerHTML =
        "Promenite stanje u <b><em>'Isporučeno'</em></b>";
      document.getElementById('dialogMessage').style.width = '250px';
    }
  }

  hideMessageDialog() {
    document.getElementById('dialogMessage').style.display = 'none';
  }

  updateStatus(id: string, status: string) {
    var token = localStorage.getItem('token');

    this.orderService.updateStatus(token, id, status).subscribe(
      (res) => {
        this.setActiveContent(3);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
