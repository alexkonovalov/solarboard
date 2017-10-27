import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { PowerInfo } from './powerboard.model';

const API_URL = 'https://my.api.mockaroo.com/powerboard.json?key=186acfb0';

const mockResp = [{'Id': 1, 'Power': '198,482 W', 'Tension': '16,1 V'},
{'Id': 2, 'Power': '161,304 W', 'Tension': '17,5 V'},
{'Id': 3, 'Power': '12,266 W', 'Tension': '17,5 V'},
{'Id': 4, 'Power': '17,146 W', 'Tension': '17,2 V'},
{'Id': 5, 'Power': '11,137 W', 'Tension': '17,8 V'},
{'Id': 6, 'Power': '16,541 W', 'Tension': '17,0 V'},
{'Id': 7, 'Power': '17,273 W', 'Tension': '17,4 V'},
{'Id': 8, 'Power': '117,242 W', 'Tension': '16,7 V'},
{'Id': 9, 'Power': '137,755 W', 'Tension': '17,1 V'},
{'Id': 10, 'Power': '112,889 W', 'Tension': '17,4 V'},
{'Id': 11, 'Power': '150,459 W', 'Tension': '17,8 V'},
{'Id': 12, 'Power': '12,958 W', 'Tension': '17,1 V'},
{'Id': 13, 'Power': '18,251 W', 'Tension': '14,6 V'},
{'Id': 14, 'Power': '107,075 W', 'Tension': '16,9 V'},
{'Id': 15, 'Power': '120,864 W', 'Tension': '16,2 V'},
{'Id': 16, 'Power': '120,553 W', 'Tension': '12,5 V'},
{'Id': 17, 'Power': '183,897 W', 'Tension': '17,7 V'},
{'Id': 18, 'Power': '114,065 W', 'Tension': '17,6 V'},
{'Id': 19, 'Power': '178,983 W', 'Tension': '17,2 V'},
{'Id': 20, 'Power': '14,891 W', 'Tension': '16,6 V'},
{'Id': 21, 'Power': '156,427 W', 'Tension': '17,6 V'},
{'Id': 22, 'Power': '170,381 W', 'Tension': '17,4 V'},
{'Id': 23, 'Power': '134,711 W', 'Tension': '17,8 V'},
{'Id': 24, 'Power': '103,523 W', 'Tension': '16,5 V'},
{'Id': 25, 'Power': '12,715 W', 'Tension': '17,7 V'},
{'Id': 26, 'Power': '12,002 W', 'Tension': '17,3 V'},
{'Id': 27, 'Power': '186,540 W', 'Tension': '16,3 V'},
{'Id': 28, 'Power': '15,222 W', 'Tension': '15,0 V'},
{'Id': 29, 'Power': '18,327 W', 'Tension': '17,6 V'},
{'Id': 30, 'Power': '13,000 W', 'Tension': '13,5 V'},
{'Id': 31, 'Power': '171,320 W', 'Tension': '17,3 V'},
{'Id': 32, 'Power': '185,590 W', 'Tension': '15,1 V'},
{'Id': 33, 'Power': '193,859 W', 'Tension': '17,8 V'},
{'Id': 34, 'Power': '18,404 W', 'Tension': '17,0 V'},
{'Id': 35, 'Power': '19,949 W', 'Tension': '16,5 V'},
{'Id': 36, 'Power': '144,472 W', 'Tension': '16,0 V'},
{'Id': 37, 'Power': '156,253 W', 'Tension': '17,1 V'},
{'Id': 38, 'Power': '131,054 W', 'Tension': '17,0 V'},
{'Id': 39, 'Power': '13,003 W', 'Tension': '17,4 V'},
{'Id': 40, 'Power': '12,717 W', 'Tension': '17,6 V'},
{'Id': 41, 'Power': '101,894 W', 'Tension': '17,3 V'},
{'Id': 42, 'Power': '18,464 W', 'Tension': '16,8 V'},
{'Id': 43, 'Power': '146,290 W', 'Tension': '17,9 V'},
{'Id': 44, 'Power': '19,105 W', 'Tension': '16,5 V'},
{'Id': 45, 'Power': '126,174 W', 'Tension': '17,4 V'},
{'Id': 46, 'Power': '13,061 W', 'Tension': '16,0 V'},
{'Id': 47, 'Power': '140,734 W', 'Tension': '17,1 V'},
{'Id': 48, 'Power': '151,299 W', 'Tension': '15,9 V'},
{'Id': 49, 'Power': '15,357 W', 'Tension': '16,0 V'},
{'Id': 50, 'Power': '14,969 W', 'Tension': '16,9 V'}];



@Injectable()
export class PowerboardService {
  constructor(private httpClient: HttpClient) {}

  retrievePower(): Observable<PowerInfo[]> {

    return Observable.of(mockResp).delay(1500)
      .map(row => row as PowerInfo[]);
      /* this.httpClient
      .get(API_URL, { responseType: 'text' })
      .map((res: string) => JSON.parse(res.replace('//', ''))) */
  }
}
