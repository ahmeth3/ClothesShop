import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() model;
  @Input() typeOfProduct: number;
  @Input() adminView: boolean;

  @Output() productDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    if (this.typeOfProduct != 1)
      this.model.productDetailsFolderUrl =
        'http://localhost/ClothesShopApi/product/product-details-images/' +
        this.model.picUrl.substr(47, this.model.picUrl.length);
    else if (this.typeOfProduct === 1)
      this.model.productDetailsFolderUrl =
        'http://localhost/ClothesShopApi/userProduct/product-details-images/' +
        this.model.picUrl.substr(52, this.model.picUrl.length);
  }

  deleteProduct() {
    if (this.adminView) {
      if (this.typeOfProduct != 1) {
        this.productService.deleteProduct(this.model.id).subscribe(
          (res) => {
            console.log(res);
            this.productDeleted.emit();
          },
          (err) => {
            console.log(err);
          }
        );
      } else if (this.typeOfProduct === 1) {
        var token = localStorage.getItem('token');

        this.productService.deleteUserProduct(this.model.id, token).subscribe(
          (res) => {
            console.log(res);
            this.productDeleted.emit();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  redirectToDetails() {
    if (!this.adminView) {
      let navigationParams: NavigationExtras = {
        queryParams: { product: JSON.stringify(this.model) },
        queryParamsHandling: 'merge',
      };

      this.router.navigate(['/product-details'], navigationParams);
    }
  }
}
