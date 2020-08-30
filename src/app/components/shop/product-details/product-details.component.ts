import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChosenProduct } from 'src/app/models/ChosenProduct';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  iconActive: boolean = false;
  selectedSize: string;

  model;
  email;

  availableSizes = [];

  productDetails = new Array();

  myForm = new FormGroup({});

  productType = '';

  constructor(
    private router: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = formBuilder.group({
      quantity: ['1', [Validators.min(1), Validators.max(5)]],
      outletQuantity: ['1', [Validators.min(1), Validators.max(1)]],
    });
  }

  get f() {
    return this.myForm.controls;
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.model = JSON.parse(params.product) as Product;
    });

    this.router.queryParams.subscribe((params) => {
      this.model = JSON.parse(params.product) as ChosenProduct;
    });

    if (this.model.sellerId != undefined) {
      this.productType = 'outlet';
      this.getEmail();
    }

    if (this.productType != 'outlet')
      this.model.productDetailsFolderUrl =
        'http://localhost/ClothesShopApi/product/product-details-images/' +
        this.model.picUrl.substr(47, this.model.picUrl.length);
    else if (this.productType === 'outlet')
      this.model.productDetailsFolderUrl =
        'http://localhost/ClothesShopApi/userProduct/product-details-images/' +
        this.model.picUrl.substr(51, this.model.picUrl.length);

    var pom1 = this.model.productDetailsFolderUrl + '/' + 'productdetails1.jpg';

    var pom2 = this.model.productDetailsFolderUrl + '/' + 'productdetails2.jpg';

    var pom3 = this.model.productDetailsFolderUrl + '/' + 'productdetails3.jpg';

    var pom4 = this.model.productDetailsFolderUrl + '/' + 'productdetails4.jpg';

    this.productDetails.push(pom1);
    this.productDetails.push(pom2);
    this.productDetails.push(pom3);
    this.productDetails.push(pom4);

    this.availableSizes = this.model.size.split(',');
  }

  iconHover() {
    this.iconActive = true;
  }

  addToCart() {
    let ch;

    if (this.productType !== 'outlet') {
      ch = new ChosenProduct(
        this.model,
        this.f.quantity.value,
        this.selectedSize
      );
    } else if (this.productType === 'outlet') {
      ch = new ChosenProduct(
        this.model,
        this.f.quantity.value,
        this.selectedSize,
        this.model.sellerId
      );
    }

    this.cartService.addToCart(ch);
    this.succesfullDialog();
  }

  selectedSizeHandler(size: string) {
    if (this.selectedSize != undefined)
      document.getElementById(this.selectedSize).style.borderColor =
        'rgb(248, 249, 250)';
    document.getElementById(size).style.borderColor = 'black';
    this.selectedSize = size;
  }

  getEmail() {
    if (this.productType === 'outlet') {
      this.userService.getEmail(this.model.sellerId).subscribe(
        (res) => {
          this.email = res['data'];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  chosenColorPrinter() {
    var translatedColors = [
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

    if (this.model.color == 'white') return 'Bela';
    if (this.model.color == 'gray') return 'Siva';
    if (this.model.color == 'black') return 'Crna';
    if (this.model.color == 'blue') return 'Plava';
    if (this.model.color == 'green') return 'Zelena';
    if (this.model.color == 'red') return 'Crvena';
    if (this.model.color == 'brown') return 'Braon';
    if (this.model.color == 'yellow') return 'Žuta';
    if (this.model.color == 'orange') return 'Narandžasta';
    if (this.model.color == 'pink') return 'Pink';
    if (this.model.color == 'purple') return 'Ljubičasta';
  }

  showErrorDialog($event) {
    if (this.f.quantity.errors || this.selectedSize == undefined) {
      console.log('idk');
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

  succesfullDialog() {
    document.getElementById('dialogMessage').style.display = 'block';

    setTimeout(this.hideSucessfullDialog, 3500);
    clearTimeout();
  }

  hideSucessfullDialog() {
    document.getElementById('dialogMessage').style.display = 'none';
  }
}
