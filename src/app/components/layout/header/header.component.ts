import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  myForm: FormGroup;
  loginActive: boolean = false;
  registerActive: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  loginShow() {
    this.loginActive = true;
  }

  loginClose() {
    this.loginActive = false;
  }

  registerShow() {
    this.registerActive = true;
  }

  registerClose() {
    this.registerActive = false;
  }
}
