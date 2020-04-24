import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nacini-placanja',
  templateUrl: './nacini-placanja.component.html',
  styleUrls: ['./nacini-placanja.component.css'],
})
export class NaciniPlacanjaComponent implements OnInit {
  scrollActive = 1;

  constructor() {}

  ngOnInit(): void {}

  changeScrollArrow(scroller) {
    if (scroller === this.scrollActive) this.scrollActive = 0;
    else this.scrollActive = scroller;
  }
}
