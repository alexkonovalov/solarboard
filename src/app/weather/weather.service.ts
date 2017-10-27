import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WeatherInfo, WeatherAxis } from './weather.model';

const API_URL = 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point';
const API_KEY = 'bcf346da22c74648981870b20fb722b7';
const COORDS = { Lat : 59.4370, Lng: 24.7536 };
const NUMBER_OF_ROWS = 90;


@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  retrieveWeather(axis: WeatherAxis): Observable<WeatherInfo[]> {
    return this.httpClient
      .get(`${API_URL}?lon=${COORDS.Lng}&lat=${COORDS.Lat}&apikey=${API_KEY}&var=${axis}&csv=true&count=${NUMBER_OF_ROWS}`, {
          responseType: 'text'
      })
      .map((res: string) => {
        const rows = res
          .replace(/['"]+/g, '')
          .split('\n');
        rows.shift(); // todo crop the string instead. better for performance
        return rows
          .map((row: string) => row.split(','))
          .map(row => ({ time: row[3], value: Number.parseFloat(row[4])}))
          .filter(info => info.value >= 0);
      });
  }
}
