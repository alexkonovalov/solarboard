import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './views';
import { PowerboardComponent } from './powerboard';
import { WeatherComponent } from './weather';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'powerboard',
    component: PowerboardComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
