import * as moment from 'moment';

export interface WeatherInfo {
  time: string;
  value: number;
}

export enum WeatherAxis {
  Clowdness = 'av_ttl_cld',
  SolarFlux = 'av_swsfcdown'
}


export interface WeatherDictionary {
  [date: string]: {
    [time: string]: {
      Flux?: number;
      Cloud?: number;
    }
  };
};

export class WeatherState {
  IsCloudsLoading: boolean;
  IsFluxLoading: boolean;
  Error?: any;
  Clouds?: WeatherInfo[];
  Flux?: WeatherInfo[];
  Weather: WeatherDictionary;
  AllDays: moment.Moment[];
  AllTimes: moment.Moment[];
}