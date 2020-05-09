import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ClickOutsideModule } from 'ng-click-outside';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { BodyComponent } from './components/layout/body/body.component';

import { NajcescaPitanjaComponent } from './components/support/najcesca-pitanja/najcesca-pitanja.component';
import { NaciniPlacanjaComponent } from './components/support/nacini-placanja/nacini-placanja.component';
import { ProductComponent } from './components/shop/product/product.component';
import { ProductPageComponent } from './components/shop/product-page/product-page.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    NajcescaPitanjaComponent,
    NaciniPlacanjaComponent,
    ProductComponent,
    ProductPageComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2PageScrollModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
