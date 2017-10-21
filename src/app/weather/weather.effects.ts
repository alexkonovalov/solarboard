import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Action } from '@app/core';

import {
  actionRetrieveWeatherSuccess,
  RetrieveFluxActionSuccess,
  RetrieveCloudnessActionSuccess,
  RetrieveWeatherActionFail,
  actionWeatherFail,
  ACTION_KEYS,
  actionWeatherSuccess2,
  actionCloudnessSuccess
} from './weather.reducer';
import {
  WeatherAxis
} from './weather.model';

import { WeatherService } from './weather.service';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions<Action>,
    private weatherService: WeatherService
  ) {}

  @Effect(/* {dispatch: false} */)
  retrieveClowds(): Observable<RetrieveCloudnessActionSuccess|RetrieveWeatherActionFail> {
    return this.actions$
      .ofType(ACTION_KEYS.WEATHER_RETRIEVE)
      .do(action => {
        console.log('WEATHER_RETRIEVE, ACTION_KEYS.LAUNCH_REQUESTS', action);
      })
      .switchMap(action => {
        return this.weatherService
          .retrieveWeatherMock(WeatherAxis.Clowdness)
          .do(weather => console.log('***ABOUT TO CALL CLOUDNESS SUCCESS', weather))
          .map(weather => actionCloudnessSuccess(weather))
          .catch(err =>
            Observable.of(actionWeatherFail('err'))
          );
      });
  }

  @Effect(/* {dispatch: false} */)
  retrieveWeather(): Observable<RetrieveFluxActionSuccess|RetrieveWeatherActionFail> {
    return this.actions$
      .ofType(ACTION_KEYS.WEATHER_RETRIEVE)
      .do(action => {
        console.log('WEATHER_RETRIEVE, ACTION_KEYS.LAUNCH_REQUESTS', action);
      })
      .switchMap(action => {
        return this.weatherService
          .retrieveWeatherMock(WeatherAxis.SolarFlux)
          .do(weather => console.log('***ABOUT TO CALL FLUX SUCCESS', weather))
          .map(weather => actionWeatherSuccess2(weather))
          .catch(err =>
            Observable.of(actionWeatherFail('err'))
          );
      });
  }
}
