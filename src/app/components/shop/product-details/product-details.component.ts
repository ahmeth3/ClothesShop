import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChosenProduct } from 'src/app/models/ChosenProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  iconActive: boolean = false;
  selectedSize: string;

  model: Product;

  availableSizes = [];

  productDetails = new Array();

  myForm = new FormGroup({});

  constructor(
    private router: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = formBuilder.group({
      quantity: ['1', [Validators.min(1), Validators.max(5)]],
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

    this.model.productDetailsFolderUrl =
      'http://localhost/ClothesShopApi/product/product-details-images/' +
      this.model.picUrl.substr(47, this.model.picUrl.length);

    var pom1 = this.model.productDetailsFolderUrl + '/' + 'productdetails1.jpg';

    var pom2 = this.model.productDetailsFolderUrl + '/' + 'productdetails2.jpg';

    var pom3 = this.model.productDetailsFolderUrl + '/' + 'productdetails3.jpg';

    var pom4 = this.model.productDetailsFolderUrl + '/' + 'productdetails4.jpg';

    this.productDetails.push(pom1);
    this.productDetails.push(pom2);
    this.productDetails.push(pom3);
    this.productDetails.push(pom4);

    this.availableSizes = this.model.size.split(',');
    // if (this.availableSizes.includes('S')) console.log('da');
    // else console.log('ne');
  }

  iconHover() {
    this.iconActive = true;
  }

  addToCart() {
    let ch = new ChosenProduct(
      this.model,
      this.f.quantity.value,
      this.selectedSize
    );

    this.cartService.addToCart(ch);
  }

  selectedSizeHandler(size: string) {
    if (this.selectedSize != undefined)
      document.getElementById(this.selectedSize).style.borderColor =
        'rgb(248, 249, 250)';
    document.getElementById(size).style.borderColor = 'black';
    this.selectedSize = size;
  }
}
