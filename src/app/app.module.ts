import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { WeatherModule } from './weather';
import { PowerboardModule } from './powerboard';
import { AboutComponent } from './views';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    StoreModule.forRoot(
      { initialState: {} }
    ),
    EffectsModule.forRoot([]),

    // core & shared
    SharedModule,

    // features
    PowerboardModule,
    WeatherModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent, AboutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
