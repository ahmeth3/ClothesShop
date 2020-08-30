import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NajcescaPitanjaComponent } from './components/support/najcesca-pitanja/najcesca-pitanja.component';
import { NaciniPlacanjaComponent } from './components/support/nacini-placanja/nacini-placanja.component';
import { ProductComponent } from './components/shop/product/product.component';
import { ProductPageComponent } from './components/shop/product-page/product-page.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';
import { FullPageCartComponent } from './components/shop/cart/full-page-cart/full-page-cart.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { UserGuardGuard } from './guard/user-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'product-page/men', pathMatch: 'full' },
  { path: 'najcesca-pitanja', component: NajcescaPitanjaComponent },
  { path: 'nacini-placanja', component: NaciniPlacanjaComponent },
  { path: 'product-page/:category', component: ProductPageComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'cart', component: FullPageCartComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [UserGuardGuard],
  },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
