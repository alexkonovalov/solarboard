import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WeatherInfo, WeatherAxis } from './weather.model';

const API_URL = 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point';
const API_KEY = 'bcf346da22c74648981870b20fb722b7';
const COORDS = { Lat : 59.4370, Lng: 24.7536 };
const NUMBER_OF_ROWS = 50;

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  retrieveWeather(axis: WeatherAxis): Observable<WeatherInfo[]> {
    return this.httpClient
      .get(`${API_URL}?lon=${COORDS.Lng}&lat=${COORDS.Lat}&apikey=${API_KEY}&var=${axis}&csv=true&count=${NUMBER_OF_ROWS}`, {
          responseType: 'text'
      })
      .map((res: string) => res.split('\n')
        .map((row: string) => row.split(','))
        .map(row => ({ time: row[3], value: Number.parseFloat(row[4])}))
      );
  }

  retrieveWeatherMock(axis: WeatherAxis): Observable<WeatherInfo[]> {
      return Observable.of(axis === WeatherAxis.SolarFlux ? [
          { time: '2017-10-20T12:00:00', value: 55.98222732543945 },
          { time: '2017-10-20T15:00:00', value: 289.5745849609375 }] : [
          { time: '2017-10-20T12:00:00', value: 0.98 },
          { time: '2017-10-20T15:00:00', value: 0.22 }
        ]
      );
  }
}
