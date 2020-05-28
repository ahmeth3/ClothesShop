import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  category: string;

  categoryActive: boolean = true;
  colorsActive: boolean = false;
  sizeActive: boolean = false;
  sortActive: boolean = false;

  products: Product[];
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.category = params.get('category'))
    );

    this.getProducts();
  }

  scrollToggler(counter) {
    if (counter === 1) this.categoryActive = !this.categoryActive;
    if (counter === 2) this.colorsActive = !this.colorsActive;
    if (counter === 3) this.sizeActive = !this.sizeActive;
    if (counter === 4) this.sortActive = !this.sortActive;

    console.log(this.products[0].picUrl);
  }

  dropdownCloseOnClickOutside() {
    this.sortActive = false;
  }

  openNav() {
    document.getElementById('sideBar').style.display = 'block';
    document.getElementById('sideBar').style.marginLeft = 'auto';
    document.getElementById('sideBar').style.marginRight = 'auto';

    document.getElementById('mainContent').style.width = '0';
    document.getElementById('mainContent').style.height = '0';
  }

  closeNav() {
    document.getElementById('sideBar').style.display = 'none';

    document.getElementById('mainContent').style.width = '100%';
    document.getElementById('mainContent').style.height = '100vh';
  }

  //gets all products fetched from Product Service
  getProducts(): void {
    this.productService.get().subscribe(
      (res: Product[]) => {
        this.products = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
