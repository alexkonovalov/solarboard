import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WeatherInfo } from './weather.reducer';

const API_URL = `http://api.planetos.com/v1/datasets/bom_access-g_global_40km/
point?lon=24.7536&lat=59.4370&apikey=bcf346da22c74648981870b20fb722b7&var=av_ttl_cld&csv=true&count=50`;

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  retrieveWeather(symbol: string): Observable<WeatherInfo[]> {
    console.log('*****retrieve weather!');

    return this.httpClient
      .get(API_URL, { responseType: 'text' })
      .map((res: string) => res.split('\n')
        .map((row: string) => row.split(','))
        .map(row => {
          return { time: row[3], sun: Number.parseFloat(row[4]) };
        })
      )
      .do(payload => console.log('***weather payload', payload));
  }
}
