import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  myForm: FormGroup;
  loginActive: boolean = false;
  registerActive: boolean = false;
  cartActive: boolean = false;
  cartHover: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  loginShow() {
    // Automatic login
    var token = localStorage.getItem('token');
    this.userService.autoLogin(token).subscribe(
      (res) => {
        this.router.navigate(['/user-profile']);
      },
      (err) => {
        this.loginActive = true;
      }
    );
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

  cartHoverShow() {
    this.cartActive = true;
  }

  cartHoverHide() {
    this.cartActive = false;
  }

  cartHoverActive() {
    this.cartHover = true;
  }

  cartHoverInactive() {
    this.cartHover = false;
  }
}
