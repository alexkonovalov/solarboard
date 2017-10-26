import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { WeatherInfo, WeatherAxis } from './weather.model';

const API_URL = 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point';
const API_KEY = 'bcf346da22c74648981870b20fb722b7';
const COORDS = { Lat : 59.4370, Lng: 24.7536 };
const NUMBER_OF_ROWS = 50;

const mockRespFlux = `axis:latitude,axis:longitude,axis:reftime,axis:time,data:av_swsfcdown
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T00:00:00",-9.059906005859375E-6
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T03:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T06:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T09:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T12:00:00",60.3489990234375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T15:00:00",265.6297607421875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T18:00:00",297.31494140625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T21:00:00",50.6494140625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T00:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T03:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T06:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T09:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T12:00:00",29.5274658203125
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T15:00:00",202.1494140625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T18:00:00",179.0067138671875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T21:00:00",32.529296875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T00:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T03:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T06:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T09:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T12:00:00",29.154052734375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T15:00:00",154.8392333984375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T18:00:00",145.5328369140625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T21:00:00",17.50634765625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T00:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T03:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T06:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T09:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T12:00:00",20.24755859375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T15:00:00",145.2022705078125
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T18:00:00",185.589111328125
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T21:00:00",26.917236328125
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T00:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T03:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T06:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T09:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T12:00:00",23.382568359375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T15:00:00",158.5174560546875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T18:00:00",318.5977783203125
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T21:00:00",27.0416259765625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T00:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T03:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T06:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T09:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T12:00:00",22.1859130859375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T15:00:00",210.693115234375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T18:00:00",154.3363037109375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T21:00:00",41.1011962890625
49.453125,-50.625,"2017-10-26T00:00:00","2017-11-01T00:00:00",0.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-11-01T03:00:00",0.0` /**/;

const mockRespClouds = `axis:latitude,axis:longitude,axis:reftime,axis:time,data:av_ttl_cld
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T03:00:00",0.234375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T06:00:00",0.140625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T09:00:00",0.34375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T12:00:00",0.515625
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T15:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T18:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-26T21:00:00",0.96875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T00:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T03:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T06:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T09:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T12:00:00",0.96875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T15:00:00",0.984375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T18:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-27T21:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T00:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T03:00:00",0.984375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T06:00:00",0.609375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T09:00:00",0.796875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T12:00:00",0.921875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T15:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T18:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-28T21:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T00:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T03:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T06:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T09:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T12:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T15:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T18:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-29T21:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T00:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T03:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T06:00:00",0.96875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T09:00:00",0.984375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T12:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T15:00:00",0.984375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T18:00:00",0.671875
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-30T21:00:00",0.9375
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T00:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T03:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T06:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T09:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T12:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T15:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T18:00:00",1.0
49.453125,-50.625,"2017-10-26T00:00:00","2017-10-31T21:00:00",0.90625
49.453125,-50.625,"2017-10-26T00:00:00","2017-11-01T00:00:00",0.8125
49.453125,-50.625,"2017-10-26T00:00:00","2017-11-01T03:00:00",0.921875
49.453125,-50.625,"2017-10-26T00:00:00","2017-11-01T06:00:00",1.0` /**/;

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  retrieveWeather(axis: WeatherAxis): Observable<WeatherInfo[]> {
    return (axis === WeatherAxis.Clowdness ? Observable.of(mockRespClouds) : Observable.of(mockRespFlux))
    /* this.httpClient
      .get(`${API_URL}?lon=${COORDS.Lng}&lat=${COORDS.Lat}&apikey=${API_KEY}&var=${axis}&csv=true&count=${NUMBER_OF_ROWS}`, {
          responseType: 'text'
      }) */
      .delay(5000)
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
