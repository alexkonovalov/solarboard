import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { STORE_SUBSET_KEY } from './weather.model';
import { WeatherComponent } from './view/weather.component';
import { weatherReducer } from './weather.reducer';
import { WeatherEffects } from './weather.effects';
import { WeatherService } from './weather.service';


@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(STORE_SUBSET_KEY, weatherReducer),
    EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [WeatherComponent ],
  providers: [ WeatherService ]
})
export class WeatherModule {
}
