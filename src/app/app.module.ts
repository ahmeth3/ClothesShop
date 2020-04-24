import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NajcescaPitanjaComponent } from './components/support/najcesca-pitanja/najcesca-pitanja.component';
import { NaciniPlacanjaComponent } from './components/support/nacini-placanja/nacini-placanja.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NajcescaPitanjaComponent, NaciniPlacanjaComponent],
  imports: [BrowserModule, AppRoutingModule, Ng2PageScrollModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
