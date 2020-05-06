import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  category: string;

  categoryActive: boolean = true;
  colorsActive: boolean = true;
  sizeActive: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.category = params.get('category'))
    );
  }

  scrollToggler(counter) {
    if (counter === 1) this.categoryActive = !this.categoryActive;
    if (counter === 2) this.colorsActive = !this.colorsActive;
    if (counter === 3) this.sizeActive = !this.sizeActive;
  }
}
