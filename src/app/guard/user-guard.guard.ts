import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const routerUrl: string = state.url;
    var token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      this.userService.loginDecide(token).subscribe(
        (res) => {
          if (res['id'] == '39') {
            this.router.navigate(['/product-page/men']);
            resolve(false);
            resolve(true);
          } else {
            resolve(true);
          }
        },
        (err) => {
          this.router.navigate(['/product-page/men']);
          resolve(false);
        }
      );
    });
  }
}
