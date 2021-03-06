import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { STORE_SUBSET_KEY } from './powerboard.model';
import { powerboardReducer } from './powerboard.reducer';
import { PowerboardEffects } from './powerboard.effects';
import { PowerboardComponent } from './view/powerboard.component';
import { PowerboardService } from './powerboard.service';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(STORE_SUBSET_KEY, powerboardReducer),
    EffectsModule.forFeature([PowerboardEffects])
  ],
  declarations: [PowerboardComponent],
  providers: [ PowerboardService ]
})
export class PowerboardModule {}
