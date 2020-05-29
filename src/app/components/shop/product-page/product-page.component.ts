import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { stringify } from 'querystring';
import { element } from 'protractor';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  category: string;
  genderHandler: string;
  productCategory = 'View All'; // product category handler (defines chosen product category)
  colorCategory = 'None'; // product category handler (defines chosen product category)

  categoryActive: boolean = true;
  colorsActive: boolean = false;
  sizeActive: boolean = false;
  sortActive: boolean = false;

  products: Product[];
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    /* 
      This function changes the value of the category variable (men -> women, and the other way around)
      Products are filtered based on the value of this variable
    */
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');

      if (this.category === 'men') this.genderHandler = 'M';
      else this.genderHandler = 'F';

      this.getProducts();
    });

    this.addClickEventToColorItem();
  }

  scrollToggler(counter) {
    if (counter === 1) this.categoryActive = !this.categoryActive;
    if (counter === 2) this.colorsActive = !this.colorsActive;
    if (counter === 3) this.sizeActive = !this.sizeActive;
    if (counter === 4) this.sortActive = !this.sortActive;
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

  addClickEventToColorItem() {
    let elements = this.elRef.nativeElement.querySelectorAll('.colorItem');

    for (var i = 0; i < elements.length; i++) {
      var color;
      switch (i) {
        case 0:
          color = 'white';
          break;
        case 1:
          color = 'grey';
          break;
        case 2:
          color = 'black';
          break;
        case 3:
          color = 'blue';
          break;
        case 4:
          color = 'green';
          break;
        case 5:
          color = 'red';
          break;
        case 6:
          color = 'brown';
          break;
        case 7:
          color = 'yellow';
          break;
        case 8:
          color = 'orange';
          break;
        case 9:
          color = 'pink';
          break;
        case 10:
          color = 'purple';
          break;
      }
      elements[i].addEventListener(
        'click',
        this.getProductsByColor.bind(this, color)
      );
    }
  }

  filterRemoveHandler(chosenFilter: number) {
    /* 
      If the category is removed and color is still active getProductsByColor should be called but
      category has to be 'View All'
   */
    if (chosenFilter === 0 && this.colorCategory !== 'None') {
      this.productCategory = 'View All';
      this.getProductsByColor(this.colorCategory);
    }

    /* 
      If the category is removed and color is not active getProducts should be called and category
      has to be 'View All'
    */
    if (chosenFilter === 0 && this.colorCategory === 'None') {
      this.productCategory = 'View All';
      this.getProducts();
    }

    /* If the color is removed and category is still active getProductsByCategory should be called 
       and colorCategory should be None
    */
    if (chosenFilter === 1 && this.productCategory !== 'View All') {
      this.colorCategory = 'None';
      this.getProductsByCategory(this.productCategory);
    }

    /* If the color is removed and category is still not active getProducts should be called 
       and colorCategory should be None
    */
    if (chosenFilter === 1 && this.productCategory === 'View All') {
      this.colorCategory = 'None';
      this.getProducts();
    }
  }
  // Gets all products filtered by gender fetched from Product Service
  getProducts(): void {
    this.productService.get(this.genderHandler).subscribe(
      (res: Product[]) => {
        this.products = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  // Gets products filtered by category fetched from Product Service
  getProductsByCategory(category: string): void {
    this.productService.getByCategory(this.genderHandler, category).subscribe(
      (res: Product[]) => {
        this.products = res;
        // Sets chosen product category
        this.productCategory = category;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  // Gets produts filtered by color fetched from Product Service
  public getProductsByColor(color): void {
    this.productService
      .getByColor(this.genderHandler, this.productCategory, color)
      .subscribe(
        (res: Product[]) => {
          this.products = res;
          // Sets chosen color category
          this.colorCategory = color;
        },
        (err) => {
          this.error = err;
        }
      );
  }
}
