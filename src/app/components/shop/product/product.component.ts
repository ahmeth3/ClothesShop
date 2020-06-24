import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() model: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.model.productDetailsFolderUrl =
      'http://localhost/ClothesShopApi/product/product-details-images/' +
      this.model.picUrl.substr(47, this.model.picUrl.length);
  }

  
}
