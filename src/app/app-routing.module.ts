import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NajcescaPitanjaComponent } from './components/support/najcesca-pitanja/najcesca-pitanja.component';
import { NaciniPlacanjaComponent } from './components/support/nacini-placanja/nacini-placanja.component';

const routes: Routes = [
  { path: 'najcesca-pitanja', component: NajcescaPitanjaComponent },
  { path: 'nacini-placanja', component: NaciniPlacanjaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
