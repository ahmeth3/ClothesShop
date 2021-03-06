import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { UserProduct } from 'src/app/models/UserProduct';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  category: string;
  genderHandler: string = 'None';
  productCategory = 'View All'; // product category handler (defines chosen product category)
  colorCategory = 'None'; // product color handler (defines chosen product color)
  sizeCategory = 'None'; // product size handler (defines chosen product size)

  categoryActive: boolean = true;
  colorsActive: boolean = true;
  sizeActive: boolean = true;
  sortActive: boolean = false;
  maleOutletActive: boolean = true;
  femaleOutletActive: boolean = true;

  products: Product[];
  error = '';
  success = '';

  userProducts: UserProduct[];

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

      if (this.category === 'outlet') {
        this.genderHandler = 'None';
        this.getUserProductsByFilters();
      } else this.getProductsByFilters();
    });

    this.addClickEventToColorItem();
    this.addClickEventToSizeItem();
  }

  scrollToggler(counter) {
    if (counter === 1) this.categoryActive = !this.categoryActive;
    if (counter === 2) this.colorsActive = !this.colorsActive;
    if (counter === 3) this.sizeActive = !this.sizeActive;
    if (counter === 4) this.sortActive = !this.sortActive;
    if (counter === 5) this.maleOutletActive = !this.maleOutletActive;
    if (counter === 6) this.femaleOutletActive = !this.femaleOutletActive;
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
          color = 'gray';
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
        this.chosenFilterHandler.bind(this, 1, color)
      );
    }
  }

  addClickEventToSizeItem() {
    let elements = this.elRef.nativeElement.querySelectorAll('.sizeItem');

    for (var i = 0; i < elements.length; i++) {
      var size;
      switch (i) {
        case 0:
          size = '2XS';
          break;
        case 1:
          size = 'XS';
          break;
        case 2:
          size = 'S';
          break;
        case 3:
          size = 'M';
          break;
        case 4:
          size = 'L';
          break;
        case 5:
          size = 'XL';
          break;
        case 6:
          size = '2XL';
          break;
        case 7:
          size = '3XL';
          break;
      }
      elements[i].addEventListener(
        'click',
        this.chosenFilterHandler.bind(this, 2, size)
      );
    }
  }

  /* 
    This function is called on any filter mouse click event.
    Type of filter that is active is set through this function
  */
  chosenFilterHandler(chosenFilter: number, filter: string) {
    switch (chosenFilter) {
      case 0:
        this.productCategory = filter;
        break;
      case 1:
        this.colorCategory = filter;
        break;
      case 2:
        this.sizeCategory = filter;
        break;
      case 4:
        this.genderHandler = 'M';
        this.productCategory = filter;
        break;
      case 5:
        this.genderHandler = 'F';
        this.productCategory = filter;
        break;
      default:
        break;
    }

    if (this.category !== 'outlet') this.getProductsByFilters();
    else this.getUserProductsByFilters();
  }

  /* 
    This function is called when chosen filter is removed.
    It resets the value of active filter variable.
  */
  filterRemoveHandler(chosenFilter: number) {
    switch (chosenFilter) {
      case 0:
        this.productCategory = 'View All';
        break;
      case 1:
        this.colorCategory = 'None';
        break;
      case 2:
        this.sizeCategory = 'None';
        break;
      case 3:
        this.genderHandler = 'None';
        this.productCategory = 'View All';
        this.colorCategory = 'None';
        this.sizeCategory = 'None';
        break;
      default:
        break;
    }

    if (this.category !== 'outlet') this.getProductsByFilters();
    else {
      this.getUserProductsByFilters();
    }
  }

  // Gets produts based on search criteria fetched from Product Service
  getProductsByFilters(): void {
    this.productService
      .getByFilters(
        this.genderHandler,
        this.productCategory,
        this.colorCategory,
        this.sizeCategory
      )
      .subscribe(
        (res: Product[]) => {
          this.products = res;
        },
        (err) => {
          this.error = err;
        }
      );
  }

  // Gets user produts based on search criteria fetched from Product Service
  getUserProductsByFilters(): void {
    this.productService
      .getUserProductsByFilters(
        this.genderHandler,
        this.productCategory,
        this.colorCategory,
        this.sizeCategory
      )
      .subscribe(
        (res: UserProduct[]) => {
          this.userProducts = res;
        },
        (err) => {
          this.error = err;
        }
      );
  }

  chosenProductCategoryPrinter() {
    var reformattedText = '';

    if (this.productCategory == 'Shirts') return 'košulje';
    if (this.productCategory == 'Jackets') return 'jakne';
    if (this.productCategory == 'Dresses') return 'haljine';
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

    if (this.colorCategory == 'white') return 'bela';
    if (this.colorCategory == 'gray') return 'siva';
    if (this.colorCategory == 'black') return 'crna';
    if (this.colorCategory == 'blue') return 'plava';
    if (this.colorCategory == 'green') return 'zelena';
    if (this.colorCategory == 'red') return 'crvena';
    if (this.colorCategory == 'brown') return 'braon';
    if (this.colorCategory == 'yellow') return 'žuta';
    if (this.colorCategory == 'orange') return 'narandžasta';
    if (this.colorCategory == 'pink') return 'pink';
    if (this.colorCategory == 'purple') return 'ljubičasta';
  }

  resetFilters() {
    this.productCategory = 'View All';
    this.colorCategory = 'None';
    this.sizeCategory = 'None';
  }
}
