import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NajcescaPitanjaComponent } from './components/support/najcesca-pitanja/najcesca-pitanja.component';
import { NaciniPlacanjaComponent } from './components/support/nacini-placanja/nacini-placanja.component';
import { ProductComponent } from './components/shop/product/product.component';
import { ProductPageComponent } from './components/shop/product-page/product-page.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';

const routes: Routes = [
  { path: 'najcesca-pitanja', component: NajcescaPitanjaComponent },
  { path: 'nacini-placanja', component: NaciniPlacanjaComponent },
  { path: 'product-page/:category', component: ProductPageComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-details', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
