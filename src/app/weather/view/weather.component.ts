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

import {
  weatherSelector,
  daysSelector,
  isErrorSelector,
  timesSelector,
  isLoadingSelector
} from './../weather.reducer';

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
      .select(weatherSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(weather => {
        this.weatherInfo = weather;
      });

    this.store
      .select(daysSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(days => {
        this.days = days;
      });

    this.store
      .select(timesSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(times => {
        this.times = times;
      });

    this.store
      .select(isLoadingSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });

    this.store
      .select(isErrorSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(isError => {
        this.isError = isError;
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

    return '';
  }
}
