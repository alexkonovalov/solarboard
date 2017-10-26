import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Subject,  } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as moment from 'moment';

import { selectorWeather } from './../weather.reducer';
import { actionRetrieveWeather } from './../weather.actions';
import { WeatherService } from './../weather.service';
import { WeatherState, WeatherDictionary, WeatherInfo } from './../weather.model';

@Component({
  selector: 'slrb-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  weatherInfo: WeatherDictionary;
  days: moment.Moment[];
  times: moment.Moment[];
  isLoading: boolean;
  isError: boolean;

  constructor(public store: Store<any>, private weatherService: WeatherService) {}

  ngOnInit() {
    this.store
    .select(state => state.weather as WeatherState)
    .takeUntil(this.unsubscribe$)
    .subscribe(weather => {
      this.weatherInfo = weather.Weather;
      this.days = weather.AllDays;
      this.times = weather.AllTimes;
      this.isLoading = weather.IsCloudsLoading || weather.IsFluxLoading;
      this.isError = weather.IsError;
    });

     this.store.dispatch(actionRetrieveWeather());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  GetWeatherInfo(day: moment.Moment, time: moment.Moment) {
    return this.weatherInfo[day.toISOString()][time.toISOString()];
  }

  GetClassName(info: { Flux: number }) {
    if (!info) {
      return '';
    }
    if (info.Flux > 250) {
      return 'cell-extreme';
    }
    if (info.Flux > 170) {
      return 'cell-hot';
    }
    if (info.Flux > 120) {
      return 'cell-moderate';
    }
    if (info.Flux > 100) {
      return 'cell-mild';
    }
    if (info.Flux > 20) {
      return 'cell-low';
    }
    if (info.Flux > 0) {
      return 'cell-derary';
    }
    if (info.Flux === 0) {
      return 'cell-dark';
    }

    return info.Flux > 100 ?
      'cell-bright' :
    info.Flux > 30 ?
      'cell-average' :
      'cell-dark';
  }
}
