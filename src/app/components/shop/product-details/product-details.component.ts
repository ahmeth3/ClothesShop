import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  iconActive: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  iconHover() {
    this.iconActive = true;
  }
}
