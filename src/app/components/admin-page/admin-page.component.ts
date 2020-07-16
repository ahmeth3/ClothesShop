import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  activeContent: number = 1;

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

  avatar: File;
  avatarCount = 0;
  productDetailsImages: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
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

  setActiveContent(contentType: number) {
    this.activeContent = contentType;
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
    this.avatarCount = 1;
  }

  processFiles(imageInput: any) {
    // var file = imageInput.target.files[0];
    // var pom = new File([file], 'productdetails1.jpg');

    // this.idk.push(pom);

    // file = imageInput.target.files[1];
    // pom = new File([file], 'productdetails2.jpg');

    // this.idk.push(pom);

    // file = imageInput.target.files[2];
    // pom = new File([file], 'productdetails3.jpg');

    // this.idk.push(pom);

    // file = imageInput.target.files[3];
    // pom = new File([file], 'productdetails4.jpg');

    // this.idk.push(pom);

    // console.log(this.idk);

    for (var i = 0; i < 4; i++) {
      var file = imageInput.target.files[i];

      var fileName = 'productdetails' + (i + 1).toString() + '.jpg';
      var renamedFile = new File([file], fileName);

      this.productDetailsImages.push(renamedFile);
    }
  }

  createProduct() {
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
}
