import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  hoverActive: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  hoverImage(): void {
    this.hoverActive = true;
  }

  unhoverImage(): void {
    this.hoverActive = false;
  }
}
