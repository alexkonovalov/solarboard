import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WeatherInfo, WeatherAxis } from './weather.model';

const API_URL = 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point';
const API_KEY = 'bcf346da22c74648981870b20fb722b7';
const COORDS = { Lat : 59.4370, Lng: 24.7536 };
const NUMBER_OF_ROWS = 50;

const mockRespFlux = `axis:latitude,axis:longitude,axis:reftime,axis:time,data:av_swsfcdown
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T12:00:00",300.335205078125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T15:00:00",104.251220703125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T18:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T21:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T00:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T03:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T06:00:00",2.259033203125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T09:00:00",113.13671875
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T12:00:00",185.754150390625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T15:00:00",50.339111328125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T18:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T21:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T00:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T03:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T06:00:00",0.4136962890625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T09:00:00",33.1019287109375
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T12:00:00",41.993408203125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T15:00:00",12.1041259765625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T18:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T21:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T00:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T03:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T06:00:00",0.3817138671875
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T09:00:00",34.565185546875
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T12:00:00",70.321533203125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T15:00:00",19.5640869140625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T18:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T21:00:00",0.0`
/* 59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T00:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T03:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T06:00:00",0.438720703125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T09:00:00",32.4677734375
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T12:00:00",40.281494140625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T15:00:00",13.0570068359375
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T18:00:00",0.0` */;

const mockRespClouds = `axis:latitude,axis:longitude,axis:reftime,axis:time,data:av_ttl_cld
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T15:00:00",0.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T18:00:00",0.03125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-24T21:00:00",0.15625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T00:00:00",0.125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T03:00:00",0.015625
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T06:00:00",0.296875
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T09:00:00",0.953125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T12:00:00",0.921875
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T15:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T18:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-25T21:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T00:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T03:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T06:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T09:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T12:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T15:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T18:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-26T21:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T00:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T03:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T06:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T09:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T12:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T15:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T18:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-27T21:00:00",1.0`
/* 59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T00:00:00",0.984375
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T03:00:00",0.953125
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T06:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T09:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T12:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T15:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T18:00:00",1.0
59.53125,24.609375,"2017-10-24T12:00:00","2017-10-28T21:00:00",0.984375` */;

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  retrieveWeather(axis: WeatherAxis): Observable<WeatherInfo[]> {
    return (axis === WeatherAxis.Clowdness ? Observable.of(mockRespClouds) : Observable.of(mockRespFlux))
    /* this.httpClient
      .get(`${API_URL}?lon=${COORDS.Lng}&lat=${COORDS.Lat}&apikey=${API_KEY}&var=${axis}&csv=true&count=${NUMBER_OF_ROWS}`, {
          responseType: 'text'
      }) */
      .map((res: string) => {
        const rows = res
          .replace(/['"]+/g, '')
          .split('\n');
        rows.shift(); // todo crop the string instead. better for performance
        return rows
          .map((row: string) => row.split(','))
          .map(row => ({ time: row[3], time2: moment(row[3]), value: Number.parseFloat(row[4])}))
      });
  }
}
