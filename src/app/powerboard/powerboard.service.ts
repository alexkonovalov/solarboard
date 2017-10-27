import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { PowerInfo } from './powerboard.model';

const API_URL = 'https://my.api.mockaroo.com/powerboard.json?key=186acfb0';

@Injectable()
export class PowerboardService {
  constructor(private httpClient: HttpClient) {}

  retrievePower(): Observable<PowerInfo[]> {

    return this.httpClient
      .get(API_URL, { responseType: 'text' })
      .map((res: string) => JSON.parse(res.replace('//', '')));
  }
}
