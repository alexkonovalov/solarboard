import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import {
  ACTION_KEYS,
  RetrieveFluxActionSuccess,
  RetrieveFluxActionFail,
  RetrieveWeatherAction,
  PollWeatherAction,
  RetrieveCloudnessActionSuccess,
  RetrieveCloudnessActionFail,
  actionRetrieveCloudnessFail,
  actionRetrieveFluxFail,
  actionRetrieveFluxSuccess,
  actionRetrieveCloudnessSuccess,
  actionRetrieveWeather,
  actionPollWeather,
  WeatherActionTypes
} from './weather.actions';
import {
  WeatherAxis
} from './weather.model';

import { WeatherService } from './weather.service';

const WEATHER_POLL_DELAY = 2000;

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions<WeatherActionTypes>,
    private weatherService: WeatherService
  ) {}

  @Effect()
  pollWeatherDelayAndStop(): Observable<RetrieveWeatherAction> {
    const pollWeatherStops = this.actions$
      .ofType(ACTION_KEYS.POLL_WEATHER_STOP);

    const pollingStream = Observable
      .timer(0, WEATHER_POLL_DELAY)
      .takeUntil(pollWeatherStops);

    return this.actions$
      .ofType(ACTION_KEYS.POLL_WEATHER)
      .switchMap(() => pollingStream)
      .map(actionRetrieveWeather);
  }

  @Effect()
  retrieveClowds(): Observable<RetrieveCloudnessActionSuccess|RetrieveCloudnessActionFail> {
    return this.actions$
      .ofType(ACTION_KEYS.WEATHER_RETRIEVE)
      .switchMap(action => {
        return this.weatherService
          .retrieveWeather(WeatherAxis.Clowdness)
          .map(weather => actionRetrieveCloudnessSuccess(weather))
          .catch(err => {
            alert(err.message);
            return Observable.of(actionRetrieveCloudnessFail('err'));
          });
      });
  }

  @Effect()
  retrieveWeather(): Observable<RetrieveFluxActionSuccess|RetrieveFluxActionFail> {
    return this.actions$
      .ofType(ACTION_KEYS.WEATHER_RETRIEVE)
      .switchMap(action => {
        return this.weatherService
          .retrieveWeather(WeatherAxis.SolarFlux)
          .map(weather => actionRetrieveFluxSuccess(weather))
          .catch(err => {
            alert(err.message);
            return Observable.of(actionRetrieveFluxFail('err'));
          });
      });
  }
}
